import { getHighlightedConcert } from "@/lib/site-data";

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
                    <a
                        href={concert.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="next-concert-link"
                    >
                        <span className="next-concert-arrow">➡️</span>
                        <span className="next-concert-text">
                            Plus d'infos <span className="next-concert-here">ici</span>
                        </span>
                    </a>
                </p>
            )}
        </section>
    );
}