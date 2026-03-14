import Header from "@/components/Header";

export default function SansFooterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <div className="site-container">{children}</div>
        </>
    );
}