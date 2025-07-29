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
  LucideIcon,
  Video,
  Type,
  Mail,
  Smartphone,
  Store,
  Briefcase,
  Lightbulb,
  Building,
  MousePointerClick,
  Group,
  Cog,
  Landmark,
  Layers3,
} from 'lucide-react';

interface Service {
  title: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  isExternal?: boolean;
}

export const services: Service[] = [
  {
    title: 'AI Dashboard',
    slug: 'ai-dashboard',
    icon: BrainCircuit,
    description: 'Intelligent, real-time data visualization and analytics platforms.',
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: Megaphone,
    description: 'Comprehensive strategies to boost your online presence and reach.',
  },
  {
    title: 'Google Ads',
    slug: 'google-ads',
    icon: Target,
    description: 'Targeted ad campaigns that deliver measurable results and ROI.',
  },
  {
    title: 'SEO Optimization',
    slug: 'seo-optimization',
    icon: Search,
    description: 'Enhancing your visibility on search engines to attract organic traffic.',
  },
  {
    title: 'Logo Creation',
    slug: 'logo-creation',
    icon: Palette,
    description: 'Crafting unique logos that resonate with your audience.',
  },
  {
    title: 'Affiliate Marketing',
    slug: 'affiliate-marketing',
    icon: Share2,
    description: 'Building powerful affiliate networks to drive sales and partnerships.',
  },
  {
    title: 'Data Analysis',
    slug: 'data-analysis',
    icon: BarChart3,
    description: 'Uncovering actionable insights from your data to inform decisions.',
  },
  {
    title: 'Social Media Management',
    slug: 'social-media-management',
    icon: Users,
    description: 'Engaging content and community management across all platforms.',
  },
  {
    title: '3D Design',
    slug: '3d-design',
    icon: Cuboid,
    description: 'Bringing your ideas to life with stunning 3D visuals.',
  },
   {
    title: '3D Animation',
    slug: '3d-animation',
    icon: Layers3,
    description: 'Creating captivating and dynamic 3D animations for your projects.',
  },
  {
    title: 'Brochure Creation',
    slug: 'brochure-creation',
    icon: FileText,
    description: 'Designing professional and compelling marketing materials.',
  },
  {
    title: 'Web Development',
    slug: 'web-development',
    icon: Code2,
    description: 'Building fast, responsive, and secure websites for modern businesses.',
  },
  {
    title: 'WhatsApp Chatbot',
    slug: 'whatsapp-chatbot',
    icon: Bot,
    description: 'Automating customer interactions with intelligent WhatsApp chatbots.',
  },
  {
    title: 'Video Editing',
    slug: 'video-editing',
    icon: Video,
    description: 'Professional video editing to make your content shine.',
  },
  {
    title: 'Content Writing / Copywriting',
    slug: 'content-writing',
    icon: Type,
    description: 'Compelling writing that captures your brand voice and converts.',
  },
  {
    title: 'Email Marketing Automation',
    slug: 'email-marketing-automation',
    icon: Mail,
    description: 'Automated email campaigns to nurture leads and retain customers.',
  },
  {
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    icon: MousePointerClick,
    description: 'Creating intuitive and beautiful user interfaces and experiences.',
  },
  {
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    icon: Smartphone,
    description: 'Custom mobile applications for iOS and Android platforms.',
  },
  {
    title: 'CRM Setup & Automation',
    slug: 'crm-setup-automation',
    icon: Cog,
    description: 'Implementing and automating CRM systems to streamline sales.',
  },
  {
    title: 'E-commerce Store Development',
    slug: 'ecommerce-store-development',
    icon: Store,
    description: 'Building robust and scalable online stores to sell your products.',
  },
  {
    title: 'Branding Package',
    slug: 'branding-package',
    icon: Briefcase,
    description: 'A complete branding solution from logo to brand guidelines.',
  },
  {
    title: 'Lead Generation Service',
    slug: 'lead-generation-service',
    icon: Lightbulb,
    description: 'Strategies and campaigns to fill your sales pipeline with quality leads.',
  },
  {
    title: 'Influencer Marketing Management',
    slug: 'influencer-marketing-management',
    icon: Group,
    description: 'Connecting your brand with influencers to reach new audiences.',
  },
  {
    title: 'AI Tools Setup & Consulting',
    slug: 'ai-tools-consulting',
    icon: BrainCircuit,
    description: 'Integrating AI tools and providing expert consulting for your business.',
  },
  {
    title: 'Real Estate Platform',
    slug: '/real-estate',
    icon: Building,
    description: 'Specialized digital services for the real estate sector.',
    isExternal: true,
  },
];

interface Project {
    title: string;
    image: string | null;
    hint: string;
    tags: string[];
    description: string;
    results: string;
}

export const projectTags = ["AI", "Marketing", "Design", "Web Dev"];

export const projects: Project[] = [
    {
        title: "AI Analytics for E-commerce",
        image: null,
        hint: "AI dashboard analytics",
        tags: ["AI", "Web Dev"],
        description: "A comprehensive AI platform for a major e-commerce client to track sales, predict trends, and analyze customer behavior in real-time.",
        results: "300% Increase in Traffic"
    },
    {
        title: "Global SEO Campaign",
        image: null,
        hint: "SEO analytics chart",
        tags: ["Marketing"],
        description: "Executed a multi-lingual SEO strategy for a SaaS company, resulting in top-tier rankings across international markets.",
        results: "400% Engagement Boost"
    },
    {
        title: "3D Product Animation",
        image: null,
        hint: "3D product rendering",
        tags: ["Design"],
        description: "Created a series of high-fidelity 3D product animations for a tech hardware launch, used in marketing and promotional materials.",
        results: "500% Follower Growth"
    },
     {
        title: "Corporate Rebranding",
        image: null,
        hint: "corporate branding design",
        tags: ["Design", "Marketing"],
        description: "Complete rebranding for a financial services firm, including a new logo, brand guidelines, and a suite of marketing collateral.",
        results: "98% Client Satisfaction"
    },
    {
        title: "Social Media Strategy",
        image: null,
        hint: "social media dashboard",
        tags: ["Marketing"],
        description: "Developed and managed a viral social media campaign for a consumer brand, significantly increasing followers and engagement.",
        results: "2x Brand Awareness"
    },
    {
        title: "Custom CRM Web App",
        image: null,
        hint: "web application interface",
        tags: ["Web Dev", "AI"],
        description: "Built a bespoke CRM application with AI-powered lead scoring and automation features to streamline the sales pipeline.",
        results: "50+ Projects Completed"
    }
];
