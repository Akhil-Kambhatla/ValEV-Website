"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ESTIMATOR, CONTACT } from "@/lib/constants";

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function PartnerEstimator() {
  const [carsPerDay, setCarsPerDay] = useState(ESTIMATOR.defaultCarsPerDay);
  const [unitsPerCar, setUnitsPerCar] = useState(ESTIMATOR.defaultUnitsPerCar);

  const monthlyEarnings = carsPerDay * unitsPerCar * ESTIMATOR.hostPayoutPerUnit * 30;
  const annualEarnings = monthlyEarnings * 12;

  const waLink = `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%27d%20like%20to%20discuss%20hosting%20a%20charger.%20My%20estimate%3A%20${carsPerDay}%20cars%2Fday.`;

  return (
    <section id="partner" className="py-24 px-6" style={{ background: "var(--color-depth)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--color-cyan)" }}
          >
            Partner Estimator
          </p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-silver-hi)" }}
          >
            How much could you earn?
          </h2>
          <p className="mt-4 text-sm" style={{ color: "var(--color-silver-lo)" }}>
            {ESTIMATOR.label}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-8 sm:p-10 border"
          style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Sliders */}
            <div className="flex flex-col gap-8">
              {/* Cars per day */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" style={{ color: "var(--color-silver-mid)" }}>
                    EV cars expected per day
                  </label>
                  <span
                    className="text-base font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-cyan)" }}
                  >
                    {carsPerDay}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={carsPerDay}
                  onChange={(e) => setCarsPerDay(Number(e.target.value))}
                  className="w-full accent-[var(--color-cyan)]"
                  style={{ accentColor: "var(--color-cyan)" }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "var(--color-silver-lo)" }}>
                  <span>1</span><span>50</span>
                </div>
              </div>

              {/* Units per car */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" style={{ color: "var(--color-silver-mid)" }}>
                    Avg. units (kWh) per session
                  </label>
                  <span
                    className="text-base font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-cyan)" }}
                  >
                    {unitsPerCar} kWh
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={80}
                  value={unitsPerCar}
                  onChange={(e) => setUnitsPerCar(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: "var(--color-cyan)" }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "var(--color-silver-lo)" }}>
                  <span>5 kWh</span><span>80 kWh</span>
                </div>
              </div>

              <p className="text-xs" style={{ color: "var(--color-silver-lo)" }}>
                Payout rate: ₹{ESTIMATOR.hostPayoutPerUnit}/kWh · Session fee: ₹{ESTIMATOR.sessionFee}
              </p>
            </div>

            {/* Result */}
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <div>
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-silver-lo)" }}>
                  Monthly estimate
                </p>
                <p
                  className="text-5xl font-extrabold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-cyan)" }}
                >
                  {fmt(monthlyEarnings)}
                </p>
              </div>

              <div
                className="w-full h-px"
                style={{ background: "var(--color-border)" }}
              />

              <div>
                <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--color-silver-lo)" }}>
                  Annual estimate
                </p>
                <p
                  className="text-3xl font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-silver-hi)" }}
                >
                  {fmt(annualEarnings)}
                </p>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-85"
                style={{ background: "var(--color-cyan)", color: "var(--color-void)" }}
              >
                Claim my spot →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
