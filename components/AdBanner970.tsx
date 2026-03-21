import Image from "next/image";

export default function AdBanner970() {
    return (
        <section className="ad-slot">
            <div className="ad-slot-inner">
                {/* Emplacement publicité 970 × 250 */}
                <img
                    src="/images/lheureuxtour.jpg"
                    alt="Bannière"
                    width={970}
                    height={250}
                    style={{ width: "100%", height: "auto" }}
                />
            </div>
        </section>
    );
}