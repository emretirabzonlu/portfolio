// ─── Types ────────────────────────────────────────────────────────────────────

export type Social = {
  name: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
};

export type HeroData = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  cta: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string; download: boolean };
  };
  social: Social[];
};

export type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

export type AboutData = {
  heading: string;
  paragraphs: string[];
  stats: StatItem[];
};

export type SkillCategory = {
  title: string;
  icon: "server" | "code" | "database" | "wrench";
  skills: string[];
};

export type SkillsData = {
  heading: string;
  subtitle: string;
  categories: SkillCategory[];
};

export type ProjectLinks = {
  live: string | null;
  github: string | null;
};

export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  role: string;
  company: string;
  year: string;
  description: string;
  highlights: string[];
  tech: string[];
  image: string;
  accent: string;
  links: ProjectLinks;
};

export type ProjectsData = {
  heading: string;
  subtitle: string;
  items: ProjectItem[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tech: string[];
};

export type ExperienceData = {
  heading: string;
  subtitle: string;
  items: ExperienceItem[];
};

export type ContactData = {
  heading: string;
  label: string;
  intro: string;
  email: string;
  phone: string;
  location: string;
  social: Social[];
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const heroData: HeroData = {
  name: "Emre Tırabzonlu",
  role: "Full Stack Developer",
  tagline:
    ".NET & React ekosistemleri ile uçtan uca, ölçeklenebilir kurumsal sistemler inşa ediyorum.",
  location: "Kocaeli, Türkiye",
  cta: {
    primary: { label: "Projelerimi Gör", href: "#projeler" },
    secondary: { label: "CV İndir", href: "/cv.pdf", download: true },
  },
  social: [
    { name: "GitHub", href: "https://github.com/emretirabzonlu", icon: "github" },
    { name: "LinkedIn", href: "https://linkedin.com/in/emretirabzonlu", icon: "linkedin" },
    { name: "Mail", href: "mailto:emretirabzonlu@gmail.com", icon: "mail" },
  ],
};

// ─── About ────────────────────────────────────────────────────────────────────

export const aboutData: AboutData = {
  heading: "Hakkımda",
  paragraphs: [
    "Bilişim Sistemleri alanında yüksek lisans yapan, .NET ve React ekosistemlerinde uçtan uca ölçeklenebilir projeler geliştiren bir Full Stack Developer'ım.",
    "N-Layer mimari ve Database First yaklaşımlarıyla sürdürülebilir backend sistemleri inşa ederken, modern frontend teknolojileri ve Headless CMS entegrasyonlarıyla global standartlarda kullanıcı deneyimleri sunuyorum.",
    "Teknik altyapımı Microsoft Azure teknolojileriyle genişleterek, bulut tabanlı ve yüksek performanslı kurumsal çözümler üretmeyi hedefliyorum.",
  ],
  stats: [
    { value: 3, suffix: "+", label: "Yıl Deneyim" },
    { value: 10, suffix: "+", label: "Canlı Proje" },
    { value: 2, suffix: "", label: "ERP Sistemi" },
    { value: 5, suffix: "", label: "Sertifika" },
  ],
};

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skillsData: SkillsData = {
  heading: "Yetenekler",
  subtitle: "Uçtan uca proje geliştirmede kullandığım teknolojiler",
  categories: [
    {
      title: "Backend & Architecture",
      icon: "server",
      skills: ["C#", ".NET Core", "Entity Framework", "N-Layer", "RESTful API", "Dependency Injection"],
    },
    {
      title: "Frontend & Mobile",
      icon: "code",
      skills: ["React.js", "React Native", "TypeScript", "Redux", "Tailwind CSS", "Context API"],
    },
    {
      title: "Database & Cloud",
      icon: "database",
      skills: ["MS SQL Server", "Microsoft Azure", "Cloud Architecture", "Relational DB"],
    },
    {
      title: "CMS & Tools",
      icon: "wrench",
      skills: ["Strapi", "WordPress", "Git", "Postman", "Figma", "Agile/Scrum"],
    },
  ],
};

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projectsData: ProjectsData = {
  heading: "Projeler",
  subtitle: "Uçtan uca geliştirip canlıya aldığım sistemler",
  items: [
    {
      id: "propex",
      title: "Propex ERP",
      category: "Enterprise",
      role: "Full Stack Developer",
      company: "BS Pazarlama / Gamino Teknoloji",
      year: "2023 – Present",
      description:
        "Sıfırdan tasarlanıp inşa edilen kapsamlı ERP sistemi. Trendyol başta olmak üzere karmaşık e-ticaret entegrasyonları, API servisleri ve dinamik veri yönetim süreçlerini içeren web ve mobil platform.",
      highlights: [
        "Web + Mobile frontend mimarisi sıfırdan kurgulandı",
        "Backend tarafında API servisleri ve veri yönetimi",
        "Trendyol ve diğer pazaryeri entegrasyonları",
      ],
      tech: [".NET Core", "React", "React Native", "MS SQL", "REST API"],
      image: "/projects/propex.png",
      accent: "#3B82F6",
      links: { live: null, github: null },
    },
    {
      id: "satso",
      title: "SATSO AI ChatBot",
      category: "AI / Enterprise",
      role: "Frontend Lead",
      company: "BS Pazarlama",
      year: "2025",
      description:
        "Sakarya Ticaret ve Sanayi Odası için geliştirilen yapay zeka destekli ChatBot ve merkezi yönetim paneli. Kurumsal kullanıcı deneyimini şekillendiren frontend mimarisi.",
      highlights: [
        "AI destekli chat arayüzü",
        "Admin paneli sıfırdan tasarım ve geliştirme",
        "Kurumsal müşteri için ölçeklenebilir mimari",
      ],
      tech: ["React", "TypeScript", "Tailwind", "REST API"],
      image: "/projects/satso.png",
      accent: "#8B5CF6",
      links: { live: null, github: null },
    },
    {
      id: "budurumda",
      title: "Budurumda",
      category: "Mobile App",
      role: "Full Stack Developer",
      company: "Bağımsız Proje",
      year: "2024",
      description:
        "Sosyal medya etkileşimi ve ödül mekanizmalarına dayalı iOS & Android mobil uygulama. Hem React Native arayüzleri hem de .NET backend servisleri sıfırdan geliştirildi.",
      highlights: [
        "iOS + Android tek kod tabanı",
        ".NET backend mimari",
        "Store yayın süreçleri yönetildi",
      ],
      tech: ["React Native", ".NET", "MS SQL", "REST API"],
      image: "/projects/budurumda.png",
      accent: "#10B981",
      links: { live: null, github: null },
    },
    {
      id: "plant-ai",
      title: "Plant Disease Detection",
      category: "AI / Research",
      role: "Full Stack Developer",
      company: "Yüksek Lisans Bitirme Projesi",
      year: "2025 – 2026",
      description:
        "Bitki yapraklarındaki hastalıkları görüntü işleme ve yapay zeka ile tespit eden uçtan uca sistem. Python AI backend, vanilla JS frontend, Canvas API ile dinamik rapor üretimi.",
      highlights: [
        "Python tabanlı AI backend servisi",
        "Vanilla JS ile framework'süz performans",
        "Canvas API ile dinamik PNG rapor üretimi",
      ],
      tech: ["Python", "Vanilla JS", "REST API", "Canvas API"],
      image: "/projects/plant-ai.png",
      accent: "#F59E0B",
      links: { live: null, github: null },
    },
    {
      id: "tuda",
      title: "Tuda Creative Studio",
      category: "Web Platform",
      role: "Frontend Developer",
      company: "Tuda Creative",
      year: "2023",
      description:
        "Kocaeli ve global pazarlara hizmet veren dijital ajans için kurumsal web platformu. Teknik SEO stratejileri, Pagespeed ve UI/UX optimizasyonları ile yüksek performanslı kullanıcı deneyimi.",
      highlights: [
        "WordPress altyapısında modern web",
        "Teknik SEO ve Pagespeed optimizasyonu",
        "Dinamik portföy yönetimi",
      ],
      tech: ["WordPress", "PHP", "SEO", "UI/UX"],
      image: "/projects/tuda.png",
      accent: "#EC4899",
      links: { live: null, github: null },
    },
    {
      id: "tokenbee",
      title: "TokenBee",
      category: "FinTech",
      role: "Frontend Developer",
      company: "Gamino Teknoloji",
      year: "2024",
      description:
        "Kripto para odaklı e-ticaret platformu. Yenilikçi finansal teknolojiler alanında frontend geliştirme ve canlıya alma süreci.",
      highlights: [
        "Kripto e-ticaret arayüzü",
        "Karmaşık state management",
        "Canlıya alma süreci",
      ],
      tech: ["React", "Redux", "Tailwind", "Axios"],
      image: "/projects/tokenbee.png",
      accent: "#F97316",
      links: { live: null, github: null },
    },
  ],
};

// ─── Experience ───────────────────────────────────────────────────────────────

export const experienceData: ExperienceData = {
  heading: "Deneyim",
  subtitle: "Bugüne kadar yer aldığım pozisyonlar",
  items: [
    {
      company: "BS Pazarlama ve Makina Sanayi Ticaret A.Ş.",
      role: "Full Stack Developer",
      period: "09/2025 – Present",
      location: "Sakarya, Türkiye (Hybrid)",
      description:
        "Propex ERP backend mimarisi, SATSO AI ChatBot frontend lead'liği, kurumsal e-ticaret entegrasyonları.",
      tech: [".NET", "React", "TypeScript", "MS SQL"],
    },
    {
      company: "Gamino Teknoloji Yatırım A.Ş.",
      role: "Frontend & Mobile Developer",
      period: "10/2023 – 08/2025",
      location: "Kocaeli, Türkiye (On-site)",
      description:
        "Propex ERP web ve mobil frontend mimarisi sıfırdan geliştirildi. TokenBee kripto e-ticaret platformu canlıya alındı.",
      tech: ["React", "React Native", "Redux", "Tailwind"],
    },
    {
      company: "Arabuleu",
      role: "React Frontend Developer",
      period: "04/2022 – 03/2023",
      location: "France (Remote)",
      description:
        "Fransa merkezli proje için tamamen uzaktan, uluslararası ekiple modern ve responsive web uygulamaları geliştirildi.",
      tech: ["React", "Redux", "SASS", "Bootstrap"],
    },
  ],
};

// ─── Project helpers ──────────────────────────────────────────────────────────

export const featuredProjects = projectsData.items.slice(0, 3);
export const otherProjects = projectsData.items.slice(3);

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contactData: ContactData = {
  heading: "İletişim",
  label: "05",
  intro: "Yeni projeler, fırsatlar veya sadece bir kahve sohbeti için açığım.",
  email: "emretirabzonlu@gmail.com",
  phone: "+90 542 392 16 02",
  location: "Kocaeli, Türkiye",
  social: [
    { name: "GitHub", href: "https://github.com/emretirabzonlu", icon: "github" },
    { name: "LinkedIn", href: "https://linkedin.com/in/emretirabzonlu", icon: "linkedin" },
    { name: "Mail", href: "mailto:emretirabzonlu@gmail.com", icon: "mail" },
  ],
};
