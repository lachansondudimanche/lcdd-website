export const revalidate = 3600;

export default function BoutiquePage() {
    return (
        <main className="shop-page">
            <p className="shop-text"><a
                href="https://ko-fi.com/lachansondudimanche"
                target="_blank"
                rel="noopener noreferrer"
                className="shop-offer"
                aria-label="Soutenir La Chanson du Dimanche sur Ko-fi">
                ➡️ Si une chanson vous a
                fait sourire, n'hésitez pas à faire passer le chapeau pour nous soutenir{"\u00A0"}:</a>
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
                        src="/images/kofi-logo.png"
                        alt="Ko-fi"
                        className="shop-kofi-logo"
                    />
                </a>
            </div>

            <a
                href="https://ko-fi.com/lachansondudimanche"
                target="_blank"
                rel="noopener noreferrer"
                className="shop-box-link"
                aria-label="Soutenir La Chanson du Dimanche sur Ko-fi"
            >

                <div className="shop-box">
                    <p><span className="shop-offer">2 € — Merci 🎩</span></p>
                    <p><span className="shop-offer">10 € — La Pêche 🍑</span></p>
                    <p><span className="shop-offer">25 € — Producteur.rice du dimanche 👑</span></p>
                    <p><span className="shop-offer">50 € — Votre mot dans une chanson 🎶</span></p>
                    <p><span className="shop-offer">100 € — Un Joyeux anniversaire personnalisé 🥳</span></p>
                    <p><span className="shop-offer">1000 € — Une chanson collector 🎥</span></p>
                    <p><span className="shop-offer">10000 € — Un concert privé 🎹</span></p>
                    <p><span className="shop-offer">1&nbsp;000&nbsp;000&nbsp;€ — Un concert privé de luxe 🍾</span></p>
                </div>
            </a>

        </main>
    );
}