import { getHighlightedConcert } from "@/lib/airtable";

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
                    ➡️ Réservez vos places <a href={concert.bookingUrl} target="_blank">ici</a>
                </p>
            )}
        </section>
    );
}