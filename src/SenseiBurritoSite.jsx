import { useEffect, useState } from "react";

const globalCss = `
:root {
  --gold: #d4af37;
  --bg: #000;
  --text: #fff;
  --muted: #aaa;
  --line: #222;
  --radius: 12px;
  --font-title: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}

body, .sb-root {
  margin: 0;
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  overflow-x: hidden;
}

.gold { color: var(--gold); }
.strong { font-weight: 700; }

/* ================= HEADER ================= */
.sb-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: all .4s ease, opacity .4s ease;
  background: #000;
}

.sb-header__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
  transition: all .4s ease;
}

.sb-header--scrolled {
  background: #000;
  box-shadow: 0 2px 10px rgba(0,0,0,.5);
  padding: 6px 20px;
  opacity: 0.95;
}

.sb-logo {
  height: 52px;
  transition: transform .4s ease, opacity .3s ease;
  transform-origin: left center;
}

.sb-header--scrolled .sb-logo {
  transform: scale(0.7);
}

/* CTA desktop */
.sb-cta {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* CTA buttons */
.sb-btn {
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: .3s;
  display: inline-block;
  font-size: 15px;
}
.sb-btn--gold { background: var(--gold); color: #000; }
.sb-btn--gold:hover { background: #c19b2e; color: #fff; }
.sb-btn--dark { background: #000; color: #fff; border: 1px solid var(--gold); }
.sb-btn--dark:hover { background: #111; color: var(--gold); }

/* CTA mobile fix */
@media (max-width: 768px) {
  .sb-header__inner {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }
  .sb-logo {
    display: block;
    height: 36px;
    margin-bottom: 4px;
  }
  .sb-header--scrolled .sb-logo {
    display: none;
  }
  .sb-cta {
    display: flex;
    justify-content: center;
    gap: 8px;
    width: 100%;
  }
  .sb-btn {
    padding: 6px 10px;
    font-size: 13px;
  }
  .sb-header {
    padding: 6px 12px;
  }
  .sb-header--scrolled {
    padding: 4px 10px;
  }
}

/* ================= HERO ================= */
.sb-hero {
  position: relative;
  min-height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.sb-hero__video {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 0;
}

.sb-hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.sb-hero__overlay--gradient {
  background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6));
}

.sb-hero__overlay--grid {
  background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}

.sb-hero__content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 16px;
}

.sb-hero__title {
  font-family: var(--font-title);
  font-size: 44px;
  margin: 0 0 16px;
}

.sb-hero__tagline {
  font-size: 18px;
  color: var(--muted);
}

.sb-hero__actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  justify-content: center;
}

.sb-hero__badges {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 20px;
  font-size: 14px;
  color: var(--muted);
}

/* ================= LIGHTBOX MENU ================= */
.sb-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.sb-lightbox img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0,0,0,0.7);
}
.sb-lightbox__close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 28px;
  color: #fff;
  cursor: pointer;
}
`;

export default function SenseiBurritoSite() {
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const video = document.querySelector(".sb-hero__video");
    if (video) {
      video.play().catch(() => {
        console.log("Lecture auto bloquée, fallback à l’image statique.");
      });
    }
  }, []);

  return (
    <div className="sb-root">
      <style>{globalCss}</style>

      {/* HEADER */}
      <header className={`sb-header ${scrolled ? "sb-header--scrolled" : ""}`}>
        <div className="sb-header__inner">
          <a className="sb-brand" href="#top" aria-label="Sensei Burrito">
            <img src="/logo_png.png" alt="Sensei Burrito" className="sb-logo" />
          </a>
          <nav className="sb-cta">
            <a className="sb-btn sb-btn--gold" href="#collect">A Emporter</a>
            <a className="sb-btn sb-btn--dark" href="#delivery">Livraison</a>
            <a className="sb-btn sb-btn--gold" href="#reservation">Sur Place</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="sb-hero">
        <video className="sb-hero__video" autoPlay muted loop playsInline>
          <source src="/enso_rotation.mp4" type="video/mp4" />
        </video>
        <div className="sb-hero__overlay sb-hero__overlay--gradient" />
        <div className="sb-hero__overlay sb-hero__overlay--grid" />
        <div className="sb-hero__content">
          <h1 className="sb-hero__title">
            L'art du <span className="gold">burrito</span>, la voie du <span className="gold">Sensei</span>
          </h1>
          <p className="sb-hero__tagline">
            Une cuisine de caractère, des gestes précis, des saveurs franches. Bienvenue chez Sensei Burrito – l'alliance chic du burrito et de l'esprit dojo.
          </p>
          <div className="sb-hero__actions">
            <button className="sb-btn sb-btn--gold" onClick={() => setShowMenu(true)}>Menu</button>
            <a className="sb-btn sb-btn--dark" href="#delivery">Livraison</a>
          </div>
          <ul className="sb-hero__badges">
            <li>🌮 Tortillas maison</li>
            <li>🥋 Esprit dojo</li>
            <li>🥗 Options végé</li>
          </ul>
        </div>
      </section>

      {/* LIGHTBOX MENU */}
      {showMenu && (
        <div className="sb-lightbox" onClick={() => setShowMenu(false)}>
          <span className="sb-lightbox__close">&times;</span>
          <img src="/menu-sensei_horizon.jpg" alt="Menu Sensei Burrito" />
        </div>
      )}
    </div>
  );
}
