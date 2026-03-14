type SongContentProps = {
    title: string;
    lyrics?: string;
    youtubeUrl?: string;
    hideTitle?: boolean;
};

function getYoutubeEmbedUrl(url?: string) {
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

export default function SongContent({
    title,
    lyrics,
    youtubeUrl,
    hideTitle = false,
}: SongContentProps) {
    const embedUrl = getYoutubeEmbedUrl(youtubeUrl);

    return (
        <section className="song-content">
            {!hideTitle && <h1>{title}</h1>}

            {embedUrl && (
                <section className="song-video">
                    <iframe
                        src={embedUrl}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </section>
            )}

            {lyrics && (
                <section className="lyrics-box">
                    <pre>🎵 {lyrics}</pre>
                </section>
            )}
        </section>
    );
}