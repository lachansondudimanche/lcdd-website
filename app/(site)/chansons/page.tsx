export const revalidate = 3600;

import { getChansonsGroupedBySeason } from "@/lib/site-data";
import TrackSongClick from "@/components/TrackSongClick";

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
                                    <TrackSongClick
                                        href={`/chansons/${chanson.slug}`}
                                        className="song-play-button"
                                        songTitle={chanson.title}
                                        songSlug={chanson.slug}
                                        songSource="list"
                                    >
                                        <span className="song-play-icon">▶</span>
                                    </TrackSongClick>

                                    <TrackSongClick
                                        href={`/chansons/${chanson.slug}`}
                                        className="songs-link"
                                        songTitle={chanson.title}
                                        songSlug={chanson.slug}
                                        songSource="list"
                                    >
                                        {chanson.title}
                                    </TrackSongClick>
                                </li>
                            ))}
                        </ul>
                    </details>
                ))}
            </section>
        </main>
    );
}