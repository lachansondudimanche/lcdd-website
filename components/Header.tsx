"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header className="site-header">
            <button
                type="button"
                className="nav-toggle"
                aria-expanded={menuOpen}
                aria-controls="main-nav"
                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span />
                <span />
                <span />
            </button>

            <nav
                id="main-nav"
                className={`main-nav ${menuOpen ? "main-nav-open" : ""}`}
            >
                <Link href="/" onClick={closeMenu}>Accueil</Link>
                <Link href="/chansons" onClick={closeMenu}>Chansons</Link>
                <Link href="/concerts" onClick={closeMenu}>Concerts</Link>
                <Link href="/boutique" onClick={closeMenu}>Boutique</Link>
                <Link href="/contact" onClick={closeMenu}>Contact</Link>
            </nav>
        </header>
    );
}