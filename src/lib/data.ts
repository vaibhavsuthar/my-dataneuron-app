import {
  BrainCircuit,
  Megaphone,
  Target,
  Search,
  Palette,
  Share2,
  BarChart3,
  Users,
  Cuboid,
  Code2,
  Bot,
  FileText,
  LucideIcon
} from 'lucide-react';

interface Service {
  title: string;
  slug: string;
  icon: LucideIcon;
  description: string;
}

export const services: Service[] = [
  {
    title: "AI Dashboard",
    slug: "ai-dashboard",
    icon: BrainCircuit,
    description: "Intelligent, real-time data visualization and analytics platforms.",
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    icon: Megaphone,
    description: "Comprehensive strategies to boost your online presence and reach.",
  },
  {
    title: "Google Ads",
    slug: "google-ads",
    icon: Target,
    description: "Targeted ad campaigns that deliver measurable results and ROI.",
  },
  {
    title: "SEO Optimization",
    slug: "seo-optimization",
    icon: Search,
    description: "Enhancing your visibility on search engines to attract organic traffic.",
  },
  {
    title: "Logo & Branding",
    slug: "logo-and-branding",
    icon: Palette,
    description: "Crafting unique brand identities that resonate with your audience.",
  },
  {
    title: "Affiliate Marketing",
    slug: "affiliate-marketing",
    icon: Share2,
    description: "Building powerful affiliate networks to drive sales and partnerships.",
  },
  {
    title: "Data Analysis",
    slug: "data-analysis",
    icon: BarChart3,
    description: "Uncovering actionable insights from your data to inform decisions.",
  },
  {
    title: "Social Media",
    slug: "social-media",
    icon: Users,
    description: "Engaging content and community management across all platforms.",
  },
  {
    title: "3D Design & Animation",
    slug: "3d-design-animation",
    icon: Cuboid,
    description: "Bringing your ideas to life with stunning 3D visuals and animations.",
  },
  {
    title: "Web Development",
    slug: "web-development",
    icon: Code2,
    description: "Building fast, responsive, and secure websites for modern businesses.",
  },
  {
    title: "WhatsApp Chatbot",
    slug: "whatsapp-chatbot",
    icon: Bot,
    description: "Automating customer interactions with intelligent WhatsApp chatbots.",
  },
  {
    title: "Brochure Creation",
    slug: "brochure-creation",
    icon: FileText,
    description: "Designing professional and compelling marketing materials.",
  },
];

interface Project {
    title: string;
    image: string;
    hint: string;
    tags: string[];
    description: string;
    results: string;
}

export const projectTags = ["AI", "Marketing", "Design", "Web Dev"];

export const projects: Project[] = [
    {
        title: "AI Analytics for E-commerce",
        image: "https://placehold.co/600x400.png",
        hint: "AI dashboard analytics",
        tags: ["AI", "Web Dev"],
        description: "A comprehensive AI platform for a major e-commerce client to track sales, predict trends, and analyze customer behavior in real-time.",
        results: "300% Increase in Traffic"
    },
    {
        title: "Global SEO Campaign",
        image: "https://placehold.co/600x400.png",
        hint: "SEO analytics chart",
        tags: ["Marketing"],
        description: "Executed a multi-lingual SEO strategy for a SaaS company, resulting in top-tier rankings across international markets.",
        results: "400% Engagement Boost"
    },
    {
        title: "3D Product Animation",
        image: "https://placehold.co/600x400.png",
        hint: "3D product rendering",
        tags: ["Design"],
        description: "Created a series of high-fidelity 3D product animations for a tech hardware launch, used in marketing and promotional materials.",
        results: "500% Follower Growth"
    },
     {
        title: "Corporate Rebranding",
        image: "https://placehold.co/600x400.png",
        hint: "corporate branding design",
        tags: ["Design", "Marketing"],
        description: "Complete rebranding for a financial services firm, including a new logo, brand guidelines, and a suite of marketing collateral.",
        results: "98% Client Satisfaction"
    },
    {
        title: "Social Media Strategy",
        image: "https://placehold.co/600x400.png",
        hint: "social media dashboard",
        tags: ["Marketing"],
        description: "Developed and managed a viral social media campaign for a consumer brand, significantly increasing followers and engagement.",
        results: "2x Brand Awareness"
    },
    {
        title: "Custom CRM Web App",
        image: "https://placehold.co/600x400.png",
        hint: "web application interface",
        tags: ["Web Dev", "AI"],
        description: "Built a bespoke CRM application with AI-powered lead scoring and automation features to streamline the sales pipeline.",
        results: "50+ Projects Completed"
    }
];
