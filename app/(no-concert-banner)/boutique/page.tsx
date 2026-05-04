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
                🎵 Bienvenue dans la boutique officielle de la Chanson du Dimanche ! Si une chanson vous a fait sourire, n'hésitez pas à faire passer le chapeau pour la <strong>Saison des 20 ans</strong>&nbsp;:
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
        </main>
    );
}