export const revalidate = 3600;

import { notFound } from "next/navigation";
import SongContent from "@/components/SongContent";
import { getChansons } from "@/lib/site-data";
import TrackSongClick from "@/components/TrackSongClick";

type Chanson = {
    slug: string;
    title: string;
    lyrics: string;
    youtubeUrl: string;
    spotifyUrl: string;
    seasonSlug?: string;
    seasonName?: string;
    isTeaser?: boolean;
};

// Depuis `fromIndex`, cherche la chanson navigable la plus proche dans la
// direction donnée (+1 ou -1), en sautant par-dessus les teasers et en
// bouclant sur la liste. Fonctionne que la chanson courante soit elle-même
// un teaser ou une vraie chanson.
function findAdjacentNavigableSong(
    allSongs: Chanson[],
    fromIndex: number,
    direction: 1 | -1
): Chanson | null {
    const total = allSongs.length;

    for (let steps = 1; steps <= total; steps += 1) {
        const index = (fromIndex + direction * steps + total) % total;
        if (!allSongs[index].isTeaser) {
            return allSongs[index];
        }
    }

    return null;
}

export async function generateStaticParams() {
    const chansons: Chanson[] = await getChansons();

    return chansons
        .filter((chanson) => chanson.slug)
        .map((chanson) => ({
            slug: chanson.slug,
        }));
}

export default async function ChansonPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const chansons: Chanson[] = (await getChansons()).filter(
        (c) => c.slug
    );

    const index = chansons.findIndex((item) => item.slug === slug);

    if (index === -1) {
        notFound();
    }

    const chanson = chansons[index];

    const previousSong = findAdjacentNavigableSong(chansons, index, -1);
    const nextSong = findAdjacentNavigableSong(chansons, index, 1);

    return (
        <main className="song-page">
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
                                songSource="navigation"
                            >
                                ⏮️
                            </TrackSongClick>

                            <TrackSongClick
                                href={`/chansons/${nextSong.slug}`}
                                className="song-nav-button"
                                aria-label={`Chanson suivante : ${nextSong.title}`}
                                songTitle={nextSong.title}
                                songSlug={nextSong.slug}
                                songSource="navigation"
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
                source="song_page"
            />
        </main>
    );
}