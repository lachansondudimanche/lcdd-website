import { getBoutiqueItems } from "@/lib/site-data";
import TrackBoutiqueClick from "@/components/TrackBoutiqueClick";

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
                <TrackBoutiqueClick
                    href="https://ko-fi.com/lachansondudimanche"
                    className="shop-kofi-logo-link"
                    ariaLabel="Soutenir La Chanson du Dimanche sur Ko-fi"
                    linkType="hat"
                    offerName="chapeau"
                >
                    <img
                        src="/images/chapeau.png"
                        alt="Chapeau La Chanson du Dimanche"
                        className="shop-kofi-logo"
                    />
                </TrackBoutiqueClick>
            </div>

            <div className="shop-box">
                {offers.map((offer) => (
                    <div
                        key={`${offer.offer}-${offer.price}`}
                        className="shop-row"
                    >
                        <TrackBoutiqueClick
                            href={offer.buyUrl}
                            className="shop-play-button"
                            ariaLabel={`Choisir l'offre ${offer.offer}`}
                            linkType="button"
                            offerName={offer.offer}
                            price={offer.price}
                        >
                            <span className="shop-play-icon">▶</span>
                        </TrackBoutiqueClick>

                        <TrackBoutiqueClick
                            href={offer.buyUrl}
                            className="shop-row-link"
                            ariaLabel={`Choisir l'offre ${offer.offer}`}
                            linkType="row"
                            offerName={offer.offer}
                            price={offer.price}
                        >
                            <span className="shop-price">
                                {formatPrice(offer.price)}&nbsp;€
                            </span>
                            <span className="shop-separator">-</span>
                            <span className="shop-offer-name">{offer.offer}</span>
                            <span className="shop-emoji">{offer.emoji}</span>
                        </TrackBoutiqueClick>
                    </div>
                ))}
            </div>
        </main>
    );
}