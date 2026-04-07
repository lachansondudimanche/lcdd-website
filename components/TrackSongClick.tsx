"use client";

import React from "react";

type Props = {
    href: string;
    children: React.ReactNode;
    song_title: string;
    song_slug: string;
    source: "home" | "list" | "navigation";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function TrackSongClick({
    href,
    children,
    song_title,
    song_slug,
    source,
    ...rest
}: Props) {
    const handleClick = () => {
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "song_click", {
                song_title,
                song_slug,
                source,
                page_location: window.location.pathname,
            });
        }
    };

    return (
        <a href={href} onClick={handleClick} {...rest}>
            {children}
        </a>
    );
}