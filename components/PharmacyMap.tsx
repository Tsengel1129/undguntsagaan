"use client";

/* Keyless map (Leaflet + OpenStreetMap tiles) of the veterinary pharmacies.
   Leaflet is framework-agnostic (no React-19 wrapper risk) and imported
   dynamically inside the effect so nothing touches `window` during SSR.
   circleMarker is used instead of the default pin so there are no marker-icon
   asset paths to break in the bundler. */

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef } from "react";
import type { Pharmacy } from "@/lib/firebase/queries";

export default function PharmacyMap({
  pharmacies,
}: {
  pharmacies: Pharmacy[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const points = useMemo(
    () =>
      pharmacies
        .map((p) => ({ p, lat: Number(p.lat), lng: Number(p.lng) }))
        .filter(
          (x) =>
            Number.isFinite(x.lat) &&
            Number.isFinite(x.lng) &&
            (x.lat !== 0 || x.lng !== 0)
        ),
    [pharmacies]
  );

  useEffect(() => {
    if (!ref.current || points.length === 0) return;
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any;

    (async () => {
      const L = (await import("leaflet")).default;
      // Guard against React StrictMode's double-invoke racing two inits onto
      // the same container ("Map container is already initialized").
      const el = ref.current as (HTMLDivElement & { _leaflet_id?: number }) | null;
      if (cancelled || !el || el._leaflet_id) return;

      map = L.map(el, { scrollWheelZoom: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
        maxZoom: 18,
      }).addTo(map);

      const latlngs: [number, number][] = [];
      for (const { p, lat, lng } of points) {
        latlngs.push([lat, lng]);
        const where = [p.aimag, p.sum].filter(Boolean).join(", ");
        L.circleMarker([lat, lng], {
          radius: 8,
          color: "#C8102E",
          weight: 2,
          fillColor: "#C8102E",
          fillOpacity: 0.7,
        })
          .addTo(map)
          .bindPopup(
            `<strong>${p.name}</strong>` +
              (where ? `<br/>${where}` : "") +
              (p.phone ? `<br/>${p.phone}` : "")
          );
      }
      map.fitBounds(latlngs, { padding: [40, 40], maxZoom: 13 });
    })();

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, [points]);

  if (points.length === 0) return null;

  return (
    <div
      ref={ref}
      role="application"
      aria-label="Эмийн сангуудын байршил"
      className="h-[420px] w-full overflow-hidden rounded-lg border border-charcoal/10"
      style={{ background: "#e8eae6" }}
    />
  );
}
