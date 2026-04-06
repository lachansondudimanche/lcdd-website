"use client";

type Props = {
    href: string;
    concertTitle?: string;
    concertCity?: string;
    concertDate?: string;
    location: "banner" | "list";
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
    location,
    children,
    className,
    ariaLabel,
}: Props) {
    const handleClick = () => {
        window.gtag?.("event", "concert_click", {
            location,
            concert_title: concertTitle ?? "",
            concert_city: concertCity ?? "",
            concert_date: concertDate ?? "",
            destination_url: href,
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