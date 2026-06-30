"use client";

import { motion } from "framer-motion";
import { TEAM, BRAND } from "@/lib/constants";

export default function TeamSection() {
  return (
    <section id="team" className="py-24 px-6" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p
            className="type-eyebrow mb-5"
            style={{ color: "var(--color-cyan)" }}
          >
            The Team
          </p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-silver-hi)" }}
          >
            Who&apos;s building {BRAND.name}.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-6 border flex flex-col gap-3"
              style={{
                background: "var(--color-card)",
                borderColor: "var(--color-border)",
              }}
            >
              {/* Avatar placeholder */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
                style={{
                  background: "var(--color-depth)",
                  border: "2px solid var(--color-border)",
                  color: "var(--color-cyan)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {member.name[1] ?? "?"}
              </div>

              <div>
                <p className="font-semibold text-base" style={{ color: "var(--color-silver-hi)" }}>
                  {member.name}
                </p>
                <p className="text-sm" style={{ color: "var(--color-cyan)" }}>
                  {member.role}
                </p>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "var(--color-silver-mid)" }}>
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
