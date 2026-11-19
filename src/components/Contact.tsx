import { useLanguage } from '../content/useLanguage';
import { useRef } from 'react';
import { useContent } from '../content/useContent';
import { useInView } from '../hooks/useInView';
import { fitTitleStyle } from '../lib/fitTitle';
import { CopyEmail } from './CopyEmail';
import { Icon } from './Icon';

/** Full-bleed plate of red ink with black type: the output of the signal chain */
export function Contact() {
    const { t } = useLanguage();
    const { contact } = useContent();
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { threshold: 0.15 });

    // The address may break before "@" when it doesn't fit on one line
    const [user, domain] = contact.email.split('@');
    const longestPart = Math.max(user?.length ?? 0, (domain?.length ?? 0) + 1);

    return (
        <section
            className="contact"
            id="contact"
            ref={sectionRef}
            aria-labelledby="contact-heading"
            data-inview={inView ? '' : undefined}
        >
            {/* The red plate is a child because it starts clipped away, and a
                clipped element can't be observed entering the screen: the
                section itself (never clipped) is what useInView watches. */}
            <div className="contact-plate">
            <div className="contact-inner">
                <h2 className="contact-heading" id="contact-heading">
                    {t('Contact')}
                </h2>

                {/* Content, not a control: the address stays selectable */}
                <a
                    href={`mailto:${contact.email}`}
                    className="contact-email fit-title"
                    style={fitTitleStyle('x'.repeat(longestPart))}
                >
                    {user}
                    <wbr />@{domain}
                </a>

                <CopyEmail email={contact.email} />

                <div className="contact-details">
                    <p className="contact-note">{contact.note}</p>

                    <ul className="channels" role="list">
                        {contact.channels.map((channel) => (
                            <li key={channel.label}>
                                <a
                                    href={channel.href}
                                    className="channel"
                                    rel={channel.external ? 'me' : undefined}
                                >
                                    <span className="channel-label">{channel.label}</span>
                                    <span className="channel-value">{channel.value}</span>
                                    <Icon name={channel.external ? 'arrowUpRight' : 'arrowRight'} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            </div>
        </section>
    );
}
