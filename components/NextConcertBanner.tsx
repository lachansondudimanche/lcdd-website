import { getHighlightedConcert } from "@/lib/site-data";
import TrackConcertClick from "@/components/TrackConcertClick";

export default async function NextConcertBanner() {
    const concert = await getHighlightedConcert();

    if (!concert) {
        return null;
    }

    return (
        <section className="next-concert">
            <p>
                Prochain concert le {concert.dateLabel} à {concert.city} ({concert.title})
            </p>

            {concert.bookingUrl && (
                <p>
                    <TrackConcertClick
                        href={concert.bookingUrl}
                        concertTitle={concert.title}
                        concertCity={concert.city}
                        concertDate={concert.date}
                        concertSource="banner"
                        className="next-concert-link"
                        ariaLabel={`Plus d'infos pour ${concert.title}`}
                    >
                        <span className="next-concert-arrow">➡️</span>
                        <span className="next-concert-text">
                            Plus d'infos <span className="next-concert-here">ici</span>
                        </span>
                    </TrackConcertClick>
                </p>
            )}
        </section>
    );
}