import TrackAdClick from "@/components/TrackAdClick";

export default function AdBanner970() {
    return (
        <section className="ad-slot">
            <TrackAdClick
                href="/concerts"
                className="ad-slot-inner"
                ariaLabel="Voir les concerts"
                adName="tournee-autopromo"
            >
                <img
                    src="/images/lheureuxtour.jpg"
                    alt="Bannière tournée — voir les concerts"
                    width={970}
                    height={250}
                    style={{ width: "100%", height: "auto" }}
                />
            </TrackAdClick>
        </section>
    );
}