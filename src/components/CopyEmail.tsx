import { useLanguage } from '../content/useLanguage';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

const RESET_DELAY_MS = 2000;

type Status = 'idle' | 'copied' | 'error';

/**
 * "Copy email" button (progressive enhancement).
 *
 * It only appears when the Clipboard API exists (HTTPS or localhost), so
 * nobody sees a control that can't work; the mailto: link works either way.
 * Both labels live in the same box and swap places, so the button never
 * changes width. Screen readers get the result through role="status".
 */
export function CopyEmail({ email }: { email: string }) {
    const { t } = useLanguage();
    const [supported, setSupported] = useState(false);
    const [status, setStatus] = useState<Status>('idle');
    const resetTimer = useRef<number | undefined>(undefined);

    useEffect(() => {
        setSupported(Boolean(navigator.clipboard));

        return () => window.clearTimeout(resetTimer.current);
    }, []);

    if (!supported) return null;

    const copy = async () => {
        window.clearTimeout(resetTimer.current);

        try {
            await navigator.clipboard.writeText(email);
            setStatus('copied');
            // A second click during the swap restarts this timer, not the animation
            resetTimer.current = window.setTimeout(() => setStatus('idle'), RESET_DELAY_MS);
        } catch {
            // The error stays visible until the next attempt
            setStatus('error');
        }
    };

    return (
        <div className="copy-email">
            <button
                type="button"
                className="btn btn-secondary copy-email-button"
                data-status={status}
                onClick={copy}
            >
                <span className="copy-email-labels">
                    <span className="copy-email-label" data-label="idle">
                        <Icon name="copy" />
                        {t('Copy email')}
                    </span>
                    <span className="copy-email-label" data-label="copied" aria-hidden="true">
                        <Icon name="check" />
                        {t('Copied')}
                    </span>
                </span>
            </button>

            <p className="visually-hidden" role="status">
                {status === 'copied' ? t('Email address copied.') : ''}
            </p>

            {status === 'error' && (
                <p className="copy-email-error" role="alert">
                    {t("Couldn't copy. Select the address instead.")}
                </p>
            )}
        </div>
    );
}
