import { useContent } from '../content/useContent';

export function Footer() {
    const { contact } = useContent();
    const profiles = contact.channels.filter((channel) => channel.external);

    return (
        <footer className="site-footer" data-outside-menu>
            <p>© 2026 Emilio Carpio</p>

            <ul className="footer-links" role="list">
                {profiles.map((profile) => (
                    <li key={profile.label}>
                        {/* rel="me": tells search engines these profiles are the same person */}
                        <a href={profile.href} rel="me">
                            {profile.label}
                        </a>
                    </li>
                ))}
            </ul>
        </footer>
    );
}
