import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPortfolio } from "../api.js";
import "./Portfolio.css";

const filters = ["All", "Design", "Residential", "Commercial"];

// Shown if the API/database isn't reachable yet (e.g. first local run
// before `npm run seed`), so the page never looks broken.
const fallbackItems = [
  {
    _id: "f1",
    title: "Quiet Living, Ashoka Nagar",
    category: "Design",
    imageUrl:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "f2",
    title: "The Fireplace Wing",
    category: "Residential",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "f3",
    title: "Jubilee Hills Residence",
    category: "Residential",
    imageUrl:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "f4",
    title: "Banjara Hills Penthouse",
    category: "Design",
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "f5",
    title: "Atrium Co-working Studio",
    category: "Commercial",
    imageUrl:
      "https://images.unsplash.com/photo-1600508773949-53372e9d0a44?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "f6",
    title: "The Amber Boutique",
    category: "Commercial",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Portfolio() {
  const [items, setItems] = useState(fallbackItems);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchPortfolio()
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length) {
          setItems(data);
        }
      })
      .catch(() => {
        // keep fallback items
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleItems = useMemo(() => {
    if (activeFilter === "All") return items;
    return items.filter((item) => item.category === activeFilter);
  }, [items, activeFilter]);

  return (
    <section className="portfolio">
      <div className="container">
        <div className="portfolio__header">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Portfolio
            </span>
            <h1 className="portfolio__title">
              Curated works,
              <br />
              <em>crafted with care.</em>
            </h1>
          </div>

          <div className="portfolio__filters" role="tablist" aria-label="Filter portfolio by category">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={activeFilter === f}
                className={`filter-btn ${activeFilter === f ? "filter-btn--active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="portfolio__status">Loading projects…</p>}

        {!loading && visibleItems.length === 0 && (
          <p className="portfolio__status">No projects in this category yet.</p>
        )}

        <div className="portfolio__grid">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, i) => (
              <motion.figure
                className="portfolio-card"
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
                }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              >
                <img src={item.imageUrl} alt={item.title} loading="lazy" />
                <figcaption>
                  <span className="portfolio-card__title">{item.title}</span>
                  {item.category && (
                    <span className="portfolio-card__category">{item.category}</span>
                  )}
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
