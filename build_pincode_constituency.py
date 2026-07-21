#!/usr/bin/env python3
"""
build_pincode_constituency.py
=============================================================================
Build a COMPLETE all-India lookup:  PIN code -> { state, district, taluk,
assembly constituency (AC), parliamentary constituency (PC), lat, lng }.

WHY THIS SCRIPT EXISTS
----------------------
- PIN -> location/district/state IS a ready dataset (India Post directory).
- PIN -> constituency (AC/PC) is NOT published by anyone. It must be COMPUTED
  by overlaying each PIN's geographic point on the constituency boundary maps
  (a "point-in-polygon" spatial join). This script does that.

OUTPUT
------
1. pincode_master.csv         -> every PIN with location + AC + PC
2. pins.js                    -> drop this into the LokLens site folder; it
                                 makes every PIN resolve to the exact MP + MLA
                                 automatically. Format: const PINS = {...}

=============================================================================
STEP 0 — INSTALL DEPENDENCIES (one time)
    pip install pandas geopandas shapely pyogrio
  (geopandas needs GDAL; on Windows use conda:  conda install -c conda-forge geopandas)

=============================================================================
STEP 1 — DOWNLOAD THE THREE INPUT FILES (all free, one time)

A) PIN codes WITH latitude/longitude  ->  save as  pincodes.csv
   Options (pick one that has Latitude & Longitude columns):
   - data.gov.in "All India Pincode Directory" (search that title) OR
   - Kaggle "All India Pincode Directory with Lat Long" OR
   - GitHub (community mirrors of the India Post directory)
   Required columns (rename in CODE below if yours differ):
       Pincode, OfficeName, District, StateName, Latitude, Longitude
       (Taluk/Division optional)

B) ASSEMBLY constituency boundaries (GeoJSON/Shapefile) -> save as  AC.geojson
   Source: Datameet community maps  (github.com/datameet/maps -> "assembly-constituencies"),
   or ECI / state CEO GIS portals. Needs an AC-name field + state field.

C) PARLIAMENTARY constituency boundaries -> save as  PC.geojson
   Source: Datameet maps -> "parliamentary-constituencies", or ECI GIS.
   Needs a PC-name field.

  NOTE: field names differ between sources. Set the *_FIELD variables below to
  match your files (open the GeoJSON and look at "properties").

=============================================================================
STEP 2 — RUN:   python build_pincode_constituency.py
"""

import json, re
import pandas as pd
import geopandas as gpd

# ---- CONFIG: file paths ----
PINCODES_CSV = "pincodes.csv"
AC_GEO       = "AC.geojson"
PC_GEO       = "PC.geojson"

# ---- CONFIG: column / property names (EDIT to match your files) ----
COL_PIN, COL_OFFICE, COL_DIST, COL_STATE = "Pincode", "OfficeName", "District", "StateName"
COL_LAT, COL_LNG = "Latitude", "Longitude"
AC_NAME_FIELD, AC_STATE_FIELD = "AC_NAME", "ST_NAME"     # <- check AC.geojson properties
PC_NAME_FIELD = "PC_NAME"                                 # <- check PC.geojson properties

def clean(s):
    return re.sub(r"\s+", " ", str(s)).strip()

print("Loading pincodes…")
df = pd.read_csv(PINCODES_CSV)
df = df.rename(columns={COL_PIN:"pin", COL_OFFICE:"office", COL_DIST:"district",
                        COL_STATE:"state", COL_LAT:"lat", COL_LNG:"lng"})
df = df.dropna(subset=["lat","lng"])
df["pin"] = df["pin"].astype(str).str.extract(r"(\d{6})")[0]
df = df.dropna(subset=["pin"])

gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lng, df.lat), crs="EPSG:4326")

print("Loading constituency boundaries…")
ac = gpd.read_file(AC_GEO).to_crs("EPSG:4326")[[AC_NAME_FIELD, AC_STATE_FIELD, "geometry"]]
ac = ac.rename(columns={AC_NAME_FIELD:"ac", AC_STATE_FIELD:"ac_state"})
pc = gpd.read_file(PC_GEO).to_crs("EPSG:4326")[[PC_NAME_FIELD, "geometry"]]
pc = pc.rename(columns={PC_NAME_FIELD:"pc"})

print("Spatial join: point-in-polygon (this is the actual mapping step)…")
j = gpd.sjoin(gdf, ac, how="left", predicate="within").drop(columns=["index_right"])
j = gpd.sjoin(j, pc, how="left", predicate="within").drop(columns=["index_right"])

print("Collapsing to one row per PIN (most common AC/PC among its post offices)…")
def mode_or_first(s):
    s = s.dropna()
    return s.mode().iloc[0] if len(s) else ""

master = (j.groupby("pin")
            .agg(state=("state", mode_or_first),
                 district=("district", mode_or_first),
                 office=("office", "first"),
                 ac=("ac", mode_or_first),
                 pc=("pc", mode_or_first),
                 lat=("lat","mean"), lng=("lng","mean"))
            .reset_index())

for c in ["state","district","office","ac","pc"]:
    master[c] = master[c].map(clean)

master.to_csv("pincode_master.csv", index=False)
print(f"Wrote pincode_master.csv  ({len(master)} PIN codes)")

# ---- emit pins.js for the LokLens site ----
pins = {r.pin: {"state": r.state, "district": r.district, "ac": r.ac, "pc": r.pc}
        for r in master.itertuples() if r.ac or r.pc}
with open("pins.js", "w", encoding="utf-8") as f:
    f.write("/* AUTO-GENERATED pincode -> constituency map (spatial join). */\n")
    f.write("const PINS = " + json.dumps(pins, ensure_ascii=False, separators=(",",":")) + ";\n")
print(f"Wrote pins.js  ({len(pins)} PINs with a constituency)")

print("""
DONE.
Next: copy pins.js into your LokLens folder (next to acmap.js). The site
already loads it — every PIN will now show the exact MP + MLA automatically.

Caveats to keep it honest:
- A PIN is an area, not a point; border PINs are assigned by their main
  post-office location, so a few edge cases may sit in a neighbouring seat.
- Constituency boundaries are as of the delimitation your GeoJSON reflects.
- AC/PC names from the GeoJSON may differ slightly from the site's names;
  the site matches on a normalised name, which handles most differences.
""")
