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
  margin:0;
  font-family:var(--font-body);
  background:var(--bg);
  color:var(--text);
  line-height:1.6;
}

.gold { color: var(--gold); }
.strong { font-weight:700; }

/* Header */
.sb-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: all .4s ease;
}

.sb-header__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px; /* identique avant et après scroll */
}

.sb-header--scrolled {
  background: #000;
  box-shadow: 0 2px 10px rgba(0,0,0,.6);
  padding: 10px 24px; /* shrink */
}

.sb-logo {
  height: 64px; /* taille de base */
  transition: transform .4s ease, opacity .3s ease;
  transform-origin: left center; /* ancrage à gauche pour éviter le décalage */
}

.sb-header--scrolled .sb-logo {
  transform: scale(0.65); /* dézoom fluide */
}

.sb-cta {
  display: flex;
  gap: 16px; /* espacement uniforme entre boutons */
}

.is-hidden {
  opacity: 0;
}

/* Buttons */
.sb-btn{padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;transition:.3s;display:inline-block}
.sb-btn--gold{background:var(--gold);color:#000;}
.sb-btn--gold:hover{background:#c19b2e;color:#fff;}
.sb-btn--dark{background:#000;color:#fff;border:1px solid var(--gold)}
.sb-btn--dark:hover{background:#111;color:var(--gold)}

/* Hero */
.sb-hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.sb-hero__video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0; /* la vidéo est en fond */
}

.sb-hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 1; /* overlays au-dessus de la vidéo */
}

.sb-hero__overlay--gradient {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
}

.sb-hero__overlay--grid {
  background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}

.sb-hero__content {
  position: relative;
  z-index: 2; /* texte toujours au-dessus */
  max-width: 800px;
  padding: 0 16px;
}

.sb-hero__title {
  font-family: var(--font-title);
  font-size: 48px;
  margin: 0 0 16px;
}

.sb-hero__tagline {
  font-size: 18px;
  color: var(--muted);
}

.sb-hero__actions {
  margin-top: 20px;
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

/* Section */
.sb-section{padding:80px 20px;}
.sb-h2{font-family:var(--font-title);font-size:36px;margin-bottom:12px;text-align:center}
.sb-lead{text-align:center;color:var(--muted);max-width:700px;margin:0 auto 40px}

/* Concept cards */
.sb-grid-img{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:32px}
@media(max-width:900px){.sb-grid-img{grid-template-columns:1fr}}
.sb-card-img{background:#0d0d0d;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;box-shadow:0 8px 16px rgba(0,0,0,.18);transition:transform .25s ease, box-shadow .25s ease}
.sb-card-img:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(0,0,0,.35)}
.sb-card-img img{width:100%;height:220px;object-fit:cover}
.sb-card-img__body{padding:18px}
.sb-card-img__body h3{margin:0 0 8px;font-size:18px;font-weight:700}
.sb-card-img__body p{margin:0;color:var(--muted);font-size:15px;line-height:1.4}

/* Split layout (Histoire) */
.sb-split{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;max-width:1200px;margin:0 auto}
@media(max-width:900px){.sb-split{grid-template-columns:1fr}}

/* Footer */
.sb-footer{background:#000;padding:40px 20px;text-align:center;border-top:1px solid var(--line)}
.sb-footer__inner{max-width:1200px;margin:0 auto;display:flex;flex-direction:column;gap:12px;align-items:center}
.sb-footer__brand img{height:30px;margin-bottom:12px}
.sb-footer__social a{margin:0 8px;color:var(--muted);text-decoration:none}
.sb-footer__social a:hover{color:var(--gold)}
`;

export default function SenseiBurritoSite() {
  const [scrolled, setScrolled] = useState(false);

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
            <img
              src="/logo_png.png"
              alt="Sensei Burrito"
              className={`sb-logo sb-logo--light ${scrolled ? "is-hidden" : ""}`}
            />
            <img
              src="/logo-noir.png"
              alt="Sensei Burrito"
              className={`sb-logo sb-logo--dark ${scrolled ? "" : "is-hidden"}`}
            />
          </a>
          <nav className="sb-cta">
            <a className="sb-btn sb-btn--gold" href="#collect">Click & Collect</a>
            <a className="sb-btn sb-btn--dark" href="#delivery">Livraison</a>
            <a className="sb-btn sb-btn--gold" href="#reservation">Réservation</a>
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
            <a className="sb-btn sb-btn--gold" href="#delivery">Commander sur Uber Eats</a>
          </div>
          <ul className="sb-hero__badges">
            <li>🌮 Tortillas maison</li>
            <li>🥋 Esprit dojo</li>
            <li>🥗 Options végé</li>
          </ul>
        </div>
      </section>

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
