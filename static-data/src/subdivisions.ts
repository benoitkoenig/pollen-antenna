import type { CountryCode } from "countries";

export async function importSubdivisions(
  countryCode: CountryCode,
): Promise<{ id: string; name: string }[]> {
  const response = await import(
    `./subdivisions-per-country/${countryCode}.json`
  );

  return response;
}
