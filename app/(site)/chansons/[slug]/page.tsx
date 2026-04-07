export const revalidate = 3600;

import Link from "next/link";
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

    const previousIndex = index === 0 ? chansons.length - 1 : index - 1;
    const nextIndex = index === chansons.length - 1 ? 0 : index + 1;

    const previousSong = chansons[previousIndex];
    const nextSong = chansons[nextIndex];

    return (
        <main className="song-page">
            <section className="song-header-block">
                <div className="song-title-row">
                    <TrackSongClick
                        href={`/chansons/${previousSong.slug}`}
                        className="song-nav-button"
                        aria-label={`Chanson précédente : ${previousSong.title}`}
                        song_title={previousSong.title}
                        song_slug={previousSong.slug}
                        source="navigation"
                    >
                        ⏮️
                    </TrackSongClick>

                    <TrackSongClick
                        href={`/chansons/${nextSong.slug}`}
                        className="song-nav-button"
                        aria-label={`Chanson suivante : ${nextSong.title}`}
                        song_title={nextSong.title}
                        song_slug={nextSong.slug}
                        source="navigation"
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
                lyrics={chanson.lyrics}
                youtubeUrl={chanson.youtubeUrl}
                hideTitle
            />
        </main>
    );
}