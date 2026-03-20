export default function ContactPage() {
    return (
        <main className="contact-page">
            <section className="contact-content">
                <p className="contact-text">
                    Pour toute demande de concert, émission, interview, partenariat,
                    chanson, message de pêche&nbsp;:
                </p>

                <p className="contact-email-line">
                    <a
                        href="mailto:lachansondudimanche@gmail.com"
                        className="contact-email-link"
                        aria-label="Envoyer un email à lachansondudimanche@gmail.com"
                    >
                        ✉️ lachansondudimanche@gmail.com
                    </a>
                </p>

                <div className="contact-image-wrap">
                    <img
                        src="/images/contact-page.webp"
                        alt="La Chanson du Dimanche"
                        className="contact-image"
                    />
                </div>
            </section>
        </main>
    );
}