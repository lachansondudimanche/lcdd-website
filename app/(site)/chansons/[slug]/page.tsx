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

    // Les teasers ne font pas partie du cycle précédent/suivant : on les
    // exclut de la liste utilisée pour naviguer, et on n'affiche pas les
    // flèches quand la page courante est elle-même un teaser.
    const chansonsNavigables = chansons.filter((c) => !c.isTeaser);

    let previousSong = null;
    let nextSong = null;

    if (!chanson.isTeaser) {
        const navIndex = chansonsNavigables.findIndex(
            (item) => item.slug === slug
        );

        if (navIndex !== -1) {
            const previousIndex =
                navIndex === 0 ? chansonsNavigables.length - 1 : navIndex - 1;

            const nextIndex =
                navIndex === chansonsNavigables.length - 1 ? 0 : navIndex + 1;

            previousSong = chansonsNavigables[previousIndex];
            nextSong = chansonsNavigables[nextIndex];
        }
    }

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

                {chanson.seasonName && (
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