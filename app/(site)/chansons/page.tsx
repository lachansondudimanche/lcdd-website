import Link from "next/link";
import { getChansons } from "@/lib/airtable";

export default async function ChansonsPage() {
    const chansons = await getChansons();

    return (
        <main>
            <h1>Chansons</h1>

            <ul>
                {chansons.map((chanson: any) => (
                    <li key={chanson.id}>
                        {chanson.seasonName ? `${chanson.seasonName} — ` : ""}
                        <Link href={`/chansons/${chanson.slug}`}>
                            {chanson.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}