import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>La Chanson du Dimanche</h1>
      <p>
        <Link href="/chansons">Voir les chansons</Link>
      </p>
    </main>
  );
}