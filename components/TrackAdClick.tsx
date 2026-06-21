"use client";

import Link from "next/link";

type Props = {
    href: string;
    children: React.ReactNode;
    className?: string;
    ariaLabel?: string;
    adName?: string;
};

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

export default function TrackAdClick({
    href,
    children,
    className,
    ariaLabel,
    adName,
}: Props) {
    const handleClick = () => {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("event", "ad_click", {
                destination_url: href,
                ad_name: adName ?? "",
                page_location: window.location.pathname,
            });
        }
    };

    return (
        <Link href={href} onClick={handleClick} className={className} aria-label={ariaLabel}>
            {children}
        </Link>
    );
}