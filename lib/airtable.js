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

    const chansons = data.records.map((record) => ({
        id: record.id,
        slug: record.fields.slug || "",
        title: record.fields.title || "",
        seasonName: Array.isArray(record.fields.seasonName)
            ? record.fields.seasonName.join(", ")
            : record.fields.seasonName || "",
        lyrics: record.fields.lyrics || "",
        youtubeUrl: record.fields.youtubeUrl || "",
        spotifyUrl: record.fields.spotifyUrl || "",
        isHomeFeatured: !!record.fields.isHomeFeatured,
        order: typeof record.fields.order === "number" ? record.fields.order : null,
    }));

    chansons.sort((a, b) => {
        if (a.order !== null && b.order !== null) {
            return a.order - b.order;
        }
        return a.title.localeCompare(b.title, "fr");
    });

    return chansons;
}

export async function getHomeFeaturedChanson() {
    const chansons = await getChansons();

    const featured = chansons.find((chanson) => chanson.isHomeFeatured);

    return featured || null;
}

export async function getConcerts() {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    if (!baseId || !token) {
        throw new Error("Variables d'environnement Airtable manquantes.");
    }

    const table = "Concerts";

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Impossible de charger les concerts depuis Airtable.");
    }

    const data = await response.json();

    const concerts = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title || "",
        date: record.fields.date || "",
        dateLabel: record.fields.dateLabel || "",
        city: record.fields.city || "",
        department: record.fields.department || "",
        bookingUrl: record.fields.bookingUrl || "",
        status: record.fields.status || "",
        isHighlighted: !!record.fields.isHighlighted,
        order: typeof record.fields.order === "number" ? record.fields.order : null,
    }));

    concerts.sort((a, b) => {
        if (a.order !== null && b.order !== null) {
            return b.order - a.order;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // return concerts.filter((concert) => concert.status === "upcoming");
    return concerts;
}

export async function getHighlightedConcert() {
    const concerts = await getConcerts();

    return concerts.find((concert) => concert.isHighlighted) || null;
}