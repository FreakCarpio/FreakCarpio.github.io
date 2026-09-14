// "Copy email" button (progressive enhancement).
//
// The button ships [hidden]. It is revealed only when the Clipboard API
// exists (secure context: HTTPS or localhost), so users never see a
// control that can't work. The mailto: link keeps working either way.
//
// Feedback goes to a role="status" element, which screen readers
// announce politely; the button text alone is not reliably announced.

const RESET_DELAY_MS = 2000;

export function initCopyEmail() {
    const button = document.querySelector('[data-js="copy-email"]');
    const status = document.querySelector('[data-js="copy-email-status"]');

    if (!button || !status || !navigator.clipboard) return;

    const label = button.textContent.trim();
    let resetTimer;

    button.hidden = false;

    button.addEventListener('click', async () => {
        clearTimeout(resetTimer);

        try {
            await navigator.clipboard.writeText(button.dataset.email);

            button.textContent = 'Copied';
            status.textContent = 'Email copied to clipboard.';

            resetTimer = setTimeout(() => {
                button.textContent = label;
                status.textContent = '';
            }, RESET_DELAY_MS);
        } catch {
            // The error stays visible until the next attempt
            button.textContent = label;
            status.textContent = "Couldn't copy. Select the address above.";
        }
    });
}
