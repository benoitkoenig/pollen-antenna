import type { CountryCode } from "./countries";

export async function importSubdivisions(
  countryCode: CountryCode,
): Promise<string[]> {
  const module = await import(`./subdivisions-per-country/${countryCode}.json`);

  return module.default;
}
