"use client";

import React from "react";

type Props = {
    href: string;
    children: React.ReactNode;
    songTitle: string;
    songSlug: string;
    songSource: "home" | "list" | "navigation";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function TrackSongClick({
    href,
    children,
    songTitle,
    songSlug,
    songSource,
    ...rest
}: Props) {
    const handleClick = () => {
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "song_click", {
                song_title: songTitle ?? "",
                song_slug: songSlug ?? "",
                song_source: songSource ?? "",
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