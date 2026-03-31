export const revalidate = 3600;

import { getConcerts } from "@/lib/site-data";

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
                                        <a
                                            href={concert.bookingUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Plus d'infos ici
                                        </a>
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