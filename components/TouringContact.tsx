const TOURING_CONTACT_EMAIL = "benjamin@leterrierproductions.com";

export default function TouringContact() {
    return (
        <p className="touring-contact">
            Contact tourneur&nbsp;:{" "}
            <a href={`mailto:${TOURING_CONTACT_EMAIL}`}>
                {TOURING_CONTACT_EMAIL}
            </a>
        </p>
    );
}