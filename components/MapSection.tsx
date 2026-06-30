"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MAP_CENTER, MAP_ZOOM, SEED_PINS } from "@/lib/constants";

const ROLE_COLORS: Record<string, string> = {
  driver:     "#34E0E0",
  restaurant: "#F59E0B",
  fleet:      "#A78BFA",
};

const ROLE_LABELS: Record<string, string> = {
  driver:     "Driver",
  restaurant: "Restaurant / Venue",
  fleet:      "Fleet Operator",
};

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (typeof window === "undefined" || instanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current || instanceRef.current) return;

      // Fix default icon paths broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: MAP_CENTER,
        zoom:   MAP_ZOOM,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      instanceRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);

      SEED_PINS.forEach((pin) => {
        const color = ROLE_COLORS[pin.role] ?? "#34E0E0";
        const icon = L.divIcon({
          html: `<div style="width:12px;height:12px;border-radius:50%;background:${color};border:2px solid #0A0B0D;box-shadow:0 0 6px ${color}88;"></div>`,
          className: "",
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });

        L.marker([pin.lat, pin.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<strong style="color:${color}">${ROLE_LABELS[pin.role] ?? pin.role}</strong><br/><span style="font-size:12px">${pin.note}</span>`,
            { className: "valev-popup" }
          );
      });
    });

    return () => {
      if (instanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (instanceRef.current as any).remove();
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <section id="map" className="py-24 px-6" style={{ background: "var(--color-void)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p
            className="type-eyebrow mb-5"
            style={{ color: "var(--color-cyan)" }}
          >
            Coverage
          </p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-silver-hi)" }}
          >
            Growing across South India.
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--color-silver-mid)" }}>
            Drivers, restaurants, and fleet operators already on the network.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-5 mb-6">
          {Object.entries(ROLE_LABELS).map(([role, label]) => (
            <div key={role} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-silver-mid)" }}>
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: ROLE_COLORS[role] }}
              />
              {label}
            </div>
          ))}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "var(--color-border)", height: 480 }}
        >
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
        </motion.div>
      </div>
    </section>
  );
}
