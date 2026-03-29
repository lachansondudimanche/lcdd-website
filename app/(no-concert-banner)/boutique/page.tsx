import { getBoutiqueOffers } from "@/lib/airtable";

export const revalidate = 3600;

function formatPrice(price: number) {
    return new Intl.NumberFormat("fr-FR").format(price);
}

export default async function BoutiquePage() {
    const offers = await getBoutiqueOffers();

    return (
        <main className="shop-page">
            <p className="shop-text">
                🎵 Si une chanson vous a fait sourire, n'hésitez pas à faire passer le chapeau&nbsp;:
                {/* {" "}
                <a
                    href="https://ko-fi.com/lachansondudimanche"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shop-offer"
                    aria-label="Soutenir La Chanson du Dimanche sur Ko-fi"
                >
                    chapeau
                </a>
                : */}
            </p>

            <div className="shop-kofi-logo-wrap">
                <a
                    href="https://ko-fi.com/lachansondudimanche"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shop-kofi-logo-link"
                    aria-label="Soutenir La Chanson du Dimanche sur Ko-fi"
                >
                    <img
                        src="/images/chapeau.png"
                        alt="Chapeau La Chanson du Dimanche"
                        className="shop-kofi-logo"
                    />
                </a>
            </div>

            <div className="shop-box">
                {offers.map((offer) => (
                    <div key={offer.id} className="shop-row">
                        <a
                            href={offer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shop-play-button"
                            aria-label={`Choisir l'offre ${offer.name}`}
                        >
                            <span className="shop-play-icon">▶</span>
                        </a>

                        <a
                            href={offer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shop-row-link"
                            aria-label={`Choisir l'offre ${offer.name}`}
                        >
                            <span className="shop-price">
                                {formatPrice(Number(offer.price))}&nbsp;€
                            </span>
                            <span className="shop-separator">—</span>
                            <span className="shop-offer-name">{offer.name}</span>
                            <span className="shop-emoji">{offer.emoji}</span>
                        </a>
                    </div>
                ))}
            </div>
        </main>
    );
}