import TrackSocialClick from "@/components/TrackSocialClick";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="social-row">
                <TrackSocialClick
                    href="https://www.facebook.com/lachansondudimanche"
                    socialPlatform="facebook"
                    ariaLabel="Facebook de La Chanson du Dimanche"
                >
                    <img
                        src="/images/facebook.png"
                        alt="Facebook de La Chanson du Dimanche"
                        className="footer-image"
                    />
                </TrackSocialClick>

                <TrackSocialClick
                    href="https://www.instagram.com/lachansondudimanche"
                    socialPlatform="instagram"
                    ariaLabel="Instagram de La Chanson du Dimanche"
                >
                    <img
                        src="/images/instagram.png"
                        alt="Instagram de La Chanson du Dimanche"
                        className="footer-image"
                    />
                </TrackSocialClick>

                <TrackSocialClick
                    href="https://open.spotify.com/artist/6O4fmo4MKyR4bfBeUjqLdX"
                    socialPlatform="spotify"
                    ariaLabel="Spotify de La Chanson du Dimanche"
                >
                    <img
                        src="/images/spotify.png"
                        alt="Spotify de La Chanson du Dimanche"
                        className="footer-image"
                    />
                </TrackSocialClick>

                <TrackSocialClick
                    href="https://www.deezer.com/fr/artist/17258"
                    socialPlatform="deezer"
                    ariaLabel="Deezer de La Chanson du Dimanche"
                >
                    <img
                        src="/images/deezer.png"
                        alt="Deezer de La Chanson du Dimanche"
                        className="footer-image"
                    />
                </TrackSocialClick>

                <TrackSocialClick
                    href="https://music.amazon.fr/artists/B0025SBUJA/la-chanson-du-dimanche"
                    socialPlatform="amazon"
                    ariaLabel="Amazon de La Chanson du Dimanche"
                >
                    <img
                        src="/images/amazon.png"
                        alt="Amazon de La Chanson du Dimanche"
                        className="footer-image"
                    />
                </TrackSocialClick>

                <TrackSocialClick
                    href="https://www.youtube.com/@lachansondudimanche"
                    socialPlatform="youtube"
                    ariaLabel="YouTube de La Chanson du Dimanche"
                >
                    <img
                        src="/images/youtube.png"
                        alt="YouTube de La Chanson du Dimanche"
                        className="footer-image"
                    />
                </TrackSocialClick>
            </div>
        </footer>
    );
}