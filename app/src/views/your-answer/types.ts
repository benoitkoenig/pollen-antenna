import type { CountryCode } from "@pollen-antenna/static-data";

export interface GeolocationData {
  countryCode: CountryCode;
  subdivision: string;
}
