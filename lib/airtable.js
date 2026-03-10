export async function getChansons() {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const table = process.env.AIRTABLE_TABLE;
    const token = process.env.AIRTABLE_TOKEN;

    if (!baseId || !table || !token) {
        throw new Error("Variables d'environnement Airtable manquantes.");
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Impossible de charger les chansons depuis Airtable.");
    }

    const data = await response.json();

    return data.records.map((record) => ({
        id: record.id,
        slug: record.fields.slug,
        title: record.fields.title,
        season: Array.isArray(record.fields.seasonName)
            ? record.fields.seasonName.join(", ")
            : record.fields.seasonName || "",
        lyrics: record.fields.lyrics,
        youtubeUrl: record.fields.youtubeUrl,
        spotifyUrl: record.fields.spotifyUrl,
    }));
}