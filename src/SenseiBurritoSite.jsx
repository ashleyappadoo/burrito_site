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
  height: 82px;
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
    height: 82px;
    margin: 0 auto;
    display: block;
    transition: all .4s ease;
  }

  .sb-header--scrolled .sb-logo {
    height: 42px; /* rétrécit légèrement au scroll */
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

/* === Ajustement du HERO pour mobile === */
@media (max-width: 768px) {
  .sb-hero {
    min-height: 100vh; /* prend toute la hauteur de l'écran */
    padding-top: 100px; /* espace sous le header fixe */
    justify-content: flex-start; /* décale vers le haut */
  }

  .sb-hero__content {
    margin-top: 40px; /* légère descente du texte */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  .sb-hero__badges {
    margin-top: 16px;
  }

  .sb-hero__socials {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    transform: scale(0.9); /* icônes légèrement plus petites */
  }

  .sb-hero__socials img {
    width: 42px;
    height: 42px;
  }
}


/* ================= HERO SOCIALS (tailles parfaitement homogènes) ================= */
.sb-hero__socials {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  position: relative;
  z-index: 2;
}

/* Cadre carré commun à toutes les icônes */
.sb-hero__socials a {
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: transparent;
  transition: transform 0.3s ease, filter 0.3s ease;
}

/* Icône interne */
.sb-hero__socials img {
  width: 90%;
  height: 90%;
  object-fit: contain;
  display: block;
  transition: transform 0.3s ease, filter 0.3s ease;
}

/* Ajustement fin par plateforme (harmonisation visuelle) */
.sb-hero__socials a[href*="instagram"] img {
  transform: scale(1.05);
}
.sb-hero__socials a[href*="facebook"] img {
  transform: scale(1.3); /* Facebook était visuellement plus petit */
}
.sb-hero__socials a[href*="google"] img {
  transform: scale(0.92);
}

/* Effet hover doré */
.sb-hero__socials a:hover img {
  transform: scale(1.2);
  filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.7));
}

/* Responsive */
@media (max-width: 900px) {
  .sb-hero__socials a {
    width: 56px;
    height: 56px;
  }
}
@media (max-width: 600px) {
  .sb-hero__socials a {
    width: 46px;
    height: 46px;
  }
  .sb-hero__socials {
    gap: 20px;
  }
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


/* ================= RÉDUCTION ESPACE ENTRE SECTION HISTOIRE ET NOUS CONTACTER ================= */

/* Réduit l’espace avant la section contact */
#contact.sb-section {
  padding-top: 20px;
  margin-top: -40px; /* compact mais harmonieux */
}

/* Réduit aussi l’espace après “Notre Histoire” */
#histoire {
  margin-bottom: 0; /* rapproche les sections */
}


/* ================= SECTION MENU ================= */
.sb-menu {
  background: #000;
  padding: 60px 20px 40px;
  text-align: center;
}

.sb-menu__image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
}

.sb-menu__image {
  max-width: 1000px; /* taille max sur grand écran */
  width: 90%; /* adaptation fluide */
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(212, 175, 55, 0.4); /* léger contour doré */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sb-menu__image:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 30px rgba(212, 175, 55, 0.25);
}

/* Responsive */
@media (max-width: 900px) {
  .sb-menu__image {
    width: 95%;
    max-width: 600px;
  }
}

@media (max-width: 600px) {
  .sb-menu {
    padding: 40px 10px 30px;
  }

  .sb-menu__image {
    width: 100%;
    border-radius: 8px;
  }
}


/* ================= SECTION CONTACT ================= */
#contact.sb-section {
  padding-top: 40px;
  margin-top: -30px;
}

#histoire {
  margin-bottom: 10px;
}

.sb-contact__map iframe {
  width: 100%;
  height: 100%;
  min-height: 420px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.sb-contact__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;
}

.sb-contact__details p {
  margin: 0 0 8px;
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

/* ================= NEWSLETTER BREVO ================= */
.sb-contact__newsletter {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sb-newsletter-iframe {
  width: 100%;
  max-width: 540px;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  height: 480px; /* augmente la hauteur pour voir tout le formulaire */
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  display: block;
}

/* Ajustement dynamique selon la taille d’écran */
@media (max-width: 1024px) {
  .sb-newsletter-iframe {
    height: 520px;
  }
}

@media (max-width: 768px) {
  .sb-newsletter-iframe {
    height: 560px;
  }
}

@media (max-width: 480px) {
  .sb-newsletter-iframe {
    height: 640px;
  }
}



/* Ancien bloc avis (désactivé mais conservé) */
.sb-contact__reviews {
  display: none;
}

/* Responsive mobile */
@media (max-width: 900px) {
  .sb-contact .sb-container {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  #contact.sb-section {
    margin-top: -10px;
  }

  .sb-contact__map iframe {
    min-height: 380px;
  }
}


/* ================= FOOTER ================= */
.sb-footer { background:#000; padding:40px 20px; text-align:center; border-top:1px solid var(--line); }
.sb-footer__inner { max-width:1200px; margin:0 auto; display:flex; flex-direction:column; gap:12px; align-items:center; }
.sb-footer__brand img { height:82px; margin-bottom:12px; }
.sb-footer__social a { margin:0 8px; color:var(--muted); text-decoration:none; }
.sb-footer__social a:hover { color:var(--gold); }

/* ✅ Ajustement du footer pour mobile */
@media (max-width: 768px) {
  .sb-footer__social {
    display: flex;
    flex-direction: column; /* empile les liens */
    gap: 8px; /* espace vertical */
    align-items: center;
    text-align: center;
    width: 100%;
  }

  .sb-footer__social a {
    display: inline-block;
    font-size: 14px;
    line-height: 1.4;
    word-break: break-word; /* évite que le texte dépasse */
  }

  .sb-footer__inner p {
    font-size: 14px;
    margin-bottom: 8px;
  }
}


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

/* ✅ Empêche le CTA mobile de masquer le footer */
@media (max-width: 768px) {
  .sb-footer {
    padding-bottom: 100px; /* crée un espace sous le footer */
  }
}


/* ================= POPUP PDF ================= */
.sb-pdf-popup {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  padding: 20px;
  backdrop-filter: blur(6px);
}

.sb-pdf-popup__content {
  position: relative;
  background: #111;
  border-radius: 12px;
  box-shadow: 0 0 25px rgba(212,175,55,0.2);
  max-width: 90vw;
  max-height: 90vh;
  width: 800px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sb-pdf-popup__iframe {
  width: 100%;
  height: 90vh;
  border: none;
  border-radius: 12px;
}

.sb-pdf-popup__close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--gold);
  color: #000;
  border: none;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.3s ease;
}

.sb-pdf-popup__close:hover {
  transform: scale(1.1);
  background: #c19b2e;
}

/* ✅ Responsive : plein écran sur mobile */
@media (max-width: 768px) {
  .sb-pdf-popup__content {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  .sb-pdf-popup__iframe {
    height: 100vh;
  }
}


/* --- Ajustement hero en mobiel --- */
@media (max-width: 768px) {
  /* Décale le hero vers le bas pour ne pas être masqué par le header fixe */
  .sb-hero {
    padding-top: 80px; /* ajuste selon la taille du header mobile */
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
  const [popup, setPopup] = useState(null);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*Ancien use effet*/
  /*useEffect(() => {
    const video = document.querySelector(".sb-hero__video");
    if (video) {
      video.play().catch(() => {
        console.log("Lecture auto bloquée, fallback image.");
      });
    }
  }, []);*/

  /*Nouveau useEffect*/
  useEffect(() => {
  const video = document.querySelector(".sb-hero__video");
  if (video) {
    const playVideo = () => {
      video.play().catch(() => {});
    };

    // essaie plusieurs méthodes
    video.addEventListener("loadeddata", playVideo);
    document.addEventListener("touchstart", playVideo, { once: true });
    document.addEventListener("scroll", playVideo, { once: true });

    return () => {
      video.removeEventListener("loadeddata", playVideo);
      document.removeEventListener("touchstart", playVideo);
      document.removeEventListener("scroll", playVideo);
    };
  }
}, []);
/*-----------fin nouveau useEffect----------------*/

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
            <a className="sb-btn sb-btn--gold" href="#collect">Click & Collect</a>
            <a className="sb-btn sb-btn--dark" href="#delivery">Livraison</a>
            {/* Y Aller */}
            <a
              className="sb-btn sb-btn--gold"
              href="https://www.google.com/maps/dir//Sensei+Burrito,+48+Rue+Tiquetonne,+75002+Paris/@46.8162918,-1.7434237,7z/data=!4m9!4m8!1m0!1m5!1m1!1s0x47e66fcf0feb78ed:0xf51de355cfc4088d!2m2!1d2.3470693!2d48.8648139!3e3?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank"
              rel="noopener noreferrer"
            >
              Y Aller
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="sb-hero">
        <video className="sb-hero__video" autoPlay muted loop playsInline webkit-playsinline="true"
  preload="auto">
          <source src="/enso_rotation.mp4" type="video/mp4" />
        </video>
        <div className="sb-hero__overlay sb-hero__overlay--gradient" />
        {/*<div className="sb-hero__overlay sb-hero__overlay--grid" />  --------- grid sur video */}
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
            <li>🌮 Tacos gluten free</li>
            <li>🌯 Burrito maison</li>
            <li>🥋 Esprit dojo</li>
            <li>🥗 Options végé</li>
          </ul>
          {/* Réseaux sociaux */}
          <div className="sb-hero__socials">
            <a
              href="https://www.instagram.com/senseiburrito?igsh=MTZ3ZWlnMHQ1eTFvNA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src="/instagram.png" alt="Instagram" />
            </a>
            <a
              href="https://www.facebook.com/share/1YpYromwyt/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img src="/facebook.png" alt="Facebook" />
            </a>
            <a
              href="https://www.google.com/search?sa=X&sca_esv=5f8ad457132af750&tbm=lcl&sxsrf=AE3TifNEnPkPbt5_XdU9Gg_FtXAP6SCzZQ:1761578034177&q=Sensei+Burrito+Reviews&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDczMzI1MjYyNzQ2NDExsDQzNN7AyPiKUSw4Na84NVPBqbSoKLMkXyEotSwztbx4ESsOCQAYif5nTQAAAA&rldimm=17662523271314409613&hl=en-FR&ved=2ahUKEwj1q-LH1cSQAxWBQEEAHZ2tBkcQ9fQKegQITRAF&biw=1920&bih=945&dpr=1#lkt=LocalPoiReviews"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Avis Google"
            >
              <img src="/avis_google.png" alt="Avis Google" />
            </a>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MENU */}
      {menuOpen && (
        <div className="sb-lightbox" onClick={() => setMenuOpen(false)}>
          <img src="/menu-sensei.jpg" alt="Menu Sensei Burrito" />
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

      {/* LE MENU */}
      <section id="menu" className="sb-section sb-menu">
        <h2 className="sb-h2">Le Menu</h2>
        <div className="sb-menu__image-wrapper">
          <img
            src="/menu-sensei.jpg"
            alt="Menu Sensei Burrito"
            className="sb-menu__image"
            loading="lazy"
          />
        </div>
      </section>

      {/* NOUS CONTACTER */}
      <section id="contact" className="sb-section sb-contact">
        <h2 className="sb-h2">Nous Contacter</h2>
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
      
          {/* Coordonnées & Newsletter */}
          <div className="sb-contact__info">
            {/* Coordonnées */}
            <div className="sb-contact__details">
              <p>
                  <span className="gold">Contactez-nous par email</span>
              </p>
              <p>
                <span className="gold">✉️</span>{" "}
                <a href="mailto:contact@senseiburrito.fr" className="sb-contact__link">
                  contact@senseiburrito.fr
                </a>
              </p>
            </div>
      
            {/* === NEWSLETTER BREVO === */}
            <div className="sb-contact__newsletter">
              <div className="sib-form" style={{ textAlign: "center", backgroundColor: "transparent" }}>
                <iframe
                  title="Sensei Letter"
                  src="https://f8bf683e.sibforms.com/serve/MUIFAPlmjYo9sI-uV4VY8ExdOAlrIJD9fRuMIfw31_oNc_BUSKSNn8SWlkyTtHT408z-p216BDHEXzihYJGZZaiL52wMmJ5uoJSLKZLFY04p_QogjAoQUgzA7toxQw3CcnYdS5dJF2RXLLtWg9b1igqcZY_eU-ga1OHJZKBxyRJOpCRRYftVGd5lRqiUXgXllzO8MHrvQyhiN7vK"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                  className="sb-newsletter-iframe"
                ></iframe>
              </div>
            </div>
      
            {/* === Ancienne section Avis Google (désactivée) === */}
            {/*
            <div className="sb-contact__reviews">
              <h3>Avis Google</h3>
              <div className="sb-review">⭐⭐⭐⭐⭐ "Excellent burrito, ambiance zen et service rapide !"</div>
              <div className="sb-review">⭐⭐⭐⭐⭐ "Un concept original et des saveurs maîtrisées, je recommande !"</div>
              <div className="sb-review">⭐⭐⭐⭐ "Lieu très sympa, belle présentation et plats copieux."</div>
            </div>
            */}
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
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPopup("/Politique_Confidentialite_SenseiBurrito.pdf");
              }}
            >
              Politique de Confidentialité
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPopup("/Mentions_Legales_SenseiBurrito.pdf");
              }}
            >
              Mentions Légales
            </a>
          </nav>
        </div>
      </footer>


      {/* CTA BAS DE PAGE MOBILE */}
      <div className="sb-bottom-cta">
        <a className="sb-btn sb-btn--gold" href="#collect">A Emporter</a>
        <a className="sb-btn sb-btn--dark" href="#delivery">Livraison</a>
        <a className="sb-btn sb-btn--gold" href="#reservation">Sur Place</a>
      </div>

      {/* === POPUP PDF === */}
      {popup && (
        <div className="sb-pdf-popup" onClick={() => setPopup(null)}>
          <div className="sb-pdf-popup__content" onClick={(e) => e.stopPropagation()}>
            <button className="sb-pdf-popup__close" onClick={() => setPopup(null)}>✕</button>
            <iframe
              src={popup}
              title="Document PDF"
              className="sb-pdf-popup__iframe"
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
}
