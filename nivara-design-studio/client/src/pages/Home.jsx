import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../components/Logo.jsx";
import "./Home.css";

const container = {
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  return (
    <section className="hero">
      <div className="hero__blob" aria-hidden="true" />
      <motion.div
        className="container hero__inner"
        variants={container}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={item}>
          <Logo variant="full" size="lg" />
        </motion.div>

        <motion.span variants={item} className="eyebrow eyebrow--center hero__eyebrow">
          <span className="eyebrow-line" />
          Spaces That Inspire
          <span className="eyebrow-line" />
        </motion.span>

        <motion.h1 variants={item} className="hero__title">
          Where beauty
          <br />
          <em>meets</em> intention.
        </motion.h1>

        <motion.p variants={item} className="hero__subtitle">
          Thoughtful interiors crafted around the way you live — elegant,
          purposeful, and distinctly yours.
        </motion.p>

        <motion.div variants={item} className="hero__actions">
          <Link to="/portfolio" className="btn btn-primary">
            View Portfolio
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Get In Touch
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
