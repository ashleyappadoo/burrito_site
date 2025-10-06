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
  background: #000; /* noir opaque */
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

/* ================= MOBILE HEADER + BOTTOM CTA ================= */
@media (max-width: 768px) {

  /* HEADER mobile uniquement */
  .sb-header {
    padding: 10px 0;
    text-align: center;
  }

  .sb-header--scrolled {
    padding: 6px 0;
  }

  .sb-header__inner {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }

  .sb-logo {
    height: 42px;
    margin: 0 auto;
    display: block;
    transition: all .4s ease;
  }

  .sb-header--scrolled .sb-logo {
    height: 32px; /* rétrécit légèrement au scroll */
    transform: none; /* supprime le décalage */
  }

  /* Masquer les CTA du header */
  .sb-header .sb-cta {
    display: none;
  }

  /* CTA fixes en bas d’écran */
  .sb-bottom-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0,0,0,0.85);
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px 0;
    z-index: 999;
    backdrop-filter: blur(4px);
  }

  .sb-bottom-cta .sb-btn {
    padding: 8px 14px;
    font-size: 14px;
    border-radius: 8px;
  }
}



/* ================= HERO ================= */
.sb-hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
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
  justify-content: center;
  gap: 12px;
}

/* ================= HERO BADGES ================= */
.sb-hero__badges {
  list-style: none;
  padding: 0;
  margin-top: 20px;
  display: flex;
  flex-direction: row;  /* forcer en ligne */
  justify-content: center;
  align-items: center;
  gap: 24px; /* espacement entre les éléments */
  font-size: 14px;
  color: var(--muted);
}


/* ================= SECTIONS ================= */
.sb-section {
  padding: 60px 20px; /* espace réduit en haut et en bas */
}

.sb-section + .sb-section {
  margin-top: -30px; /* réduit l'espace entre deux sections successives */
}
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
.sb-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 0; /* équilibre l'espacement interne */
}

.sb-split__media video {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  aspect-ratio: 16 / 9; /* garantit un cadrage harmonieux */
  display: block;
}
@media(max-width:900px){.sb-split{grid-template-columns:1fr}}


/* ================= REDUCTION ESPACE ENTRE SECTION HISTOIRE ET NOUS CONTACTER ================= */
/* Réduit l’espace avant la section contact */
#contact.sb-section {
  padding-top: 40px;
  margin-top: -20px;
}

/* Réduit aussi l’espace entre “Notre Histoire” et “Nous Contacter” */
#histoire {
  margin-bottom: 20px;
}


/* ================= CONTACT ================= */
.sb-contact__map iframe {
  width: 100%;
  height: 100%;
  min-height: 420px; /* s’aligne mieux sur les avis */
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
}

.sb-contact__info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sb-contact__details p {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.sb-contact__link {
  color: var(--text);
  text-decoration: none;
}

.sb-contact__link:hover {
  color: var(--gold);
}

.sb-contact__reviews {
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 20px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 6px 12px rgba(0,0,0,0.3);
}

.sb-contact__reviews h3 {
  color: var(--gold);
  margin-top: 0;
  font-family: var(--font-title);
}

.sb-review {
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 10px;
}

@media (max-width: 900px) {
  .sb-contact .sb-container {
    grid-template-columns: 1fr;
  }
}


/* ================= FOOTER ================= */
.sb-footer { background:#000; padding:40px 20px; text-align:center; border-top:1px solid var(--line); }
.sb-footer__inner { max-width:1200px; margin:0 auto; display:flex; flex-direction:column; gap:12px; align-items:center; }
.sb-footer__brand img { height:30px; margin-bottom:12px; }
.sb-footer__social a { margin:0 8px; color:var(--muted); text-decoration:none; }
.sb-footer__social a:hover { color:var(--gold); }

/* Masquer le bloc CTA bas de page par défaut (desktop) */
.sb-bottom-cta {
  display: none;
}

/* Afficher uniquement sur mobile */
@media (max-width: 768px) {
  .sb-bottom-cta {
    display: flex;
  }
}

/* ================= LIGHTBOX ================= */
.sb-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  overflow-y: auto; /* permet de scroller si image trop grande */
}
.sb-lightbox img {
  max-width: 95%;
  max-height: 90%;
  border-radius: 12px;
}
.sb-lightbox__close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: var(--gold);
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
`;

export default function SenseiBurritoSite() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const video = document.querySelector(".sb-hero__video");
    if (video) {
      video.play().catch(() => {
        console.log("Lecture auto bloquée, fallback image.");
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
            <button className="sb-btn sb-btn--gold" onClick={() => setMenuOpen(true)}>Menu</button>
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
      {menuOpen && (
        <div className="sb-lightbox" onClick={() => setMenuOpen(false)}>
          <img src="/menu-sensei_horizon.jpg" alt="Menu Sensei Burrito" />
          <button className="sb-lightbox__close" onClick={() => setMenuOpen(false)}>✕</button>
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

      {/* NOUS CONTACTER */}
      <section id="contact" className="sb-section sb-contact">
        {/* ✅ Titre centré et unique */}
        <h2 className="sb-h2" style={{ textAlign: "center", marginBottom: "40px" }}>
          Nous Contacter
        </h2>
      
        <div className="sb-container sb-split">
          {/* Google Maps */}
          <div className="sb-contact__map">
            <iframe
              title="Localisation Sensei Burrito"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.8510386015645!2d2.346145!3d48.865102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e19f6ed54bb%3A0x2d432e492b98c2c!2sRue%20Tiquetonne%2C%2075002%20Paris!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
              width="100%"
              height="420"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
      
          {/* Coordonnées + Avis Google */}
          <div className="sb-contact__info">
            {/* Coordonnées */}
            <div className="sb-contact__details">
              <p>
                <span className="gold">📞</span> 01 42 36 XX XX
              </p>
              <p>
                <span className="gold">✉️</span>{" "}
                <a
                  href="mailto:contact@senseiburrito.fr"
                  className="sb-contact__link"
                >
                  contact@senseiburrito.fr
                </a>
              </p>
            </div>
      
            {/* Avis Google */}
            <div className="sb-contact__reviews">
              <h3>Avis Google</h3>
              <div className="sb-review">
                ⭐⭐⭐⭐⭐ "Excellent burrito, ambiance zen et service rapide !"
              </div>
              <div className="sb-review">
                ⭐⭐⭐⭐⭐ "Un concept original et des saveurs maîtrisées, je recommande !"
              </div>
              <div className="sb-review">
                ⭐⭐⭐⭐ "Lieu très sympa, belle présentation et plats copieux."
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer className="sb-footer">
        <div className="sb-container sb-footer__inner">
          <div className="sb-footer__brand">
            <img src="/logo_png.png" alt="Sensei Burrito" />
          </div>
          <p>© {new Date().getFullYear()} Sensei Burrito — Tous droits réservés.</p>
          <nav className="sb-footer__social">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="TikTok">TikTok</a>
            <a href="#" aria-label="Facebook">Facebook</a>
          </nav>
        </div>
      </footer>

      {/* CTA BAS DE PAGE MOBILE */}
      <div className="sb-bottom-cta">
        <a className="sb-btn sb-btn--gold" href="#collect">A Emporter</a>
        <a className="sb-btn sb-btn--dark" href="#delivery">Livraison</a>
        <a className="sb-btn sb-btn--gold" href="#reservation">Sur Place</a>
      </div>
    </div>
  );
}
