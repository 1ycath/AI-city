import { supabase } from '../config/supabase';

const TABLE = 'buildings';
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function fetchBuildings() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('code', { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data;
}

export async function fetchBuildingByIdOrCode(idOrCode) {
  const column = UUID_RE.test(idOrCode) ? 'id' : 'code';
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq(column, idOrCode)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export function buildingToMapZone(row) {
  return {
    id: row.id,
    code: row.code,
    name: row.zone_name || row.location,
    lng: row.longitude,
    lat: row.latitude,
    status: row.status ?? 'normal',
    building: {
      name: row.name,
      description: row.description,
      modelUrl: row.model_url,
      floors: row.floors,
      area: row.area,
      builtYear: row.built_year,
    },
  };
}

const DEFAULT_MAP_CENTER = [116.397428, 39.90923];
const DEFAULT_MAP_ZOOM = 12;

export function computeMapViewport(zones) {
  if (!zones.length) {
    return { center: DEFAULT_MAP_CENTER, zoom: DEFAULT_MAP_ZOOM };
  }

  const lngs = zones.map((zone) => zone.lng);
  const lats = zones.map((zone) => zone.lat);
  const center = [
    (Math.min(...lngs) + Math.max(...lngs)) / 2,
    (Math.min(...lats) + Math.max(...lats)) / 2,
  ];

  const span = Math.max(
    Math.max(...lngs) - Math.min(...lngs),
    Math.max(...lats) - Math.min(...lats),
    0.01,
  );

  let zoom = DEFAULT_MAP_ZOOM;
  if (span > 0.2) zoom = 10;
  else if (span > 0.1) zoom = 11;
  else if (span > 0.05) zoom = 12;
  else if (span > 0.02) zoom = 13;
  else zoom = 14;

  return { center, zoom };
}

export async function fetchMapZones() {
  const rows = await fetchBuildings();
  return rows
    .filter(
      (row) =>
        row.latitude != null &&
        row.longitude != null &&
        !Number.isNaN(row.latitude) &&
        !Number.isNaN(row.longitude),
    )
    .map(buildingToMapZone);
}

export async function createBuilding(building) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(building)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateBuilding(id, building) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(building)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBuilding(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
