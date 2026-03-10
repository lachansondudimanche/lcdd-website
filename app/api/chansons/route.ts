import { NextResponse } from "next/server";
import { getChansons } from "@/lib/airtable";

export async function GET() {
    try {
        const chansons = await getChansons();
        return NextResponse.json(chansons);
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur Airtable" },
            { status: 500 }
        );
    }
}