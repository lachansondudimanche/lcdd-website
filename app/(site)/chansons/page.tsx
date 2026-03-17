import Link from "next/link";
import { getChansons } from "@/lib/airtable";

type Chanson = {
    id: string;
    slug: string;
    title: string;
    seasonName?: string;
    seasonOrder?: number | null;
    episode?: number | null;
};

export default async function ChansonsPage() {
    const chansons: Chanson[] = await getChansons();

    const chansonsAvecSlug = chansons.filter((chanson) => chanson.slug);

    const groupesParSaison = Object.values(
        chansonsAvecSlug.reduce((acc, chanson) => {
            const seasonName = chanson.seasonName?.trim() || "Autres chansons";

            if (!acc[seasonName]) {
                acc[seasonName] = {
                    seasonName,
                    seasonOrder: chanson.seasonOrder ?? 999,
                    songs: [],
                };
            }

            acc[seasonName].songs.push(chanson);

            return acc;
        }, {} as Record<
            string,
            {
                seasonName: string;
                seasonOrder: number;
                songs: Chanson[];
            }
        >)
    )
        .sort(
            (a, b) =>
                a.seasonOrder - b.seasonOrder ||
                a.seasonName.localeCompare(b.seasonName)
        )
        .map((group) => ({
            ...group,
            songs: group.songs.sort(
                (a, b) =>
                    (a.episode ?? 999) - (b.episode ?? 999) ||
                    a.title.localeCompare(b.title, "fr")
            ),
        }));

    return (
        <main className="songs-page">
            <section className="songs-intro">
                <h1>Chansons</h1>
            </section>

            <section className="songs-seasons-list">
                {groupesParSaison.map((group) => (
                    <details key={group.seasonName} className="songs-season-block" open>
                        <summary className="songs-season-summary">
                            <span className="songs-season-title">{group.seasonName}</span>
                            <span className="songs-season-count">
                                {group.songs.length} chanson{group.songs.length > 1 ? "s" : ""}
                            </span>
                        </summary>

                        <ul className="songs-list">
                            {group.songs.map((chanson) => (
                                <li key={chanson.id} className="songs-item">
                                    <Link
                                        href={`/chansons/${chanson.slug}`}
                                        className="song-play-button"
                                    >
                                        <span className="song-play-icon">▶</span>
                                    </Link>

                                    <Link
                                        href={`/chansons/${chanson.slug}`}
                                        className="songs-link"
                                    >
                                        {chanson.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </details>
                ))}
            </section>
        </main>
    );
}