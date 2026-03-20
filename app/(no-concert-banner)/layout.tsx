import Header from "@/components/Header";
import AdBanner970 from "@/components/AdBanner970";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";

export default function SiteNoBannerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="site-shell">
                <Header />
                <AdBanner970 />
                {children}
                <Footer />
                <Copyright />
            </div>
        </>
    );
}