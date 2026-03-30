"use client";
import { Gift, NotepadText, Play, SquareParking } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { handleContactForm } from "../lib/actions";

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { name: "Accueil", href: "#" },
    { name: "Visite 3D", href: "#visite-3d" },
    { name: "À Propos", href: "#a-propos" },
    { name: "Galerie", href: "#galerie" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-auto py-2">
        {/* Liens à gauche */}
        <nav className="hidden md:flex gap-6 text-xs uppercase tracking-widest text-gray-600 font-medium">
          {navLinks.slice(0, 3).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-sage transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
        {/* Logo */}
        <a href="#" className="flex flex-col items-center leading-none">
          <img src="/logoh.png" alt="Logo" className="h-20" />
        </a>
        {/* Liens à droite */}
        <nav className="hidden md:flex gap-6 text-xs uppercase tracking-widest text-gray-600 font-medium items-center">
          {navLinks.slice(3).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-sage transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
        {/* Toggle Mobile */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-4 pb-4 flex flex-col gap-3 text-sm text-gray-600">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="hover:text-sage py-1 uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── HERO SLIDER ──────────────────────────────────────────────────────────────
const heroSlides = [
  {
    img: "/optimized/9.webp",
    tag: "Pour des moments inoubliables",
    title: "Al Woud\nSalle de Fêtes",
    sub: "Votre espace privilégié pour mariages, anniversaires et soirées à Salé.",
  },
  {
    img: "/optimized/15.webp",
    tag: "Élégance et Prestige",
    title: "Mariages de\nRêve",
    sub: "Un cadre enchanteur pour célébrer le plus beau jour de votre vie.",
  },
  {
    img: "/optimized/14.webp",
    tag: "Service Sur Mesure",
    title: "Événements\nExclusifs",
    sub: "Une équipe dédiée pour organiser vos soirées privées et professionnelles.",
  },
  {
    img: "/optimized/13.webp",
    tag: "Votre Satisfaction",
    title: "Moments\nMagiques",
    sub: "Chaque détail est pensé pour créer des souvenirs impérissables.",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (idx: any) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(idx);
      setTimeout(() => setAnimating(false), 700);
    },
    [animating],
  );

  const prev = () =>
    goTo((current - 1 + heroSlides.length) % heroSlides.length);
  const next = useCallback(
    () => goTo((current + 1) % heroSlides.length),
    [current, goTo],
  );

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <section
      id="accueil"
      className="relative min-h-[92vh] max-h-[92vh] flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Slides */}
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        >
          <img src={s.img} alt={s.tag} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
        </div>
      ))}

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center px-4 py-24 gap-4">
        <p
          key={`tag-${current}`}
          className="text-xs uppercase tracking-[0.35em] text-white/80 font-semibold"
          style={{ animation: "fadeUp 0.7s ease both" }}
        >
          {slide.tag}
        </p>
        <h1
          key={`title-${current}`}
          className="font-serif text-5xl md:text-7xl text-white leading-tight"
          style={{ animation: "fadeUp 0.7s 0.1s ease both" }}
        >
          {slide.title.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < slide.title.split("\n").length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p
          key={`sub-${current}`}
          className="text-white/75 text-sm max-w-sm mt-2"
          style={{ animation: "fadeUp 0.7s 0.2s ease both" }}
        >
          {slide.sub}
        </p>
        <div
          className="mt-8 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs tracking-widest uppercase px-8 py-3 flex lg:flex-row flex-col items-center gap-4 rounded-sm"
          style={{ animation: "fadeUp 0.7s 0.3s ease both" }}
        >
          <span>Offre Spéciale : Planification + Remise de 15% !</span>
          <a
            href="#contact"
            className="border border-white/60 px-4 py-1.5 hover:bg-white hover:text-gray-800 transition-colors rounded-sm font-semibold"
          >
            Réserver
          </a>
        </div>
      </div>

      {/* Flèches Précédent / Suivant */}
      <button
        onClick={prev}
        aria-label="Diapositive précédente"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/40 transition-colors flex items-center justify-center"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Diapositive suivante"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/40 transition-colors flex items-center justify-center"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicateurs de points */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Aller à la diapositive ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-7 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

// ─── SECTION MATTERPORT ───────────────────────────────────────────────────────
function MatterportSection() {
  const [open, setOpen] = useState(false);
  const matterportUrl = "https://my.matterport.com/show/?m=XtAViUe8UAj";
  const embedUrl = `${matterportUrl}&play=1`;
  const thumbUrl = "/optimized/8.webp";

  // Verrouiller le défilement du corps lorsque le dialogue est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ── SECTION: claire, centrée ────────────────────────────────────────── */}
      <section
        id="visite-3d"
        className="py-16 bg-stone-50 border-y border-gray-100"
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
          {/* En-tête minimal */}
          <p className="text-sage text-xs uppercase tracking-[0.35em] mb-3 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-sage/40" />
            Visite Virtuelle
            <span className="inline-block w-6 h-px bg-sage/40" />
          </p>
          <h2 className="font-serif text-3xl text-gray-800 mb-2">
            Explorez notre espace en 3D
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Cliquez sur l'aperçu ci-dessous pour commencer la visite immersive.
          </p>

          {/* Aperçu cliquable centré */}
          <div
            className="relative w-full cursor-pointer group rounded-xl overflow-hidden shadow-lg border border-gray-100"
            onClick={() => setOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Ouvrir la visite virtuelle"
            onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
          >
            <img
              src={thumbUrl}
              alt="Aperçu de la visite 3D"
              className="w-full lg:h-[75vh] h-[30vh] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Superposition */}
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/70 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg
                  className="w-7 h-7 text-white translate-x-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-white text-xs uppercase tracking-widest font-semibold opacity-80">
                Démarrer la visite virtuelle
              </span>
            </div>
          </div>

          {/* Bouton CTA sous la carte */}
          <button
            onClick={() => setOpen(true)}
            id="open-virtual-tour"
            className="mt-6 group inline-flex items-center gap-2 text-sage border border-sage text-xs uppercase tracking-widest px-7 py-3 rounded-sm hover:bg-sage hover:text-white transition-all duration-300"
          >
            <svg
              className="w-3.5 h-3.5 translate-x-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Visiter en 3D
          </button>
        </div>
      </section>

      {/* ── DIALOGUE MATTERPORT ────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Visite Virtuelle"
        >
          {/* Arrière-plan */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panneau du modal */}
          <div className="relative z-10 w-full h-[90vh] max-w-5xl bg-stone-900 rounded-sm shadow-2xl overflow-hidden flex flex-col">
            {/* Barre d'en-tête */}
            <div className="flex items-center justify-between px-5 py-3  border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                <span className="text-white text-xs uppercase tracking-widest">
                  Visite Virtuelle — Expérience 3D
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le dialogue"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Iframe */}
            <div
              className="relative w-full h-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                allow="xr-spatial-tracking; gyroscope; accelerometer"
                title="Visite virtuelle Matterport"
              />
            </div>
          </div>
        </div>
      )}
      {/* Bouton Flottant (Au-dessus de WhatsApp) */}
      <div
        onClick={() => setOpen(true)}
        aria-label="Voir la visite virtuelle 3D"
        className="group fixed bottom-24 right-6 z-40 flex items-center gap-3"
      >
        {/* Infobulle */}
        <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-stone-800 text-white text-xs rounded-md px-3 py-1.5 whitespace-nowrap shadow-lg">
          Visite Virtuelle 3D
        </span>

        {/* Bouton */}
        <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) rotate(25deg); }
          100% { transform: translateX(350%) rotate(25deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        .gold-btn {
          background: linear-gradient(145deg,
            #f5d060 0%,
            #e8a820 20%,
            #fce570 40%,
            #c8860a 60%,
            #f0c030 80%,
            #a06010 100%
          );
          box-shadow:
            0 0 0 1px rgba(255,200,50,0.3),
            0 4px 15px rgba(200,134,10,0.6),
            0 8px 30px rgba(160,96,16,0.4),
            inset 0 1px 0 rgba(255,240,150,0.6),
            inset 0 -2px 4px rgba(120,70,0,0.4);
        }
        .gold-btn:hover {
          box-shadow:
            0 0 0 1px rgba(255,220,80,0.5),
            0 6px 25px rgba(200,134,10,0.8),
            0 12px 40px rgba(160,96,16,0.5),
            inset 0 1px 0 rgba(255,245,170,0.8),
            inset 0 -2px 4px rgba(120,70,0,0.4);
        }
        .shimmer-line {
          animation: shimmer 2.4s ease-in-out infinite;
        }
        .pulse-ring {
          animation: pulse-ring 1.8s ease-out infinite;
        }
      `}</style>

        <button
          className="relative flex items-center justify-center w-14 h-14 rounded-full gold-btn hover:scale-110 transition-transform duration-300 overflow-hidden group cursor-pointer border-0 outline-none"
          aria-label="Play"
        >
          {/* Pulse rings */}
          <span className="absolute inset-0 rounded-full bg-yellow-400 pulse-ring opacity-0 group-hover:opacity-60" />

          {/* Shimmer sweep */}
          <span
            className="shimmer-line absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
            style={{ left: "-2rem" }}
          />

          {/* Top gloss */}
          <span className="absolute top-1 left-2 right-2 h-5 rounded-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

          {/* Play icon */}
          <Play
            className="relative z-10 w-6 h-6 drop-shadow"
            fill="#7a4a00"
            stroke="#7a4a00"
            strokeWidth={0}
            style={{ marginLeft: "2px" }}
          />
        </button>
      </div>
    </>
  );
}

// ─── À PROPOS ──────────────────────────────────────────────────────────────
function AboutSplit() {
  return (
    <section id="a-propos" className="py-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sage text-xs uppercase tracking-[0.3em] mb-3">
            À Propos de Nous
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-800 leading-snug mb-5">
            Nous organisons et concevons des événements
            <br />
            qui captivent l'imagination
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Des mariages intimes aux grandes réceptions, notre équipe experte
            s'occupe de chaque détail avec soin et créativité. Nous croyons que
            votre événement doit être aussi unique que votre histoire.
          </p>
          <a
            href="#contact"
            className="inline-block bg-sage text-white text-xs uppercase tracking-widest px-7 py-3 hover:bg-sage-dark transition-colors rounded-sm"
          >
            Contactez-nous
          </a>
        </div>
        <div className="relative">
          <img
            src="/optimized/about.webp"
            alt="Arche de mariage"
            className="rounded-sm shadow-lg w-full h-80 object-cover"
          />
          <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-sage/20 rounded-full blur-2xl" />
        </div>
      </div>
      {/* Étapes du processus */}
      <div className="max-w-6xl mx-auto px-4 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {[
          {
            icon: <SquareParking className="w-10 h-10" />,
            step: "01",
            title: "Parking Gratuit",
            desc: "Espace sécurisé pour vos invités",
          },
          {
            icon: <Gift className="w-10 h-10" />,
            step: "02",
            title: "Visite Guidée",
            desc: "Consultation personnalisée incluse",
          },
          {
            icon: <NotepadText className="w-10 h-10" />,
            step: "03",
            title: "Planification",
            desc: "Planifiez chaque détail à l'avance",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="flex flex-col items-center gap-2 p-6 bg-white rounded-sm shadow-sm"
          >
            <span className="text-3xl text-[#9ab58a]">{item.icon}</span>
            <span className="text-sage text-xs uppercase tracking-widest font-semibold">
              {item.step}
            </span>
            <h4 className="font-serif text-lg text-gray-800">{item.title}</h4>
            <p className="text-gray-500 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── DESIGN EXCLUSIF ───────────────────────────────────────────────────────────
function ExclusiveDesign() {
  return (
    <section
      id="services"
      className="py-0 grid grid-cols-1 md:grid-cols-2 min-h-[380px]"
    >
      <div className="relative overflow-hidden">
        <img
          src="/optimized/14.webp"
          alt="Décoration florale"
          className="w-full h-full object-cover min-h-[300px]"
        />
      </div>
      <div className="bg-cream flex flex-col justify-center px-12 py-16">
        <p className="text-sage text-xs uppercase tracking-[0.3em] mb-3">
          Notre Spécialité
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-gray-800 leading-snug mb-5">
          Design Exclusif et
          <br />
          Décoration Raffinée
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Nos décorateurs professionnels apportent des décennies d'expérience
          pour créer des ambiances qui correspondent parfaitement à votre vision
          et à vos désirs.
        </p>
        <a
          href="#contact"
          className="inline-block self-start bg-sage text-white text-xs uppercase tracking-widest px-7 py-3 hover:bg-sage-dark transition-colors rounded-sm"
        >
          Contactez-nous
        </a>
      </div>
    </section>
  );
}

// ─── TÉMOIGNAGE ───────────────────────────────────────────────────────────────
function Testimonial() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="mb-5 flex justify-center">
          <span className="text-5xl text-sage/30 font-serif leading-none">
            &ldquo;
          </span>
        </div>
        <p className="text-gray-500 text-base italic leading-relaxed font-serif mb-6">
          "Le cadre était absolument magique. Nous n'aurions pas pu imaginer une
          plus belle fête — chaque détail était parfait et exactement comme nous
          l'avions rêvé."
        </p>
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sage/30">
            <img
              src="/profile.png"
              alt="Client"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-gray-700 text-sm font-medium font-serif">
            Khadija & Yassine
          </span>
          <span className="text-sage text-xs uppercase tracking-widest">
            Couple Heureux
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── BANNIÈRE CTA ──────────────────────────────────────────────────────────────
function CtaBanner() {
  return (
    <section className="relative py-28 flex items-center justify-center text-center overflow-hidden">
      <img
        src="/optimized/10.webp"
        alt="Allée de mariage"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col items-center gap-5 px-4">
        <p className="text-white/80 text-xs uppercase tracking-[0.35em]">
          Commencez à Planifier
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
          Laissez-nous rendre votre
          <br />
          événement impeccable
        </h2>
        <a
          href="#contact"
          className="mt-3 bg-sage text-white text-xs uppercase tracking-widest px-8 py-3 hover:bg-sage-dark transition-colors rounded-sm"
        >
          Contactez-nous
        </a>
      </div>
    </section>
  );
}

// ─── GALERIE ──────────────────────────────────────────────────────────────────
const galleryItems: any[] = [
  {
    src: "/optimized/1.webp",
    thumb: "/optimized/1.webp",
    label: "Salle",
    span: "row-span-2",
  },
  {
    src: "/optimized/2.webp",
    thumb: "/optimized/2.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/3.webp",
    thumb: "/optimized/3.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/4.webp",
    thumb: "/optimized/4.webp",
    label: "Salle",
    span: "col-span-2",
  },
  {
    src: "/optimized/5.webp",
    thumb: "/optimized/5.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/6.webp",
    thumb: "/optimized/6.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/7.webp",
    thumb: "/optimized/7.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/8.webp",
    thumb: "/optimized/8.webp",
    label: "Salle",
    span: "row-span-2",
  },
  {
    src: "/optimized/9.webp",
    thumb: "/optimized/9.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/10.webp",
    thumb: "/optimized/10.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/11.webp",
    thumb: "/optimized/11.webp",
    label: "Table",
    span: "row-span-2",
  },
  {
    src: "/optimized/12.webp",
    thumb: "/optimized/12.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/13.webp",
    thumb: "/optimized/13.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/14.webp",
    thumb: "/optimized/14.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/15.webp",
    thumb: "/optimized/15.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/16.webp",
    thumb: "/optimized/16.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/17.webp",
    thumb: "/optimized/17.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/a.webp",
    thumb: "/optimized/a.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/b.webp",
    thumb: "/optimized/b.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/c.webp",
    thumb: "/optimized/c.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/d.webp",
    thumb: "/optimized/d.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/e.webp",
    thumb: "/optimized/e.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/f.webp",
    thumb: "/optimized/f.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/g.webp",
    thumb: "/optimized/g.webp",
    label: "Salle",
    span: "",
  },
  {
    src: "/optimized/h.webp",
    thumb: "/optimized/h.webp",
    label: "Salle",
    span: "",
  },
];

function Gallery() {
  const [lightbox, setLightbox] = useState<any>(null); // index ou null
  const [touchStart, setTouchStart] = useState<any>(null);
  const [expanded, setExpanded] = useState(false);

  const initialItems = 8;
  const total = galleryItems.length;
  const displayedItems = expanded
    ? galleryItems
    : galleryItems.slice(0, initialItems);

  const goPrev = useCallback(
    () => setLightbox((i: any) => (i - 1 + total) % total),
    [total],
  );
  const goNext = useCallback(
    () => setLightbox((i: any) => (i + 1) % total),
    [total],
  );

  // Navigation au clavier
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: any) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, goPrev, goNext]);

  // Verrouillage du défilement du corps
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  // Balayage tactile
  const handleTouchStart = (e: any) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: any) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
    setTouchStart(null);
  };

  return (
    <>
      <section id="galerie" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* En-tête */}
          <div className="text-center mb-14">
            <p className="text-sage text-xs uppercase tracking-[0.35em] mb-3 flex items-center justify-center gap-3">
              <span className="inline-block w-8 h-px bg-sage/50" />
              Notre Galerie
              <span className="inline-block w-8 h-px bg-sage/50" />
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4">
              Moments Capturés
            </h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Chaque image raconte une histoire. Cliquez sur une photo pour
              l'explorer en plein écran.
            </p>
          </div>

          {/* Grille CSS style Masonry */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            style={{ gridAutoRows: "220px" }}
          >
            {displayedItems.map((item, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i)}
                tabIndex={0}
                role="button"
                aria-label={`Ouvrir l'image ${i + 1}: ${item.label}`}
                onKeyDown={(e) => e.key === "Enter" && setLightbox(i)}
                className={`group relative overflow-hidden cursor-pointer rounded-xl ${
                  item.span === "col-span-2" ? "sm:col-span-2" : item.span
                }`}
              >
                <img
                  src={item.thumb}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Superposition */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                {/* Libellé et icône de zoom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <p className="text-white text-xs uppercase tracking-widest font-semibold">
                    {item.label}
                  </p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
                {/* Badge d'index */}
                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>

          {/* Bouton Show More / Less */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="group flex items-center gap-2 text-sage border border-sage text-xs uppercase tracking-widest px-8 py-3 rounded-sm hover:bg-sage hover:text-white transition-all duration-300"
            >
              {expanded ? "Voir Moins" : "Voir Plus"}
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ────────────────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Arrière-plan sombre */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          />

          {/* Bouton de fermeture */}
          <button
            onClick={() => setLightbox(null)}
            aria-label="Fermer la galerie"
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Compteur */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 text-white/60 text-xs tracking-widest font-mono">
            {String(lightbox + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </div>

          {/* Libellé */}
          <div className="absolute top-5 left-5 z-20">
            <span className="text-white/80 text-xs uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
              {galleryItems[lightbox]?.label}
            </span>
          </div>

          {/* Précédent */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Image précédente"
            className="absolute left-4 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Image */}
          <div className="relative z-10 max-w-5xl max-h-[85vh] w-full mx-16 flex items-center justify-center">
            <img
              key={lightbox}
              src={galleryItems[lightbox]?.src}
              alt={galleryItems[lightbox]?.label}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              style={{ animation: "lbFadeIn 0.3s ease both" }}
            />
          </div>

          {/* Suivant */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Image suivante"
            className="absolute right-4 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Bande de points */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 flex-wrap justify-center max-w-xs">
            {galleryItems.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(i);
                }}
                aria-label={`Aller à l'image ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === lightbox
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/35 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Bande de miniatures */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-2 overflow-x-auto max-w-[90vw] pb-1">
            {galleryItems.map((item, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(i);
                }}
                className={`flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all duration-200 ${
                  i === lightbox
                    ? "border-white scale-110 opacity-100"
                    : "border-white/20 opacity-50 hover:opacity-80"
                }`}
              >
                <img
                  src={item.thumb}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <style>{`
            @keyframes lbFadeIn {
              from { opacity: 0; transform: scale(0.96); }
              to   { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}

// ─── FORMULAIRE DE CONTACT ────────────────────────────────────────────────────
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<any>(null); // 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await handleContactForm(formData);
      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Une erreur est survenue.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Échec de l'envoi du message. Veuillez réessayer.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-cream">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sage text-xs uppercase tracking-[0.3em] mb-2">
            Contactez-nous
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-800">
            Laissez-nous un message
          </h2>
        </div>

        {status === "success" && (
          <div className="mb-8 p-4 bg-green-50 border border-green-100 text-green-700 text-sm rounded-sm text-center animate-fade-in">
            Votre message a été envoyé avec succès ! Nous vous répondrons
            bientôt.
          </div>
        )}

        {status === "error" && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-sm text-center">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Votre Nom"
            required
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-sage rounded-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Votre Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-sage rounded-sm"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Numéro de Téléphone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-sage rounded-sm"
          />
          <input
            type="text"
            name="subject"
            placeholder="Sujet"
            required
            value={formData.subject}
            onChange={handleChange}
            className="border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-sage rounded-sm"
          />
          <textarea
            name="message"
            rows={4}
            placeholder="Votre Message"
            required
            value={formData.message}
            onChange={handleChange}
            className="md:col-span-2 border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-sage rounded-sm resize-none"
          />
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-sage text-white text-xs uppercase tracking-widest px-10 py-3 hover:bg-sage-dark transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                "Envoyer le Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1 flex flex-col gap-4">
          <img src="/optimized/logo.webp" alt="Logo" className="w-20" />
          <p className="text-gray-500 text-xs leading-relaxed">
            Votre salle de fêtes pour mariages, anniversaires et soirées à Salé.
            Des moments magiques qui durent toute une vie.
          </p>
        </div>
        {[
          {
            heading: "Liens Rapides",
            links: [
              { name: "Accueil", href: "#accueil" },
              { name: "Visite 3D", href: "#visite-3d" },
              { name: "À Propos", href: "#a-propos" },
              { name: "Galerie", href: "#galerie" },
              { name: "Contact", href: "#contact" },
            ],
          },
          {
            heading: "Services",
            links: [
              "Mariages",
              "Anniversaires",
              "Soirées",
              "Réceptions",
              "Décoration",
            ],
          },
          {
            heading: "Contact",
            links: [
              "Residence Al Amine, Salé 11000",
              "Salé, Maroc",
              "+212 6 66 79 49 86",
            ],
          },
        ].map((col) => (
          <div key={col.heading}>
            <h5 className="text-gray-800 text-xs uppercase tracking-widest font-semibold mb-4">
              {col.heading}
            </h5>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={typeof l === "string" ? l : l.name}>
                  <a
                    href={typeof l === "string" ? "#" : l.href}
                    className="text-gray-500 text-xs hover:text-sage transition-colors"
                  >
                    {typeof l === "string" ? l : l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 py-5 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Al Woud Wedding Studio. Tous droits
        réservés.
      </div>
    </footer>
  );
}

// ─── BOUTON WHATSAPP ─────────────────────────────────────────────────────────────
function WhatsAppButton() {
  const phone = "212666794986";
  const message = encodeURIComponent(
    "Bonjour ! J'aimerais en savoir plus sur votre salle de fêtes Al Woud.",
  );
  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter avec nous sur WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3"
    >
      {/* Infobulle */}
      <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs rounded-md px-3 py-1.5 whitespace-nowrap shadow-lg">
        Discuter sur WhatsApp
      </span>

      {/* Bouton */}
      <span className="relative flex items-center justify-center">
        {/* Anneau de pulsation */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />
        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-green-500/40 hover:scale-110 transition-transform duration-300">
          {/* Icône SVG WhatsApp */}
          <svg
            viewBox="0 0 32 32"
            className="w-7 h-7 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.001 2C8.269 2 2 8.269 2 16.001c0 2.47.649 4.883 1.882 7.01L2 30l7.186-1.857A13.948 13.948 0 0016.001 30C23.731 30 30 23.731 30 16.001 30 8.269 23.731 2 16.001 2zm0 25.459a11.42 11.42 0 01-5.813-1.586l-.417-.247-4.264 1.101 1.134-4.148-.272-.426A11.422 11.422 0 014.54 16c0-6.317 5.143-11.46 11.461-11.46S27.46 9.683 27.46 16 22.318 27.459 16.001 27.459zm6.291-8.577c-.344-.172-2.036-1.003-2.352-1.118-.316-.116-.547-.172-.777.172-.231.344-.893 1.118-1.094 1.348-.201.23-.403.259-.747.087-.344-.172-1.452-.535-2.767-1.706-1.023-.912-1.713-2.037-1.914-2.381-.201-.344-.021-.53.151-.702.155-.154.344-.403.516-.604.172-.201.229-.344.344-.575.114-.23.057-.431-.029-.604-.086-.172-.777-1.872-1.065-2.563-.28-.672-.565-.58-.777-.591l-.661-.011c-.23 0-.604.086-.92.431s-1.208 1.18-1.208 2.878 1.237 3.337 1.409 3.567c.172.231 2.434 3.716 5.899 5.211.824.355 1.467.568 1.969.727.827.263 1.581.226 2.175.137.663-.099 2.036-.832 2.323-1.635.287-.804.287-1.493.201-1.637-.085-.143-.316-.229-.66-.401z" />
          </svg>
        </span>
      </span>
    </a>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <main className="font-sans bg-white text-gray-800">
      <Navbar />
      <Hero />
      <MatterportSection />
      <AboutSplit />
      <ExclusiveDesign />
      <Testimonial />
      <CtaBanner />
      <Gallery />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
