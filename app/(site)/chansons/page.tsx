export const revalidate = 3600;

import Link from "next/link";
import { getChansonsGroupedBySeason } from "@/lib/site-data";

type Chanson = {
    slug: string;
    title: string;
    episode?: number;
};

type Groupe = {
    slug: string;
    name: string;
    order: number;
    songs: Chanson[];
};

export default async function ChansonsPage() {
    const groupes: Groupe[] = await getChansonsGroupedBySeason();

    return (
        <main className="songs-page">
            <section className="songs-intro">
                <h1>Chansons</h1>
            </section>

            <section className="songs-seasons-list">
                {groupes.map((group) => (
                    <details key={group.slug} className="songs-season-block" open>
                        <summary className="songs-season-summary">
                            <span className="songs-season-title">{group.name}</span>
                            <span className="songs-season-count">
                                {group.songs.length} chanson{group.songs.length > 1 ? "s" : ""}
                            </span>
                        </summary>

                        <ul className="songs-list">
                            {group.songs.map((chanson) => (
                                <li key={chanson.slug} className="songs-item">
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