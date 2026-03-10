import { notFound } from "next/navigation";
import { getChansons } from "@/lib/airtable";

function getYoutubeEmbedUrl(url: string | undefined) {
    if (!url) return null;

    try {
        const parsed = new URL(url);

        if (parsed.hostname.includes("youtube.com")) {
            const id = parsed.searchParams.get("v");
            return id ? `https://www.youtube.com/embed/${id}` : null;
        }

        if (parsed.hostname.includes("youtu.be")) {
            const id = parsed.pathname.replace("/", "");
            return id ? `https://www.youtube.com/embed/${id}` : null;
        }

        return null;
    } catch {
        return null;
    }
}

export async function generateStaticParams() {
    const chansons = await getChansons();

    return chansons
        .filter((chanson: any) => chanson.slug)
        .map((chanson: any) => ({
            slug: chanson.slug,
        }));
}

export default async function ChansonPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const chansons = await getChansons();

    const chanson = chansons.find((item: any) => item.slug === slug);

    if (!chanson) {
        notFound();
    }

    const embedUrl = getYoutubeEmbedUrl(chanson.youtubeUrl);

    return (
        <main>
            <h1>{chanson.title}</h1>

            {chanson.season && (
                <p><strong>{chanson.season}</strong></p>
            )}

            {embedUrl && (
                <iframe
                    width="560"
                    height="315"
                    src={embedUrl}
                    title={chanson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            )}

            {chanson.lyrics && (
                <>
                    <h2>Paroles</h2>
                    <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                        {chanson.lyrics}
                    </pre>
                </>
            )}
        </main>
    );
}