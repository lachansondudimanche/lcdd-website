export const revalidate = 3600;

export default function BoutiquePage() {
    return (
        <main className="shop-page">
            <p className="shop-text">
                🎵 Si une chanson vous a
                fait sourire, n'hésitez pas à faire passer le<a
                href="https://ko-fi.com/lachansondudimanche"
                target="_blank"
                rel="noopener noreferrer"
                className="shop-offer"
                aria-label="Soutenir La Chanson du Dimanche sur Ko-fi">chapeau</a>:
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
                    <p>2 € — <span className="shop-offer">Merci</span> 🎩</p>
                    <p>10 € — <span className="shop-offer">La Pêche</span> 🍑</p>
                    <p>25 € — <span className="shop-offer">Producteur.rice du dimanche</span> 👑</p>
                    <p>50 € — <span className="shop-offer">Votre mot dans une chanson</span> 🎶</p>
                    <p>100 € — <span className="shop-offer">Un Joyeux anniversaire personnalisé</span> 🥳</p>
                    <p>1000 € — <span className="shop-offer">Une chanson collector</span> 🎥</p>
                    <p>10000 € — <span className="shop-offer">Un concert privé</span> 🎹</p>
                    <p>1&nbsp;000&nbsp;000&nbsp;€ — <span className="shop-offer">Un concert privé de luxe</span> 🍾</p>
                </div>
            </a>

        </main>
    );
}