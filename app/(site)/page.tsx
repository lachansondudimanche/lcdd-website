import Link from "next/link";
import SongContent from "@/components/SongContent";
import { getChansons, getHomeFeaturedChanson } from "@/lib/airtable";

export default async function HomePage() {
    const chansons = await getChansons();
    const chanson = await getHomeFeaturedChanson();

    if (!chanson) {
        return <p>Aucune chanson mise en avant pour l’accueil.</p>;
    }

    const chansonsAvecSlug = chansons.filter((c) => c.slug);

    const index = chansonsAvecSlug.findIndex(
        (c) => c.slug === chanson.slug
    );

    const previousIndex =
        index === 0 ? chansonsAvecSlug.length - 1 : index - 1;

    const nextIndex =
        index === chansonsAvecSlug.length - 1 ? 0 : index + 1;

    const previousSong = chansonsAvecSlug[previousIndex];
    const nextSong = chansonsAvecSlug[nextIndex];

    return (
        <main className="home-page">
            {/* HEADER comme page chanson */}
            <section className="song-header-block">
                <div className="song-title-row">
                    <Link
                        href={`/chansons/${previousSong.slug}`}
                        className="song-nav-button"
                        aria-label={`Chanson précédente : ${previousSong.title}`}
                    >
                        ⏮
                    </Link>

                    <h1>{chanson.title}</h1>

                    <Link
                        href={`/chansons/${nextSong.slug}`}
                        className="song-nav-button"
                        aria-label={`Chanson suivante : ${nextSong.title}`}
                    >
                        ⏭
                    </Link>
                </div>

                {chanson.seasonName && (
                    <p className="song-season">{chanson.seasonName}</p>
                )}
            </section>

            {/* CONTENU */}
            <SongContent
                title={chanson.title}
                lyrics={chanson.lyrics}
                youtubeUrl={chanson.youtubeUrl}
                hideTitle
            />
        </main>
    );
}