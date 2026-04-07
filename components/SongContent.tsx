"use client";

import { useEffect, useMemo, useRef } from "react";

type SongContentProps = {
    title: string;
    slug?: string;
    lyrics?: string;
    youtubeUrl?: string;
    hideTitle?: boolean;
    source?: "home" | "song_page";
};

declare global {
    interface Window {
        YT?: any;
        onYouTubeIframeAPIReady?: () => void;
        gtag?: (...args: any[]) => void;
    }
}

function getYoutubeVideoId(url?: string) {
    if (!url) return null;

    try {
        const parsed = new URL(url);

        if (parsed.hostname.includes("youtube.com")) {
            const id = parsed.searchParams.get("v");
            return id || null;
        }

        if (parsed.hostname.includes("youtu.be")) {
            const id = parsed.pathname.replace("/", "");
            return id || null;
        }

        return null;
    } catch {
        return null;
    }
}

function loadYouTubeAPI(): Promise<any> {
    return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve(window.YT);
            return;
        }

        const existingScript = document.querySelector(
            'script[src="https://www.youtube.com/iframe_api"]'
        );

        if (!existingScript) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }

        const previous = window.onYouTubeIframeAPIReady;

        window.onYouTubeIframeAPIReady = () => {
            if (typeof previous === "function") {
                previous();
            }
            resolve(window.YT);
        };
    });
}

export default function SongContent({
    title,
    slug,
    lyrics,
    youtubeUrl,
    hideTitle = false,
    source,
}: SongContentProps) {
    const videoId = useMemo(() => getYoutubeVideoId(youtubeUrl), [youtubeUrl]);
    const playerContainerRef = useRef<HTMLDivElement | null>(null);
    const trackedPlayRef = useRef(false);

    useEffect(() => {
        if (!videoId || !playerContainerRef.current) return;

        let player: any = null;
        let cancelled = false;

        loadYouTubeAPI().then((YT) => {
            if (cancelled || !playerContainerRef.current || !YT?.Player) return;

            player = new YT.Player(playerContainerRef.current, {
                videoId,
                width: "100%",
                height: "100%",
                playerVars: {
                    rel: 0,
                },
                events: {
                    onStateChange: (event: any) => {
                        if (
                            event.data === window.YT?.PlayerState?.PLAYING &&
                            !trackedPlayRef.current
                        ) {
                            trackedPlayRef.current = true;

                            window.gtag?.("event", "song_play", {
                                song_title: title,
                                song_slug: slug ?? "",
                                song_source: source ?? "",
                                page_location:
                                    typeof window !== "undefined" ? window.location.pathname : "",
                            });
                        }
                    },
                },
            });
        });

        return () => {
            cancelled = true;
            if (player && typeof player.destroy === "function") {
                player.destroy();
            }
        };
    }, [videoId, title, slug, source]);

    return (
        <section className="song-content">
            {!hideTitle && <h1>{title}</h1>}

            {videoId && (
                <section className="song-video">
                    <div ref={playerContainerRef} />
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