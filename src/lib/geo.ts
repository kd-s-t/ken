export interface GeoData {
  country?: string;
  location?: string;
  city?: string;
  region?: string;
}

export async function getGeoData(ipAddress: string): Promise<GeoData> {
  try {
    if (ipAddress === "127.0.0.1" || ipAddress === "::1" || ipAddress.startsWith("192.168.") || ipAddress.startsWith("10.") || ipAddress === "unknown") {
      return {
        country: "Local",
        location: "Local Network",
      };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,country,regionName,city,lat,lon`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        return {};
      }

      const data = await response.json();

      if (data.status === "success") {
        return {
          country: data.country || undefined,
          location: data.city && data.regionName ? `${data.city}, ${data.regionName}` : data.city || data.regionName || undefined,
          city: data.city || undefined,
          region: data.regionName || undefined,
        };
      }

      return {};
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    return {};
  }
}
