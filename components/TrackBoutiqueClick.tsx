"use client";

type Props = {
    href: string;
    className?: string;
    ariaLabel?: string;
    children: React.ReactNode;
    offerName?: string;
    price?: number;
    linkType: "hat" | "button" | "row";
};

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

export default function TrackBoutiqueClick({
    href,
    className,
    ariaLabel,
    children,
    offerName,
    price,
    linkType,
}: Props) {
    const handleClick = () => {
        alert("TRACK CLICK OK");
        console.log("CLICK TRACKED", { offerName, price, linkType, href });

        if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("event", "boutique_click", {
                link_type: linkType,
                offer_name: offerName ?? "",
                price: price ?? 0,
                destination_url: href,
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