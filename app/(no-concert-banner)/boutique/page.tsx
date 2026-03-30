import { getBoutiqueItems } from "@/lib/site-data";

export const revalidate = 3600;

function formatPrice(price: number) {
    return new Intl.NumberFormat("fr-FR").format(price);
}

type BoutiqueItem = {
    offer: string;
    price: number;
    buyUrl: string;
    emoji: string;
    description?: string;
    sortOrder?: number;
};

export default async function BoutiquePage() {
    const offers: BoutiqueItem[] = await getBoutiqueItems();

    return (
        <main className="shop-page">
            <p className="shop-text">
                🎵 Si une chanson vous a fait sourire, n'hésitez pas à faire passer le chapeau&nbsp;:
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
                    <div
                        key={`${offer.offer}-${offer.price}`}
                        className="shop-row"
                    >
                        <a
                            href={offer.buyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shop-play-button"
                            aria-label={`Choisir l'offre ${offer.offer}`}
                        >
                            <span className="shop-play-icon">▶</span>
                        </a>

                        <a
                            href={offer.buyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shop-row-link"
                            aria-label={`Choisir l'offre ${offer.offer}`}
                        >
                            <span className="shop-price">
                                {formatPrice(offer.price)}&nbsp;€
                            </span>
                            <span className="shop-separator">—</span>
                            <span className="shop-offer-name">{offer.offer}</span>
                            <span className="shop-emoji">{offer.emoji}</span>
                        </a>
                    </div>
                ))}
            </div>
        </main>
    );
}