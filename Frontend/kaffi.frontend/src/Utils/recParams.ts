export function buildRecPath(flavourIds: number[]): string {
    const params = new URLSearchParams();
    flavourIds.forEach((id) => params.append("ids", id.toString()));
    return `/rec?${params}`;
}

export function parseFlavourIds(searchParams: URLSearchParams): number[] {
    return searchParams
        .getAll("ids")
        .map(Number)
        .filter((n) => Number.isInteger(n) && n > 0);
}