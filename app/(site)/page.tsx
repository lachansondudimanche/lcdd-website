export const revalidate = 3600;

import SongContent from "@/components/SongContent";
import { getChansons } from "@/lib/site-data";
import TrackSongClick from "@/components/TrackSongClick";

// Depuis `fromIndex`, cherche la chanson navigable la plus proche dans la
// direction donnée (+1 ou -1), en sautant par-dessus les teasers et en
// bouclant sur la liste. Fonctionne que `chanson` lui-même soit un teaser
// ou une vraie chanson.
function findAdjacentNavigableSong<T extends { isTeaser?: boolean }>(
    allSongs: T[],
    fromIndex: number,
    direction: 1 | -1
): T | null {
    const total = allSongs.length;

    for (let steps = 1; steps <= total; steps += 1) {
        const index = (fromIndex + direction * steps + total) % total;
        if (!allSongs[index].isTeaser) {
            return allSongs[index];
        }
    }

    return null;
}

export default async function HomePage() {
    const chansons = await getChansons();
    const chansonsAvecSlug = chansons.filter((c) => c.slug);
    const chanson = chansonsAvecSlug.find((c) => c.isHomeFeatured);

    if (!chanson) {
        return <p>Aucune chanson mise en avant pour l’accueil.</p>;
    }

    const index = chansonsAvecSlug.findIndex((c) => c.slug === chanson.slug);

    const previousSong = findAdjacentNavigableSong(
        chansonsAvecSlug,
        index,
        -1
    );
    const nextSong = findAdjacentNavigableSong(chansonsAvecSlug, index, 1);

    return (
        <main className="home-page">
            <section className="song-header-block">
                <div className="song-title-row">
                    {previousSong && nextSong && (
                        <>
                            <TrackSongClick
                                href={`/chansons/${previousSong.slug}`}
                                className="song-nav-button"
                                aria-label={`Chanson précédente : ${previousSong.title}`}
                                songTitle={previousSong.title}
                                songSlug={previousSong.slug}
                                songSource="home"
                            >
                                ⏮️
                            </TrackSongClick>

                            <TrackSongClick
                                href={`/chansons/${nextSong.slug}`}
                                className="song-nav-button"
                                aria-label={`Chanson suivante : ${nextSong.title}`}
                                songTitle={nextSong.title}
                                songSlug={nextSong.slug}
                                songSource="home"
                            >
                                ⏭️
                            </TrackSongClick>
                        </>
                    )}

                    <h1>{chanson.title}</h1>
                </div>

                {chanson.seasonName && !chanson.isTeaser && (
                    <p className="song-season">{chanson.seasonName}</p>
                )}
            </section>

            <SongContent
                title={chanson.title}
                slug={chanson.slug}
                lyrics={chanson.lyrics}
                youtubeUrl={chanson.youtubeUrl}
                hideTitle
                source="home"
            />
        </main>
    );
}