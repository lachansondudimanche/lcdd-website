"use client";

type Props = {
    href: string;
    socialPlatform: "facebook" | "instagram" | "spotify" | "deezer" | "amazon" | "youtube";
    children: React.ReactNode;
    className?: string;
    ariaLabel?: string;
};

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

export default function TrackSocialClick({
    href,
    socialPlatform,
    children,
    className,
    ariaLabel,
}: Props) {
    const handleClick = () => {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("event", "social_click", {
                destination_url: href,
                social_platform: socialPlatform,
                page_location: window.location.pathname,
            });
        }
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            aria-label={ariaLabel}
            onClick={handleClick}
        >
            {children}
        </a>
    );
}