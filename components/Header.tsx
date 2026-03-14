import Link from "next/link";

export default function Header() {
    return (
        <header className="site-header">
            <nav className="main-nav">
                <Link href="/">Accueil</Link>
                <Link href="/chansons">Chansons</Link>
                <Link href="/concerts">Concerts</Link>
                <Link href="/boutique">Boutique</Link>
                <Link href="/contact">Contact</Link>
            </nav>
        </header>
    );
}