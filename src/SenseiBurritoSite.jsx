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
.sb-header--scrolled .sb-logo { transform: scale(0.7); }

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
  .sb-logo { display: block; height: 36px; margin-bottom: 4px; }
  .sb-header--scrolled .sb-logo { display: none; }
  .sb-cta { justify-content: center; gap: 8px; width: 100%; }
  .sb-btn { padding: 6px 10px; font-size: 13px; }
  .sb-header { padding: 6px 12px; }
  .sb-header--scrolled { padding: 4px 10px; }
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

/* Supprimer bouton play iOS */
.sb-hero__video::-webkit-media-controls { display: none !important; }
.sb-hero__video::-webkit-media-controls-enclosure { display: none !important; }

.sb-hero__overlay { position: absolute; inset: 0; z-index: 1; }
.sb-hero__overlay--gradient { background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6)); }
.sb-hero__overlay--grid {
  background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}

.sb-hero__content { position: relative; z-index: 2; max-width: 800px; padding: 0 16px; }
.sb-hero__title { font-family: var(--font-title); font-size: 44px; margin: 0 0 16px; }
.sb-hero__tagline { font-size: 18px; color: var(--muted); }
.sb-hero__actions { margin-top: 20px; }
.sb-hero__badges {
  list-style: none; padding: 0; display: flex; gap: 16px;
  justify-content: center; margin-top: 20px; font-size: 14px; color: var(--muted);
}

/* ================= MODAL (Menu PDF) ================= */
.sb-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease-in-out;
}
.sb-modal__content {
  position: relative;
  width: 90%;
  max-width: 800px;
  height: 90%;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  animation: slideUp 0.3s ease-in-out;
}
.sb-modal__close {
  position: absolute;
  top: 10px; right: 10px;
  background: #000; color: #fff;
  border: none; border-radius: 50%;
  width: 32px; height: 32px;
  font-size: 18px; cursor: pointer;
}
.sb-modal__close:hover { background: var(--gold); color: #000; }

/* Version mobile : plein écran */
@media (max-width: 768px) {
  .sb-modal__content {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
}

/* Animations */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

/* ================= SECTIONS ================= */
.sb-section { padding: 100px 20px 80px; }
.sb-h2 { font-family: var(--font-title); font-size: 32px; margin-bottom: 12px; text-align: center; }
.sb-lead { text-align: center; color: var(--muted); max-width: 700px; margin: 0 auto 40px; }

/* ================= CARDS ================= */
.sb-grid-img { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 24px; margin-top: 32px; }
@media(max-width:900px){.sb-grid-img{grid-template-columns:1fr}}
.sb-card-img { background:#0d0d0d; border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; display:flex; flex-direction:column; box-shadow:0 8px 16px rgba(0,0,0,.18); transition:transform .25s ease, box-shadow .25s ease; }
.sb-card-img:hover { transform:translateY(-4px); box-shadow:0 18px 40px rgba(0,0,0,.35); }
.sb-card-img img { width:100%; height:220px; object-fit:cover; }
.sb-card-img__body { padding:18px; }
.sb-card-img__body h3 { margin:0 0 8px; font-size:18px; font-weight:700; }
.sb-card-img__body p { margin:0; color:var(--muted); font-size:15px; line-height:1.4; }

/* ================= SPLIT ================= */
.sb-split { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; max-width:1200px; margin:0 auto; }
@media(max-width:900px){.sb-split{grid-template-columns:1fr}}

/* ================= FOOTER ================= */
.sb-footer { background:#000; padding:40px 20px; text-align:center; border-top:1px solid var(--line); }
.sb-footer__inner { max-width:1200px; margin:0 auto; display:flex; flex-direction:column; gap:12px; align-items:center; }
.sb-footer__brand img { height:30px; margin-bottom:12px; }
.sb-footer__social a { margin:0 8px; color:var(--muted); text-decoration:none; }
.sb-footer__social a:hover { color:var(--gold); }
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
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {
        console.log("Lecture auto bloquée, attente interaction utilisateur.");
      });
    };

    tryPlay();
    document.addEventListener("touchstart", tryPlay, { once: true });
    document.addEventListener("scroll", tryPlay, { once: true });

    return () => {
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("scroll", tryPlay);
    };
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
        <video 
          className="sb-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          webkit-playsinline="true"
          x5-playsinline="true"
        >
          <source src="/DOP_enso_rotation.mp4" type="video/mp4" />
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
          <div className="sb-hero__actions" style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
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

      {/* MODAL PDF */}
      {showMenu && (
        <div className="sb-modal" onClick={() => setShowMenu(false)}>
          <div className="sb-modal__content" onClick={e => e.stopPropagation()}>
            <button className="sb-modal__close" onClick={() => setShowMenu(false)}>✕</button>
            <iframe
              src="/menu-sensei.pdf"
              title="Menu Sensei Burrito"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}

      {/* CONCEPT */}
      <section id="concept" className="sb-section">
        <div className="sb-container">
          <h2 className="sb-h2">Le Concept</h2>
          <p className="sb-lead">Chic, épuré, précis. Le burrito élevé au rang d'art martial culinaire.</p>
          <div className="sb-grid-img">
            <article className="sb-card-img">
              <img src="/concept1.jpg" alt="Cuisine de précision" />
              <div className="sb-card-img__body">
                <h3>Cuisine de Précision</h3>
                <p>Préparations minute, gestes maîtrisés, sourcing exigeant. Une exigence inspirée du dojo.</p>
              </div>
            </article>
            <article className="sb-card-img">
              <img src="/concept2.jpg" alt="Burritos Signature" />
              <div className="sb-card-img__body">
                <h3>Burritos Signature</h3>
                <p>Des recettes originales, un équilibre net entre textures et épices. Options veggie, poulet karaage, bœuf mariné.</p>
              </div>
            </article>
            <article className="sb-card-img">
              <img src="/concept3.jpg" alt="Ambiance Dojo" />
              <div className="sb-card-img__body">
                <h3>Ambiance Dojo</h3>
                <p>Bois sombre, lueur chaude, accents dorés. Une salle raffinée pour un moment concentré.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* HISTOIRE */}
      <section id="histoire" className="sb-section sb-section--alt">
        <div className="sb-container sb-split">
          <div className="sb-split__media">
            <video autoPlay muted loop playsInline style={{ width: "100%", borderRadius: "12px" }}>
              <source src="/enso_rotation_1.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la vidéo.
            </video>
          </div>
          <div className="sb-split__text">
            <h2 className="sb-h2">Notre Histoire</h2>
            <p>
              Niché dans le ventre de Paris, entre Les Halles de Châtelet et la rue animée de Montorgueuil, <strong>Sensei Burrito</strong> est plus qu'un simple restaurant : c'est un lieu de vie, un espace de convivialité et de partage.
            </p>
            <p>
              Installés dans la rue Tiquetonne, au cœur d'un quartier historique et commerçant, nous perpétuons une <span className="gold strong">tradition familiale ancrée ici depuis plus de 40 ans</span>. Un quartier où l'on connaît ses voisins, où les clients deviennent des habitués.
            </p>
            <p>
              Notre marque s'inspire de l'<strong>Enzo (円相)</strong>, le cercle japonais tracé d'un seul geste, symbole d'unité et d'harmonie. Il est au cœur de notre identité : chaque burrito est unique, artisanal, jamais identique, mais toujours façonné avec respect et équilibre.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="sb-footer">
        <div className="sb-container sb-footer__inner">
          <div className="sb-footer__brand">
            <img src="/logo-noir.png" alt="Sensei Burrito" />
          </div>
          <p>© {new Date().getFullYear()} Sensei Burrito — Tous droits réservés.</p>
          <nav className="sb-footer__social">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="TikTok">TikTok</a>
            <a href="#" aria-label="Facebook">Facebook</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
