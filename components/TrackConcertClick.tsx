"use client";

type Props = {
    href: string;
    concertTitle?: string;
    concertCity?: string;
    concertDate?: string;
    concertSource: "banner" | "list";
    children: React.ReactNode;
    className?: string;
    ariaLabel?: string;
};

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

export default function TrackConcertClick({
    href,
    concertTitle,
    concertCity,
    concertDate,
    concertSource,
    children,
    className,
    ariaLabel,
}: Props) {
    const handleClick = () => {
        window.gtag?.("event", "concert_click", {
            destination_url: href,
            concert_title: concertTitle ?? "",
            concert_city: concertCity ?? "",
            concert_date: concertDate ?? "",
            concert_source: concertSource ?? "",
            page_location: window.location.pathname,
        });
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className={className}
            aria-label={ariaLabel}
        >
            {children}
        </a>
    );
}