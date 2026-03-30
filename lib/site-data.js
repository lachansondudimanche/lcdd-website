import saisonsData from "@/data/saisons.json";
import chansonsData from "@/data/chansons.json";
import concertsData from "@/data/concerts.json";
import boutiqueData from "@/data/boutique.json";

function toBoolean(value) {
    return String(value).toLowerCase() === "true";
}

function toNumber(value, fallback = 0) {
    if (value === undefined || value === null || value === "") {
        return fallback;
    }
    const n = Number(value);
    return Number.isNaN(n) ? fallback : n;
}

function normalizeSeasonKey(value) {
    return String(value || "").trim();
}

function normalize(value) {
    return String(value || "")
        .trim()
        .toLowerCase();
}

export async function getSaisons() {
    return saisonsData.map((row) => ({
        slug: normalizeSeasonKey(row.slug || row.name || row.title || row.seasonName),
        name: row.name || row.title || row.seasonName || "",
        order: toNumber(row.order, 9999),
    }));
}

export async function getChansons() {
    return chansonsData
        .map((row) => ({
            slug: String(row.slug || "").trim(),
            title: String(row.title || "").trim(),
            lyrics: row.lyrics || "",
            youtubeUrl: row.youtubeUrl || "",
            spotifyUrl: row.spotifyUrl || "",
            seasonSlug: String(row.seasonSlug || "").trim(),
            seasonName: String(row.seasonName || row.season || "").trim(),
            seasonOrder: toNumber(row.seasonOrder, 9999),
            episode: toNumber(row.episode, 9999),
            isHomeFeatured: toBoolean(row.isHomeFeatured),
        }))
        .filter((song) => song.slug && song.title);
}

export async function getChansonsGroupedBySeason() {
    const saisons = await getSaisons();
    const chansons = await getChansons();

    const seasonMeta = new Map(
        saisons.map((s) => {
            const key = normalize(s.slug || s.name);
            return [
                key,
                {
                    slug: s.slug || s.name,
                    name: s.name || s.slug,
                    order: s.order,
                },
            ];
        })
    );

    const groupsMap = new Map();

    for (const chanson of chansons) {
        const rawKey = chanson.seasonName || chanson.seasonSlug;
        const key = normalize(rawKey);

        if (!key) {
            continue;
        }

        const meta = seasonMeta.get(key) || {
            slug: rawKey,
            name: rawKey,
            order: chanson.seasonOrder ?? 9999,
        };

        if (!groupsMap.has(meta.slug)) {
            groupsMap.set(meta.slug, {
                ...meta,
                songs: [],
            });
        }

        groupsMap.get(meta.slug).songs.push(chanson);
    }

    return Array.from(groupsMap.values()).filter((group) => group.songs.length > 0);
}

export async function getFeaturedSong() {
    const chansons = await getChansons();
    return chansons.find((song) => song.isHomeFeatured) || null;
}

export async function getSongBySlug(slug) {
    const chansons = await getChansons();
    return chansons.find((song) => song.slug === slug) || null;
}

export async function getSongNavigation(slug) {
    const chansons = await getChansons();

    const index = chansons.findIndex((song) => song.slug === slug);

    if (index === -1) {
        return { prevSong: null, nextSong: null };
    }

    return {
        prevSong: index > 0 ? chansons[index - 1] : null,
        nextSong: index < chansons.length - 1 ? chansons[index + 1] : null,
    };
}

export async function getConcerts() {
    return concertsData.map((row) => ({
        title: row.title || "",
        date: row.date || "",
        dateLabel: row.dateLabel || "",
        city: row.city || "",
        department: row.department || "",
        bookingUrl: row.bookingUrl || "",
        status: row.status || "",
        override_status: row.override_status || "",
        isHighlighted: toBoolean(row.isHighlighted),
        order: row.order ?? null,
    }));
}

export async function getHighlightedConcert() {
    const concerts = await getConcerts();
    return concerts.find((concert) => concert.isHighlighted) || null;
}

export async function getBoutiqueItems() {
    function parsePrice(value) {
        if (value === undefined || value === null || value === "") return 0;
        if (typeof value === "number") return value;

        const normalized = String(value)
            .replace(/\u00A0/g, " ")
            .replace("€", "")
            .replace(",", ".")
            .trim();

        const n = Number(normalized);
        return Number.isNaN(n) ? 0 : n;
    }

    return boutiqueData.map((row) => ({
        offer: row.offer || "",
        price: parsePrice(row.price),
        buyUrl: row.buyUrl || row.buy_URL || "",
        emoji: row.emoji || "",
        description: row.description || "",
        sortOrder: row.sortOrder ?? 9999,
    }));
}