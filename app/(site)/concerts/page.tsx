import { getConcerts } from "@/lib/airtable";

type Concert = {
    id: string;
    title: string;
    date: string;
    dateLabel: string;
    city: string;
    department: string;
    venue: string;
    bookingUrl: string;
    status: string;
    order: number | null;
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
                        key={concert.id}
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
                                        ➡️ <a href={concert.bookingUrl} target="_blank">Réservez des places</a>
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