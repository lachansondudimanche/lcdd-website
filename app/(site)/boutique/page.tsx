export const revalidate = 3600;

export default function BoutiquePage() {
    return (
        <main className="shop-page">
            {/* <section className="shop-intro">
                <h1>Boutique</h1>
            </section> */}

            {/* <section className="shop-content"> */}
            <p className="shop-text">
                Si une chanson vous a
                fait sourire, vous pouvez faire passer le chapeau pour rendre possible la Saison des 20 ans{"\u00A0"}:
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

            <p className="shop-support-link">
                ➡️ Pour nous soutenir, c&apos;est par{" "}
                <a
                    href="https://ko-fi.com/lachansondudimanche"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ici
                </a>
            </p>

            <div className="shop-box">
                <p>2 € — Merci 🎩</p>
                <p>10 € — La Pêche 🍑</p>
                <p>25 € — Producteur.rice du dimanche 👑</p>
                <p>50 € — Votre mot dans une chanson 🎶</p>
                <p>100 €  — Un Joyeux anniversaire personnalisé 🥳</p>
                <p>1000 € — Une chanson collector 🎥</p>
                <p>10000 € — Un concert privé 🎹</p>
                <p>1.000.000{"\u00A0"}€ — Un concert privé de luxe 🍾</p>
            </div>
            {/* </section> */}
        </main>
    );
}