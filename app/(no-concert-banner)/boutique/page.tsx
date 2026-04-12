import { getBoutiqueItems } from "@/lib/site-data";
import TrackShopClick from "@/components/TrackShopClick";

export const revalidate = 3600;

function formatPrice(price: number) {
    if (Number.isInteger(price)) {
        return new Intl.NumberFormat("fr-FR").format(price);
    }

    const oneDecimal = Math.round(price * 10) === price * 10;

    if (oneDecimal) {
        return new Intl.NumberFormat("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price);
    }

    return new Intl.NumberFormat("fr-FR", {
        maximumFractionDigits: 2,
    }).format(price);
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
                <TrackShopClick
                    href="https://ko-fi.com/lachansondudimanche"
                    className="shop-kofi-logo-link"
                    ariaLabel="Soutenir La Chanson du Dimanche sur Ko-fi"
                    shopSource="hat"
                    shopOffer="chapeau"
                >
                    <img
                        src="/images/chapeau.png"
                        alt="Chapeau La Chanson du Dimanche"
                        className="shop-kofi-logo"
                    />
                </TrackShopClick>
            </div>

            <div className="shop-box">
                {offers.map((offer) => (
                    <div
                        key={`${offer.offer}-${offer.price}`}
                        className="shop-row"
                    >
                        <TrackShopClick
                            href={offer.buyUrl}
                            className="shop-play-button"
                            ariaLabel={`Choisir l'offre ${offer.offer}`}
                            shopOffer={offer.offer}
                            shopPrice={offer.price}
                            shopSource="button"
                        >
                            <span className="shop-play-icon">▶</span>
                        </TrackShopClick>

                        <TrackShopClick
                            href={offer.buyUrl}
                            className="shop-row-link"
                            ariaLabel={`Choisir l'offre ${offer.offer}`}
                            shopOffer={offer.offer}
                            shopPrice={offer.price}
                            shopSource="row"
                        >
                            <span className="shop-price">
                                {formatPrice(offer.price)}&nbsp;€
                            </span>
                            <span className="shop-separator">-</span>
                            <span className="shop-offer-name">{offer.offer}</span>
                            <span className="shop-emoji">{offer.emoji}</span>
                        </TrackShopClick>
                    </div>
                ))}
            </div>
        </main>
    );
}