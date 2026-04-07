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

    const index = chansonsAvecSlug.findIndex((c) => c.slug === chanson.slug);

    const previousIndex =
        index === 0 ? chansonsAvecSlug.length - 1 : index - 1;

    const nextIndex =
        index === chansonsAvecSlug.length - 1 ? 0 : index + 1;

    const previousSong = chansonsAvecSlug[previousIndex];
    const nextSong = chansonsAvecSlug[nextIndex];

    return (
        <main className="home-page">
            <section className="song-header-block">
                <div className="song-title-row">
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