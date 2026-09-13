import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const services = [
  {
    title: "Residential Design",
    text: "Complete home transformations tailored to your lifestyle.",
  },
  {
    title: "Commercial Spaces",
    text: "Offices, boutiques, and hospitality spaces with purpose.",
  },
  {
    title: "Space Planning",
    text: "Intelligent layouts that maximise flow and function.",
  },
  {
    title: "Material Curation",
    text: "Bespoke palette of textures, finishes, and furnishings.",
  },
];

const stats = [
  { value: "8+", label: "Years of Practice" },
  { value: "120+", label: "Projects Delivered" },
  { value: "15+", label: "Cities Served" },
];

export default function About() {
  return (
    <section className="about">
      <div className="about__grid">
        <motion.div
          className="about__text"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="about__title">
            Designing spaces
            <br />
            <em>you will love</em>
            <br />
            coming home to.
          </h1>

          <p className="about__para">
            Nivara Design Studio was founded on a single belief — that great
            design is not a luxury, it is a language. Every room tells a
            story, and we are here to help you tell yours with intention,
            elegance, and craft.
          </p>

          <p className="about__para">
            Led by Principal Designer <strong>Harshavardhan</strong>, our
            studio blends classical sensibility with contemporary restraint.
            We listen deeply, curate carefully, and deliver spaces that feel
            both aspirational and profoundly livable.
          </p>

          <div className="about__stats">
            {stats.map((s) => (
              <div className="about__stat" key={s.label}>
                <span className="about__stat-value">{s.value}</span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about__side"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            className="about__image"
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
            alt="A warm, textured living room designed by Nivara Design Studio"
          />

          <div className="about__services">
            {services.map((s, i) => (
              <motion.div
                className="service-card"
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
