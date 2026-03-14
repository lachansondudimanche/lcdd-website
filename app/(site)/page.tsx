import SongContent from "@/components/SongContent";
import { getHomeFeaturedChanson } from "@/lib/airtable";

export default async function HomePage() {
    const chanson = await getHomeFeaturedChanson();

    return (
        <main className="home-page">
            {chanson ? (
                <SongContent
                    title={chanson.title}
                    lyrics={chanson.lyrics}
                    youtubeUrl={chanson.youtubeUrl}
                />
            ) : (
                <p>Aucune chanson mise en avant pour l’accueil.</p>
            )}
        </main>
    );
}