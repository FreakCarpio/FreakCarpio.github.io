import { useLanguage } from '../content/useLanguage';
import { useSearchParams } from 'react-router';
import { useDataMode, type DataMode } from '../content/useContent';

const MODES = [
    { mode: 'demo', label: 'Demo data' },
    { mode: 'worst', label: 'Worst case' },
    { mode: 'sparse', label: 'One of each' },
] as const;

/**
 * DEVELOPMENT ONLY (rendered behind import.meta.env.DEV in Layout).
 * Switches the whole site between real content and stress-test fixtures,
 * to check layouts against long text, missing data and single items.
 * The choice lives in the URL (?data=worst), so a reload keeps it.
 */
export function DataToggle() {
    const { t } = useLanguage();
    const mode = useDataMode();
    const [, setParams] = useSearchParams();

    const select = (next: DataMode) => {
        setParams(
            (params) => {
                if (next === 'demo') params.delete('data');
                else params.set('data', next);

                return params;
            },
            { replace: true, preventScrollReset: true },
        );
    };

    return (
        <div className="data-toggle" role="group" aria-label={t('Test data (development only)')}>
            {MODES.map((item) => (
                <button
                    key={item.mode}
                    type="button"
                    aria-pressed={mode === item.mode}
                    onClick={() => select(item.mode)}
                >
                    {t(item.label)}
                </button>
            ))}
        </div>
    );
}
