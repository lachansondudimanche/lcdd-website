export const revalidate = 3600;

import SongContent from "@/components/SongContent";
import { getChansons } from "@/lib/site-data";
import TrackSongClick from "@/components/TrackSongClick";

export default async function HomePage() {
    const chansons = await getChansons();
    const chansonsAvecSlug = chansons.filter((c) => c.slug);
    const chanson = chansonsAvecSlug.find((c) => c.isHomeFeatured);

    if (!chanson) {
        return <p>Aucune chanson mise en avant pour l’accueil.</p>;
    }

    // Les teasers ne font pas partie du cycle précédent/suivant : on les
    // exclut de la liste utilisée pour naviguer.
    const chansonsNavigables = chansonsAvecSlug.filter((c) => !c.isTeaser);

    let previousSong = null;
    let nextSong = null;

    if (!chanson.isTeaser) {
        const index = chansonsNavigables.findIndex(
            (c) => c.slug === chanson.slug
        );

        if (index !== -1) {
            const previousIndex =
                index === 0 ? chansonsNavigables.length - 1 : index - 1;

            const nextIndex =
                index === chansonsNavigables.length - 1 ? 0 : index + 1;

            previousSong = chansonsNavigables[previousIndex];
            nextSong = chansonsNavigables[nextIndex];
        }
    }

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
                source="home"
            />
        </main>
    );
}