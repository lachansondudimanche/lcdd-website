import { getConcerts } from "@/lib/site-data";
import TrackConcertClick from "@/components/TrackConcertClick";

export const revalidate = 3600;

type Concert = {
    title: string;
    date: string;
    dateLabel: string;
    city: string;
    department: string;
    bookingUrl: string;
    status: string;
    override_status?: string;
    isHighlighted: boolean;
};

export default async function ConcertsPage() {
    const concerts: Concert[] = await getConcerts();

    return (
        <main className="concerts-page">
            <section className="concerts-intro">
                <h2>La Chanson du Dimanche en concert :</h2>
            </section>

            <section className="concerts-list">
                {concerts.map((concert) => (
                    <article
                        key={`${concert.title}-${concert.date}-${concert.city}`}
                        className={`concert-card concert-${concert.status.toLowerCase()}`}
                    >
                        <div className="concert-top-row">
                            <div className="concert-icon-col">
                                <span className="concert-icon">🎸</span>
                            </div>

                            <div className="concert-main-col">
                                <h2>{concert.dateLabel}</h2>

                                <h3>{concert.title}</h3>

                                <p className="concert-location">
                                    {concert.city}
                                    {concert.department ? ` (${concert.department})` : ""}
                                </p>

                                {concert.bookingUrl && (
                                    <p className="concert-booking">
                                        ➡️{" "}
                                        <TrackConcertClick
                                            href={concert.bookingUrl}
                                            location="list"
                                            concertTitle={concert.title}
                                            concertCity={concert.city}
                                            concertDate={concert.date}
                                            ariaLabel={`Plus d'infos pour ${concert.title}`}
                                        >
                                            Plus d'infos ici
                                        </TrackConcertClick>
                                    </p>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}