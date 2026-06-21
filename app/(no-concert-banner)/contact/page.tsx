import TouringContact from "@/components/TouringContact";

export default function ContactPage() {
    return (
        <main className="contact-page">
            <section className="contact-content">
                <TouringContact />

                <p className="touring-contact">
                    Pour tout le reste&nbsp;:{" "}
                    <a href="mailto:lachansondudimanche@gmail.com">
                        lachansondudimanche@gmail.com
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