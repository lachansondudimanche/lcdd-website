import Header from "@/components/Header";
import AdBanner970 from "@/components/AdBanner970";
import NextConcertBanner from "@/components/NextConcertBanner";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="site-shell">
                <Header />
                <AdBanner970 />
                <NextConcertBanner />
                {children}
                <Footer />
                <Copyright />
            </div>
        </>
    );
}