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
                <p>10 € — La Pêche éternelle 🍑</p>
                <p>25 € — Producteur.rice du dimanche 👑</p>
                <p>50 € — Votre mot dans une chanson 🎶</p>
            </div>
            {/* </section> */}
        </main>
    );
}