import csv
import json
import os
from datetime import datetime

DATA_DIR = "data"
FILES = ["boutique.csv", "chansons.csv", "concerts.csv", "saisons.csv"]


def normalize_value(value):
    if value is None:
        return ""
    return value.strip()


def try_number(value):
    if value == "":
        return value

    try:
        v = value.replace(",", ".")
        n = float(v)
        return int(n) if n.is_integer() else n
    except Exception:
        return value


def convert_value(key, value):
    value = normalize_value(value)

    numeric_fields = {
        "year",
        "order",
        "songsCount",
        "seasonOrder",
        "episode",
        "price",
        "sortOrder",
    }

    if key in numeric_fields:
        return try_number(value)

    return value


def parse_price(value):
    if value is None:
        return 0

    s = str(value).replace("\u00A0", " ").replace("€", "").replace(",", ".").strip()
    try:
        n = float(s)
        return int(n) if n.is_integer() else n
    except Exception:
        return 0


def parse_date_flexible(value):
    """
    Essaie plusieurs formats de date.
    Retourne un datetime minimal si échec pour éviter de casser le tri.
    """
    if not value:
        return datetime.min

    value = str(value).strip()

    formats = [
        "%d/%m/%Y",  # 17/05/2026
        "%m/%d/%Y",  # 2/18/2007
        "%Y-%m-%d",  # 2026-05-17
        "%d-%m-%Y",
        "%m-%d-%Y",
    ]

    for fmt in formats:
        try:
            return datetime.strptime(value, fmt)
        except ValueError:
            pass

    return datetime.min


def sort_rows(filename, rows):
    if filename == "concerts.csv":
        def concert_key(row):
            order = row.get("order", "")
            has_order = order != ""
            numeric_order = row["order"] if isinstance(row.get("order"), (int, float)) else -10**9
            parsed_date = parse_date_flexible(row.get("date", ""))

            # ordre décroissant si present, sinon date décroissante
            return (1 if has_order else 0, numeric_order, parsed_date)

        return sorted(rows, key=concert_key, reverse=True)

    if filename == "boutique.csv":
        def boutique_key(row):
            sort_order = row.get("sortOrder", "")
            has_sort_order = sort_order != ""
            numeric_sort_order = row["sortOrder"] if isinstance(row.get("sortOrder"), (int, float)) else 10**9
            price = parse_price(row.get("price", ""))

            if has_sort_order:
                return (0, numeric_sort_order, price)
            return (1, price, 0)

        return sorted(rows, key=boutique_key)

    if filename == "chansons.csv":
        def chanson_key(row):
            season_order = row.get("seasonOrder", 10**9)
            episode = row.get("episode", 10**9)
            title = str(row.get("title", "")).lower()
            return (season_order if isinstance(season_order, (int, float)) else 10**9,
                    episode if isinstance(episode, (int, float)) else 10**9,
                    title)

        return sorted(rows, key=chanson_key)

    if filename == "saisons.csv":
        def saison_key(row):
            order = row.get("order", 10**9)
            year = row.get("year", 10**9)
            name = str(row.get("name", row.get("title", ""))).lower()
            return (
                order if isinstance(order, (int, float)) else 10**9,
                year if isinstance(year, (int, float)) else 10**9,
                name,
            )

        return sorted(rows, key=saison_key)

    return rows


def convert_file(csv_filename):
    csv_path = os.path.join(DATA_DIR, csv_filename)
    json_filename = csv_filename.replace(".csv", ".json")
    json_path = os.path.join(DATA_DIR, json_filename)

    with open(csv_path, "r", encoding="utf-8-sig", newline="") as csvfile:
        reader = csv.DictReader(csvfile)
        rows = []

        for row in reader:
            normalized_row = {}
            for key, value in row.items():
                normalized_row[key] = convert_value(key, value)
            rows.append(normalized_row)

    rows = sort_rows(csv_filename, rows)

    with open(json_path, "w", encoding="utf-8") as jsonfile:
        json.dump(rows, jsonfile, indent=2, ensure_ascii=False)

    print(f"OK: {csv_filename} -> {json_filename} ({len(rows)} lignes)")


def main():
    for filename in FILES:
        convert_file(filename)


if __name__ == "__main__":
    main()