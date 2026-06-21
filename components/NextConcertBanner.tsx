import { getHighlightedConcert } from "@/lib/site-data";
import TrackConcertClick from "@/components/TrackConcertClick";
import TouringContact from "@/components/TouringContact";

export default async function NextConcertBanner() {
    const concert = await getHighlightedConcert();

    return (
        <section className="next-concert">
            {concert ? (
                <>
                    <p>
                        Prochain concert le <strong>{concert.dateLabel}</strong> à <strong>{concert.city}</strong> ({concert.title})
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
                </>
            ) : (
                <p>La Pêche toujours&nbsp;! De retour bientôt&hellip;</p>
            )}

            <TouringContact />
        </section>
    );
}