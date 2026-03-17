async function fetchAllRecords(tableName) {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    if (!baseId || !token) {
        throw new Error("Variables d'environnement Airtable manquantes.");
    }

    let allRecords = [];
    let offset = null;

    do {
        let url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?pageSize=100`;

        if (offset) {
            url += `&offset=${encodeURIComponent(offset)}`;
        }

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Impossible de charger ${tableName} depuis Airtable. ${errorText}`);
        }

        const data = await response.json();

        allRecords = allRecords.concat(data.records || []);
        offset = data.offset || null;
    } while (offset);

    return allRecords;
}

export async function getChansons() {
    const table = process.env.AIRTABLE_TABLE;

    if (!table) {
        throw new Error("Variable d'environnement AIRTABLE_TABLE manquante.");
    }

    const records = await fetchAllRecords(table);

    const chansons = records.map((record) => ({
        id: record.id,
        slug: record.fields.slug || "",
        title: record.fields.title || "",
        seasonName: Array.isArray(record.fields.seasonName)
            ? record.fields.seasonName[0] || ""
            : record.fields.seasonName || "",
        seasonOrder: Array.isArray(record.fields.seasonOrder)
            ? (typeof record.fields.seasonOrder[0] === "number" ? record.fields.seasonOrder[0] : null)
            : (typeof record.fields.seasonOrder === "number" ? record.fields.seasonOrder : null),
        episode: typeof record.fields.episode === "number"
            ? record.fields.episode
            : null,
        lyrics: record.fields.lyrics || "",
        youtubeUrl: record.fields.youtubeUrl || "",
        spotifyUrl: record.fields.spotifyUrl || "",
        isHomeFeatured: !!record.fields.isHomeFeatured,
    }));

    chansons.sort((a, b) => {
        const seasonA = a.seasonOrder ?? 999;
        const seasonB = b.seasonOrder ?? 999;

        if (seasonA !== seasonB) {
            return seasonA - seasonB;
        }

        const episodeA = a.episode ?? 999;
        const episodeB = b.episode ?? 999;

        if (episodeA !== episodeB) {
            return episodeA - episodeB;
        }

        return a.title.localeCompare(b.title, "fr");
    });

    return chansons;
}

export async function getHomeFeaturedChanson() {
    const chansons = await getChansons();
    return chansons.find((chanson) => chanson.isHomeFeatured) || null;
}

export async function getConcerts() {
    const records = await fetchAllRecords("Concerts");

    const concerts = records.map((record) => ({
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

    return concerts;
}

export async function getHighlightedConcert() {
    const concerts = await getConcerts();
    return concerts.find((concert) => concert.isHighlighted) || null;
}