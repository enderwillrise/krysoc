import type { Locale } from "@/lib/site";

export interface Dict {
  meta: { title: string; description: string };
  nav: {
    services: string;
    work: string;
    concepts: string;
    process: string;
    pricing: string;
    faq: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    titleA: string;
    titleGold: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    pipelineCaption: string;
  };
  proof: {
    eyebrow: string;
    title: string;
    sub: string;
    stats: { value: string; label: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    sub: string;
    items: { tag: string; title: string; body: string; examples: string[] }[];
    examplesLabel: string;
  };
  work: {
    eyebrow: string;
    title: string;
    sub: string;
    items: { name: string; domain: string; body: string; result: string }[];
    resultLabel: string;
  };
  concepts: {
    eyebrow: string;
    title: string;
    sub: string;
    items: { kicker: string; name: string; body: string; cta: string }[];
    included: string[];
    allCta: string;
  };
  process: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: { num: string; title: string; duration: string; body: string }[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    sub: string;
    roi: {
      title: string;
      hours: string;
      assumption: string;
      yearly: string;
      paybackPrefix: string;
      paybackSuffix: string;
    };
    badge: string;
    tiers: {
      name: string;
      price: string;
      priceNote: string;
      body: string;
      features: string[];
      cta: string;
      highlight?: boolean;
    }[];
    footnote: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    title: string;
    sub: string;
    cta: string;
    emailLabel: string;
  };
  footer: {
    tagline: string;
    nav: string;
    legal: string;
    imprint: string;
    privacy: string;
    language: string;
  };
}

const en: Dict = {
  meta: {
    title: "Krysoc — AI Automation Studio",
    description:
      "Krysoc designs, builds and operates AI automations for companies in Germany and beyond — from a fixed-price audit to a running system in weeks.",
  },
  nav: {
    services: "Services",
    work: "Work",
    concepts: "Concepts",
    process: "Process",
    pricing: "Pricing",
    faq: "FAQ",
    cta: "Book a call",
  },
  hero: {
    eyebrow: "AI automation studio — DACH & remote",
    titleA: "Stop doing work",
    titleGold: "a system can do.",
    sub: "Krysoc finds the manual steps that slow your company down, builds the AI systems that take them over, and keeps those systems running. Fixed-price audit first, working automation in weeks — not a slide deck.",
    ctaPrimary: "Book a free intro call",
    ctaSecondary: "See what we build",
    pipelineCaption: "A Krysoc automation, live: requests in, finished work out.",
  },
  proof: {
    eyebrow: "Why trust a new studio",
    title: "We automate our own companies first.",
    sub: "Krysoc is new. The systems behind it are not: our founder builds and operates AI-run products used by thousands of people — the same engineering now offered to your business.",
    stats: [
      { value: "3", label: "products live in production" },
      { value: "10,000+", label: "users & contacts served" },
      { value: "13,000+", label: "AI-generated assets shipped" },
      { value: "1", label: "person operating it all — with systems" },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "Four ways we take work off your plate.",
    sub: "Every engagement starts from a real bottleneck in your operations — not from a technology looking for a use case.",
    examplesLabel: "Typical builds",
    items: [
      {
        tag: "01 — Workflows",
        title: "Workflow automation",
        body: "We connect the tools you already use — CRM, email, spreadsheets, invoicing, project boards — so data moves itself and nobody re-types anything.",
        examples: [
          "Lead capture → CRM → follow-up sequences",
          "Invoice intake, matching and bookkeeping handoff",
          "Reporting that assembles and sends itself",
        ],
      },
      {
        tag: "02 — Agents",
        title: "AI agents & chatbots",
        body: "Assistants that answer customers, qualify leads and search your internal knowledge — trained on your data, with escalation to a human when it matters.",
        examples: [
          "Support assistant on your website & email",
          "Lead qualification before a human ever replies",
          "Internal knowledge search for your team",
        ],
      },
      {
        tag: "03 — Custom",
        title: "Custom AI applications",
        body: "When off-the-shelf tools end, we build: full applications with AI at the core — dashboards, portals, content pipelines, integrations into your product.",
        examples: [
          "AI content & document generation pipelines",
          "Customer-facing tools and calculators",
          "Integrations with Claude, GPT and your stack",
        ],
      },
      {
        tag: "04 — Strategy",
        title: "Audits & consulting",
        body: "A fixed-price review of your operations that ends in a ranked automation roadmap: what to automate, what it saves, what it costs. Yours to keep, whoever builds it.",
        examples: [
          "Process mapping across your team",
          "Ranked roadmap with effort & savings estimates",
          "Tool and vendor recommendations",
        ],
      },
    ],
  },
  work: {
    eyebrow: "Proof of work",
    title: "Products we built and run ourselves.",
    sub: "Before selling automation, we built companies that run on it. These are live, revenue-generating products — engineered, automated and operated by Krysoc's founder.",
    resultLabel: "What runs on autopilot",
    items: [
      {
        name: "Ankommo",
        domain: "German learning platform",
        body: "A complete language-learning product: 109 chapters across four levels, payments, native apps — plus a back office that runs itself.",
        result:
          "Hourly email engine for 10,000+ contacts, daily AI-written blog publishing, 13,000+ AI-generated audio clips, automated payment recovery.",
      },
      {
        name: "UniGet",
        domain: "University matching engine",
        body: "A recommendation engine that turns a 6-step questionnaire into a personal university shortlist for studying in Germany.",
        result:
          "Advice that used to require a consultant, delivered end-to-end by a scoring engine — zero manual work per user.",
      },
      {
        name: "Einbürgerung Deutschland",
        domain: "Citizenship test prep",
        body: "Exam preparation for the German citizenship test: all 460 official questions, structured practice, paid access.",
        result:
          "A monetized product with 667 pages generated and maintained programmatically — near-zero manual operations.",
      },
    ],
  },
  concepts: {
    eyebrow: "Websites for local business",
    title: "Your industry, already designed.",
    sub: "Not every problem needs an automation. Sometimes the bottleneck is a website that nobody can book through. These are complete concepts — click into one and use it as if it were yours.",
    items: [
      {
        kicker: "Restaurant",
        name: "Trattoria Salvia",
        body: "Menu that stays current, daily lunch, live opening status and reservations wired into the booking system the restaurant already pays for.",
        cta: "Open concept",
      },
      {
        kicker: "Medical practice",
        name: "Praxis am Lindenplatz",
        body: "Online appointments in the first screen, connected to Doctolib, samedi, Jameda or Dr. Flex. Plus repeat prescriptions and emergency numbers.",
        cta: "Open concept",
      },
      {
        kicker: "Trades",
        name: "Hartmann Haustechnik",
        body: "Emergency number always visible, a heat-pump subsidy calculator that answers the first question every customer asks, and a careers section that actually recruits.",
        cta: "Open concept",
      },
    ],
    included: [
      "Hosted in Germany",
      "No cookie banner",
      "Imprint & privacy done right",
      "Connected to your booking system",
    ],
    allCta: "See all concepts",
  },
  process: {
    eyebrow: "Process",
    title: "From audit to running system.",
    sub: "A deliberately small engagement first. You see value before you commit to anything bigger.",
    steps: [
      {
        num: "01",
        title: "Automation audit",
        duration: "1 week · fixed price",
        body: "We map how work actually flows through your team and find the steps worth automating. You get a ranked roadmap with effort and savings — useful even if we never build a thing.",
      },
      {
        num: "02",
        title: "Build sprint",
        duration: "2–4 weeks",
        body: "We build the highest-value automation from the roadmap: designed, integrated with your tools, tested with your team, documented and handed over working.",
      },
      {
        num: "03",
        title: "Operate & extend",
        duration: "monthly · cancel anytime",
        body: "Automations need an owner. We monitor, fix and improve what we built — and keep shipping the next item on your roadmap every month.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Simple engagements, no lock-in.",
    sub: "Start small, see results, then decide. No agency retainers you can't leave.",
    roi: {
      title: "How fast does automation pay for itself?",
      hours: "Hours of manual work per week",
      assumption: "Assuming €35/hour staff cost, 46 working weeks",
      yearly: "lost to manual work every year",
      paybackPrefix: "A €2,900 build sprint pays for itself in about",
      paybackSuffix: "weeks",
    },
    badge: "Most booked",
    footnote:
      "All prices excl. VAT. Audit fee is credited in full if we proceed to a build sprint.",
    tiers: [
      {
        name: "Automation Audit",
        price: "€490",
        priceNote: "fixed, one week",
        body: "The entry point. Your operations mapped, your automation roadmap ranked by ROI.",
        features: [
          "2 workshops with your team",
          "Process map of your operations",
          "Ranked roadmap: effort, cost, savings",
          "Credited if we build together",
        ],
        cta: "Book an audit",
      },
      {
        name: "Build Sprint",
        price: "from €2,900",
        priceNote: "per sprint, 2–4 weeks",
        body: "One high-value automation, built and handed over working — integrated, tested, documented.",
        features: [
          "Working system, not a prototype",
          "Integrated with your existing tools",
          "Team walkthrough & documentation",
          "30 days of post-launch fixes included",
        ],
        cta: "Scope a sprint",
        highlight: true,
      },
      {
        name: "Automation Partner",
        price: "from €990/mo",
        priceNote: "monthly, cancel anytime",
        body: "We run what we built and keep building. Your automation roadmap, continuously shipped.",
        features: [
          "Monitoring & fixes for everything we built",
          "New automation shipped every month",
          "Priority support, direct line",
          "Quarterly roadmap review",
        ],
        cta: "Talk about a retainer",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "The questions companies actually ask.",
    items: [
      {
        q: "What tools do you build with?",
        a: "Whatever fits your case best: n8n, Make or Zapier for tool-to-tool workflows; Claude and GPT models for language tasks; custom TypeScript or Python services when off-the-shelf tools reach their limits. You get a recommendation with reasons, and everything we build is yours.",
      },
      {
        q: "Is our data safe? What about GDPR?",
        a: "We work GDPR-first: EU hosting where possible, data-processing agreements with every vendor, and a clear record of which data flows where. AI providers are chosen with EU data residency options in mind, and we'll happily go through it with your data-protection officer.",
      },
      {
        q: "How fast do we see something working?",
        a: "The audit takes one week. A first working automation typically lands two to four weeks after that. We deliberately start with the smallest automation that proves value — not a six-month platform project.",
      },
      {
        q: "Do we need to change our existing tools?",
        a: "No. Automation works best when it connects the tools your team already knows. We build around your current stack and only recommend replacing a tool when it's genuinely the bottleneck.",
      },
      {
        q: "What happens when an automation breaks?",
        a: "Every build sprint includes 30 days of fixes. After that, the Automation Partner plan covers monitoring, alerting and repairs — or your own team can take over with our documentation. Nothing we build is a black box.",
      },
      {
        q: "Do you work in German or English?",
        a: "Both, natively. Workshops, documentation and the systems themselves can be in either language — including customer-facing assistants that speak German to your customers.",
      },
    ],
  },
  finalCta: {
    title: "Book a 30-minute call.",
    sub: "Bring your most annoying process. You'll leave with at least two concrete automation ideas — free, whatever you decide afterwards.",
    cta: "Book a free intro call",
    emailLabel: "or write to",
  },
  footer: {
    tagline: "AI automation studio. Built in Germany, working worldwide.",
    nav: "Navigate",
    legal: "Legal",
    imprint: "Imprint",
    privacy: "Privacy",
    language: "Deutsch",
  },
};

const de: Dict = {
  meta: {
    title: "Krysoc — Studio für KI-Automatisierung",
    description:
      "Krysoc konzipiert, baut und betreibt KI-Automatisierungen für Unternehmen — vom Audit zum Festpreis bis zum laufenden System in wenigen Wochen.",
  },
  nav: {
    services: "Leistungen",
    work: "Referenzen",
    concepts: "Konzepte",
    process: "Ablauf",
    pricing: "Preise",
    faq: "FAQ",
    cta: "Gespräch buchen",
  },
  hero: {
    eyebrow: "Studio für KI-Automatisierung — DACH & remote",
    titleA: "Schluss mit Arbeit,",
    titleGold: "die ein System erledigen kann.",
    sub: "Krysoc findet die manuellen Schritte, die Ihr Unternehmen ausbremsen, baut die KI-Systeme, die sie übernehmen — und hält sie am Laufen. Erst ein Audit zum Festpreis, dann eine funktionierende Automatisierung in Wochen. Keine Folienschlacht.",
    ctaPrimary: "Kostenloses Erstgespräch buchen",
    ctaSecondary: "Was wir bauen",
    pipelineCaption: "Eine Krysoc-Automatisierung, live: Anfragen rein, fertige Arbeit raus.",
  },
  proof: {
    eyebrow: "Warum einem neuen Studio vertrauen",
    title: "Wir automatisieren zuerst unsere eigenen Firmen.",
    sub: "Krysoc ist neu. Die Systeme dahinter sind es nicht: Unser Gründer baut und betreibt KI-gestützte Produkte, die Tausende Menschen nutzen — dieselbe Ingenieursarbeit gibt es jetzt für Ihr Unternehmen.",
    stats: [
      { value: "3", label: "Produkte live im Einsatz" },
      { value: "10.000+", label: "Nutzer & Kontakte betreut" },
      { value: "13.000+", label: "KI-generierte Inhalte ausgeliefert" },
      { value: "1", label: "Person betreibt alles — dank Systemen" },
    ],
  },
  services: {
    eyebrow: "Leistungen",
    title: "Vier Wege, Ihnen Arbeit abzunehmen.",
    sub: "Jedes Projekt beginnt bei einem echten Engpass in Ihren Abläufen — nicht bei einer Technologie, die einen Anwendungsfall sucht.",
    examplesLabel: "Typische Projekte",
    items: [
      {
        tag: "01 — Workflows",
        title: "Workflow-Automatisierung",
        body: "Wir verbinden die Tools, die Sie bereits nutzen — CRM, E-Mail, Tabellen, Rechnungen, Projektboards — damit Daten sich selbst bewegen und niemand mehr abtippt.",
        examples: [
          "Lead-Erfassung → CRM → Follow-up-Strecken",
          "Rechnungseingang, Abgleich und Übergabe an die Buchhaltung",
          "Reports, die sich selbst erstellen und versenden",
        ],
      },
      {
        tag: "02 — Agenten",
        title: "KI-Agenten & Chatbots",
        body: "Assistenten, die Kunden antworten, Leads qualifizieren und internes Wissen durchsuchen — trainiert auf Ihren Daten, mit Übergabe an Menschen, wenn es darauf ankommt.",
        examples: [
          "Support-Assistent auf Website & E-Mail",
          "Lead-Qualifizierung, bevor ein Mensch antwortet",
          "Interne Wissenssuche für Ihr Team",
        ],
      },
      {
        tag: "03 — Individuell",
        title: "Individuelle KI-Anwendungen",
        body: "Wo Standardtools enden, bauen wir: vollständige Anwendungen mit KI im Kern — Dashboards, Portale, Content-Pipelines, Integrationen in Ihr Produkt.",
        examples: [
          "KI-Pipelines für Inhalte & Dokumente",
          "Tools und Rechner für Ihre Kunden",
          "Integrationen mit Claude, GPT und Ihrem Stack",
        ],
      },
      {
        tag: "04 — Strategie",
        title: "Audits & Beratung",
        body: "Eine Analyse Ihrer Abläufe zum Festpreis, an deren Ende eine priorisierte Automatisierungs-Roadmap steht: was automatisieren, was es spart, was es kostet. Gehört Ihnen — egal, wer baut.",
        examples: [
          "Prozessaufnahme in Ihrem Team",
          "Priorisierte Roadmap mit Aufwand & Einsparung",
          "Tool- und Anbieterempfehlungen",
        ],
      },
    ],
  },
  work: {
    eyebrow: "Referenzen",
    title: "Produkte, die wir selbst gebaut haben und betreiben.",
    sub: "Bevor wir Automatisierung verkaufen, haben wir Firmen gebaut, die darauf laufen. Das sind live geschaltete, umsatzbringende Produkte — entwickelt, automatisiert und betrieben vom Gründer von Krysoc.",
    resultLabel: "Läuft auf Autopilot",
    items: [
      {
        name: "Ankommo",
        domain: "Deutsch-Lernplattform",
        body: "Ein komplettes Sprachlernprodukt: 109 Kapitel über vier Niveaustufen, Zahlungen, native Apps — plus ein Backoffice, das sich selbst betreibt.",
        result:
          "Stündliche E-Mail-Engine für 10.000+ Kontakte, täglich automatisch veröffentlichte Blogartikel, 13.000+ KI-generierte Audioclips, automatisierte Zahlungsrückholung.",
      },
      {
        name: "UniGet",
        domain: "Uni-Matching-Engine",
        body: "Eine Empfehlungs-Engine, die aus einem Fragebogen in 6 Schritten eine persönliche Uni-Shortlist für das Studium in Deutschland macht.",
        result:
          "Beratung, für die früher ein Consultant nötig war, vollständig von einer Scoring-Engine erledigt — null manuelle Arbeit pro Nutzer.",
      },
      {
        name: "Einbürgerung Deutschland",
        domain: "Vorbereitung Einbürgerungstest",
        body: "Prüfungsvorbereitung für den deutschen Einbürgerungstest: alle 460 offiziellen Fragen, strukturiertes Üben, bezahlter Zugang.",
        result:
          "Ein monetarisiertes Produkt mit 667 programmatisch erzeugten und gepflegten Seiten — nahezu ohne manuellen Betrieb.",
      },
    ],
  },
  concepts: {
    eyebrow: "Websites für lokale Unternehmen",
    title: "Ihre Branche, schon entworfen.",
    sub: "Nicht jedes Problem braucht eine Automatisierung. Manchmal ist der Engpass eine Website, über die niemand buchen kann. Das hier sind fertige Konzepte — klicken Sie hinein und nutzen Sie sie, als wären es Ihre.",
    items: [
      {
        kicker: "Restaurant",
        name: "Trattoria Salvia",
        body: "Speisekarte, die aktuell bleibt, Mittagstisch, Öffnungszeiten mit Live-Status und Reservierung an das Tischbuch angebunden, das das Restaurant ohnehin bezahlt.",
        cta: "Konzept öffnen",
      },
      {
        kicker: "Arztpraxis",
        name: "Praxis am Lindenplatz",
        body: "Online-Termine im ersten Bildschirm, angebunden an Doctolib, samedi, Jameda oder Dr. Flex. Dazu Folgerezepte und Notfallnummern.",
        cta: "Konzept öffnen",
      },
      {
        kicker: "Handwerk",
        name: "Hartmann Haustechnik",
        body: "Notdienstnummer immer sichtbar, ein Förderrechner, der die erste Frage jedes Kunden beantwortet, und ein Karrierebereich, der wirklich Bewerbungen bringt.",
        cta: "Konzept öffnen",
      },
    ],
    included: [
      "Hosting in Deutschland",
      "Ohne Cookie-Banner",
      "Impressum & Datenschutz korrekt",
      "An Ihr Buchungssystem angebunden",
    ],
    allCta: "Alle Konzepte ansehen",
  },
  process: {
    eyebrow: "Ablauf",
    title: "Vom Audit zum laufenden System.",
    sub: "Bewusst klein anfangen. Sie sehen den Wert, bevor Sie sich zu etwas Größerem verpflichten.",
    steps: [
      {
        num: "01",
        title: "Automatisierungs-Audit",
        duration: "1 Woche · Festpreis",
        body: "Wir erfassen, wie Arbeit tatsächlich durch Ihr Team fließt, und finden die Schritte, die sich zu automatisieren lohnen. Sie erhalten eine priorisierte Roadmap mit Aufwand und Einsparung — nützlich, selbst wenn wir nie etwas bauen.",
      },
      {
        num: "02",
        title: "Build-Sprint",
        duration: "2–4 Wochen",
        body: "Wir bauen die wertvollste Automatisierung aus der Roadmap: konzipiert, in Ihre Tools integriert, mit Ihrem Team getestet, dokumentiert und funktionierend übergeben.",
      },
      {
        num: "03",
        title: "Betrieb & Ausbau",
        duration: "monatlich · jederzeit kündbar",
        body: "Automatisierungen brauchen einen Verantwortlichen. Wir überwachen, reparieren und verbessern, was wir gebaut haben — und liefern jeden Monat den nächsten Punkt Ihrer Roadmap.",
      },
    ],
  },
  pricing: {
    eyebrow: "Preise",
    title: "Klare Pakete, kein Lock-in.",
    sub: "Klein anfangen, Ergebnisse sehen, dann entscheiden. Keine Agenturverträge, aus denen Sie nicht mehr herauskommen.",
    roi: {
      title: "Wie schnell rechnet sich Automatisierung?",
      hours: "Stunden manuelle Arbeit pro Woche",
      assumption: "Angenommen: 35 €/Stunde Personalkosten, 46 Arbeitswochen",
      yearly: "gehen jedes Jahr für manuelle Arbeit verloren",
      paybackPrefix: "Ein Build-Sprint für 2.900 € rechnet sich in etwa",
      paybackSuffix: "Wochen",
    },
    badge: "Am häufigsten gebucht",
    footnote:
      "Alle Preise zzgl. USt. Die Audit-Gebühr wird bei einem anschließenden Build-Sprint vollständig angerechnet.",
    tiers: [
      {
        name: "Automatisierungs-Audit",
        price: "490 €",
        priceNote: "Festpreis, eine Woche",
        body: "Der Einstieg. Ihre Abläufe erfasst, Ihre Automatisierungs-Roadmap nach ROI priorisiert.",
        features: [
          "2 Workshops mit Ihrem Team",
          "Prozesslandkarte Ihrer Abläufe",
          "Priorisierte Roadmap: Aufwand, Kosten, Einsparung",
          "Wird bei gemeinsamem Build angerechnet",
        ],
        cta: "Audit buchen",
      },
      {
        name: "Build-Sprint",
        price: "ab 2.900 €",
        priceNote: "pro Sprint, 2–4 Wochen",
        body: "Eine wertvolle Automatisierung, fertig gebaut und funktionierend übergeben — integriert, getestet, dokumentiert.",
        features: [
          "Laufendes System, kein Prototyp",
          "Integriert in Ihre bestehenden Tools",
          "Team-Einführung & Dokumentation",
          "30 Tage Nachbesserung inklusive",
        ],
        cta: "Sprint besprechen",
        highlight: true,
      },
      {
        name: "Automation Partner",
        price: "ab 990 €/Monat",
        priceNote: "monatlich, jederzeit kündbar",
        body: "Wir betreiben, was wir gebaut haben — und bauen weiter. Ihre Roadmap, kontinuierlich umgesetzt.",
        features: [
          "Monitoring & Fixes für alles Gebaute",
          "Jeden Monat eine neue Automatisierung",
          "Prioritäts-Support, direkter Draht",
          "Roadmap-Review pro Quartal",
        ],
        cta: "Über einen Retainer sprechen",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Die Fragen, die Unternehmen wirklich stellen.",
    items: [
      {
        q: "Mit welchen Tools bauen Sie?",
        a: "Mit dem, was zu Ihrem Fall passt: n8n, Make oder Zapier für Tool-zu-Tool-Workflows; Claude- und GPT-Modelle für Sprachaufgaben; individuelle TypeScript- oder Python-Services, wo Standardtools an Grenzen stoßen. Sie bekommen eine begründete Empfehlung — und alles, was wir bauen, gehört Ihnen.",
      },
      {
        q: "Sind unsere Daten sicher? Was ist mit der DSGVO?",
        a: "Wir arbeiten DSGVO-first: EU-Hosting wo möglich, Auftragsverarbeitungsverträge mit jedem Anbieter und eine klare Übersicht, welche Daten wohin fließen. KI-Anbieter wählen wir mit Blick auf EU-Datenresidenz aus — und gehen das gern mit Ihrem Datenschutzbeauftragten durch.",
      },
      {
        q: "Wie schnell sehen wir etwas Funktionierendes?",
        a: "Das Audit dauert eine Woche. Die erste funktionierende Automatisierung folgt typischerweise zwei bis vier Wochen danach. Wir starten bewusst mit der kleinsten Automatisierung, die Wert beweist — nicht mit einem Sechs-Monats-Projekt.",
      },
      {
        q: "Müssen wir unsere bestehenden Tools wechseln?",
        a: "Nein. Automatisierung funktioniert am besten, wenn sie die Tools verbindet, die Ihr Team bereits kennt. Wir bauen um Ihren bestehenden Stack herum und empfehlen einen Wechsel nur, wenn ein Tool wirklich der Engpass ist.",
      },
      {
        q: "Was passiert, wenn eine Automatisierung ausfällt?",
        a: "Jeder Build-Sprint enthält 30 Tage Nachbesserung. Danach übernimmt der Automation-Partner-Plan Monitoring, Alarme und Reparaturen — oder Ihr eigenes Team übernimmt mit unserer Dokumentation. Nichts, was wir bauen, ist eine Blackbox.",
      },
      {
        q: "Arbeiten Sie auf Deutsch oder Englisch?",
        a: "Beides, muttersprachlich. Workshops, Dokumentation und die Systeme selbst gibt es in beiden Sprachen — inklusive Kunden-Assistenten, die mit Ihren Kunden Deutsch sprechen.",
      },
    ],
  },
  finalCta: {
    title: "Buchen Sie 30 Minuten.",
    sub: "Bringen Sie Ihren nervigsten Prozess mit. Sie gehen mit mindestens zwei konkreten Automatisierungsideen — kostenlos, egal wie Sie sich danach entscheiden.",
    cta: "Kostenloses Erstgespräch buchen",
    emailLabel: "oder schreiben Sie an",
  },
  footer: {
    tagline: "Studio für KI-Automatisierung. Gebaut in Deutschland, im Einsatz weltweit.",
    nav: "Navigation",
    legal: "Rechtliches",
    imprint: "Impressum",
    privacy: "Datenschutz",
    language: "English",
  },
};

const dictionaries: Record<Locale, Dict> = { en, de };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}
