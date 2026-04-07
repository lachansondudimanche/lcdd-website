"use client";

type Props = {
    href: string;
    className?: string;
    ariaLabel?: string;
    children: React.ReactNode;
    shopOffer?: string;
    shopPrice?: number;
    shopSource: "hat" | "button" | "row";
};

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

export default function TrackShopClick({
    href,
    className,
    ariaLabel,
    children,
    shopOffer,
    shopPrice,
    shopSource,
}: Props) {
    const handleClick = () => {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("event", "shop_click", {
                destination_url: href,
                shop_offer: shopOffer ?? "",
                shop_price: shopPrice ?? 0,
                shop_source: shopSource,
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