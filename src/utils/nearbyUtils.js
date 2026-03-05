export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get user location (returns Promise with {lat, lon} or error)
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        resolve({ lat, lon });
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  });
};

// Query Overpass API for nearby places (hospitals or pharmacies)
// radius in meters (e.g., 5000 = 5km)
export const fetchNearbyPlaces = async (type, lat, lon, radius = 5000) => {
  const amenity = type === 'hospital' ? 'hospital' : 'pharmacy';
  const overpassQuery = `[out:json][timeout:25];
    (
      node["amenity"="\( {amenity}"](around: \){radius},\( {lat}, \){lon});
      way["amenity"="\( {amenity}"](around: \){radius},\( {lat}, \){lon});
      relation["amenity"="\( {amenity}"](around: \){radius},\( {lat}, \){lon});
    );
    out body;
    >;
    out skel qt;`;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: overpassQuery,
    });
    if (!response.ok) throw new Error('Overpass API error');
    const data = await response.json();
    return data.elements.map((el) => ({
      id: el.id,
      name: el.tags?.name || 'Unnamed ' + amenity,
      address: el.tags?.addr_street || el.tags?.addr_city || 'Address not available',
      lat: el.lat || (el.center && el.center.lat),
      lon: el.lon || (el.center && el.center.lon),
      // Note: No reliable rating in OSM; handle via Google Maps link
    })).filter((place) => place.lat && place.lon); // Filter valid coords
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};