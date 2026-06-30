// lib/geoCoordinates.ts

export const COUNTRY_COORDS: Record<string, [number, number]> = {
  "United States": [-95.7129, 37.0902],
  "United Kingdom": [-3.4360, 55.3781],
  "Canada": [-106.3468, 56.1304],
  "Australia": [133.7751, -25.2744],
  "Germany": [10.4515, 51.1657],
  "France": [2.2137, 46.2276],
  "India": [78.9629, 20.5937],
  "Japan": [138.2529, 36.2048],
  "Brazil": [-51.9253, -14.2350],
  "South Africa": [22.9375, -30.5595],
  // add more as story submissions come in from new countries
};

export const US_STATE_COORDS: Record<string, [number, number]> = {
  "FL": [-81.5158, 27.6648],
  "TX": [-99.9018, 31.9686],
  "MA": [-71.5301, 42.4072],
  "WA": [-120.7401, 47.7511],
  "CA": [-119.4179, 36.7783],
  "NY": [-74.2179, 43.2994],
  // add more states as needed — or swap to a full 50-state map/npm package
  // (e.g. `us-state-codes` or a static JSON) if you want full coverage
};

export function resolveCoords(country?: string, state?: string): [number, number] | null {
  if (country === "United States" && state && US_STATE_COORDS[state]) {
    return US_STATE_COORDS[state];
  }
  if (country && COUNTRY_COORDS[country]) {
    return COUNTRY_COORDS[country];
  }
  return null;
}