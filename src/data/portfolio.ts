// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for the portfolio. One identity: Gameplay Programmer.
// Add a project, resume variant, or a skill = single push.
// ─────────────────────────────────────────────────────────────────────────────

export interface ProjectMetrics {
  type: string;
  platform: string;
  engine: string;
  language: string;
  teamSize: string;
  devTime: string;
  status: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  featured?: boolean;
  tags: string[]; // drives filter bar: unity, unreal, 2d, 3d, game-jam, in-development
  tech: string[];
  features: string[];
  projectImpact: { problem: string; solution: string };
  metrics: ProjectMetrics;
  challenges: { challenge: string; solution: string }[];
  learnings: string[];
  gallery: {
    gameplay: string[];
    development: string[];
    editor: string[];
    flowDiagram?: string;
  };
  links: {
    itch?: string;
    itchEmbedUrl?: string;
    github?: string;
    details?: string;
  };
  media?: ProjectMedia;
}

export interface ProjectMedia {
  banner?: string;
  screenshot?: string;
  gif?: string;
  video?: string;
  engineIcon?: string;
}

export interface GameplayMechanic {
  id: string;
  title: string;
  engine: "Unity" | "Unreal Engine";
  description: string;
  media: { preview?: string; gif?: string; video?: string };
  links?: { github?: string; demo?: string };
  // Optional, future-proof fields — rendered only when present:
  difficulty?: string;
  engineVersion?: string;
  category?: string;
  docsUrl?: string;
  articleUrl?: string;
  sourceUrl?: string;
}

export interface BackgroundImages {
  hero: string;
  projects: string;
  mechanics: string;
  skills: string;
  about: string;
  activity: string;
  contact: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: string; // lucide icon name
  items: { name: string }[];
}

export interface PortfolioConfig {
  profile: {
    name: string;
    tagline: string;
    email: string;
    linkedin: string;
    github: string;
    photo: string;
    location: string;
    availability: string;
  };
  /** The single resume surfaced everywhere in the UI. */
  resume: string;
  /** Internal-only resume variants kept for future use. NOT referenced by any component. */
  resumeVariants: {
    unity: string;
    unreal: string;
    gameplay: string;
    software: string;
  };
  hero: {
    defaultHeadline: string;
    defaultSubheadline: string;
    description: string;
  };
  highlights: { icon: string; label: string }[];
  quickView: {
    experience: string;
    projects: string;
    gameJams: string;
    primaryEngine: string;
    languages: string[];
    location: string;
    availability: string;
  };
  stats: { label: string; value: string; suffix?: string }[];
  featuredProjectId: string;
  currentlyBuilding: {
    title: string;
    subtitle: string;
    description: string;
    status: string;
    progress: number;
  };
  projectFilters: { id: string; label: string }[];
  projects: Project[];
  showcase: {
    gifs: { src: string; caption: string }[];
    videos: { src: string; poster?: string; caption: string }[];
    screenshots: { src: string; caption: string }[];
  };
  skillGroups: SkillGroup[];
  learningJourney: { title: string; description: string; icon: string }[];
  process: { label: string; icon: string; description: string }[];
  timeline: { year: string; title: string; description: string }[];
  github: { username: string };
  about: { bio: string; education: { degree: string; school: string; detail?: string }[] };
  gameplayMechanics: GameplayMechanic[];
  backgrounds: BackgroundImages;
}

export const portfolio: PortfolioConfig = {
  profile: {
    name: "Abikarthick G",
    tagline: "Gameplay Programmer · Unity · Unreal Engine",
    email: "Abikarthick.gdev@gmail.com",
    linkedin: "https://linkedin.com/in/abikarthick-g",
    github: "https://github.com/ABIKARTHICK-412",
    photo: "/avatar.jpg",
    location: "Tamil Nadu, India",
    availability: "Open to Internship & Entry-Level Opportunities",
  },
  resume: "/resume-gameplay.pdf",
  resumeVariants: {
    unity: "/resume-unity.pdf",
    unreal: "/resume-unreal.pdf",
    gameplay: "/resume-gameplay.pdf",
    software: "/resume-software.pdf",
  },
  hero: {
    defaultHeadline: "Gameplay Programmer",
    defaultSubheadline:
      "Building polished gameplay systems and interactive experiences using Unity and Unreal Engine.",
    description:
      "Gameplay programming, physics, AI, game feel, systems design, and technical problem solving — building games that feel right from prototype to release.",
  },
  highlights: [
    { icon: "Gamepad2", label: "3+ Games Developed" },
    { icon: "Trophy", label: "Game Jam Participant" },
    { icon: "Zap", label: "Unity & Unreal Engine" },
    { icon: "Construction", label: "Currently Building StarStuff" },
  ],
  quickView: {
    experience: "1.5+ Years",
    projects: "3+",
    gameJams: "1",
    primaryEngine: "Unity",
    languages: ["C#", "C++", "Java"],
    location: "Tamil Nadu, India",
    availability: "Open to Internship & Entry-Level Opportunities",
  },
  stats: [
    { label: "Completed Games", value: "3", suffix: "+" },
    { label: "Years with Unity", value: "1.5", suffix: "+" },
    { label: "Game Jams", value: "1" },
    { label: "GitHub Contributions", value: "100", suffix: "+" },
  ],
  featuredProjectId: "charge-collector",
  currentlyBuilding: {
    title: "StarStuff",
    subtitle: "2D Physics Puzzle Platformer",
    description:
      "An original 2D physics puzzle platformer built in Unity. Designing custom physics interactions, level flow, and a polished feel from prototype to release.",
    status: "Active Development",
    progress: 35,
  },
  projectFilters: [
    { id: "all", label: "All" },
    { id: "unity", label: "Unity" },
    { id: "unreal", label: "Unreal Engine" },
    { id: "in-development", label: "In Development" },
    { id: "game-jam", label: "Game Jam" },
  ],
  projects: [
    {
      id: "charge-collector",
      title: "Charge Collector",
      category: "3D Endless Runner",
      description:
        "A fast-paced 3D endless runner created for SCORE SPACE JAM #33. Dodge obstacles, collect charges, and rack up a high score as difficulty ramps.",
      featured: true,
      tags: ["unity", "3d", "game-jam"],
      tech: ["Unity", "C#", "Git", "Blender"],
      features: [
        "Procedural obstacle spawning",
        "Score-based difficulty scaling",
        "Object-pooled obstacles & collectibles",
        "Juicy SFX + camera shake",
      ],
      projectImpact: {
        problem: "Create an endless runner with increasing difficulty in 72 hours.",
        solution:
          "Implemented procedural obstacle spawning and score-based progression with pooled GameObjects.",
      },
      metrics: {
        type: "3D Endless Runner",
        platform: "PC / WebGL",
        engine: "Unity",
        language: "C#",
        teamSize: "Solo",
        devTime: "72 Hours",
        status: "Completed",
      },
      challenges: [
        {
          challenge: "Infinite obstacle generation without GC spikes.",
          solution: "Object pooling system with pre-warmed obstacle pools.",
        },
        {
          challenge: "Keeping difficulty fair as speed scales.",
          solution: "Score-driven spawner weights & cooldown windows.",
        },
      ],
      learnings: [
        "Object Pooling",
        "State Machines",
        "Physics Systems",
        "UI Architecture",
        "Git Workflow",
      ],
      gallery: { gameplay: [], development: [], editor: [] },
      links: {
        itch: "https://abikarthick-412.itch.io/charge-collector",
        github: "https://github.com/ABIKARTHICK-412",
      },
    },
    {
      id: "starstuff",
      title: "StarStuff",
      category: "2D Physics Puzzle Platformer",
      description:
        "Original 2D physics puzzle platformer in active development. Custom physics interactions, level design, and gamefeel polish from prototype to release.",
      tags: ["unity", "2d", "in-development"],
      tech: ["Unity", "C#", "Git", "Aseprite"],
      features: [
        "Custom 2D physics interactions",
        "Hand-crafted puzzle levels",
        "Modular gameplay systems",
        "Iterative playtesting loop",
      ],
      projectImpact: {
        problem: "Design an original puzzle platformer that teaches mechanics without text.",
        solution:
          "Built modular physics primitives the player learns through play, with level layout driving discovery.",
      },
      metrics: {
        type: "2D Puzzle Platformer",
        platform: "PC",
        engine: "Unity",
        language: "C#",
        teamSize: "Solo",
        devTime: "Ongoing",
        status: "In Development",
      },
      challenges: [
        {
          challenge: "Reliable 2D physics behaviour across framerates.",
          solution: "FixedUpdate-driven physics step with interpolated visuals.",
        },
      ],
      learnings: ["Custom Physics", "Level Design", "Iterative Playtesting"],
      gallery: { gameplay: [], development: [], editor: [] },
      links: { github: "https://github.com/ABIKARTHICK-412" },
    },
    {
      id: "flappy-bird",
      title: "Flappy Bird Clone",
      category: "2D Arcade",
      description:
        "A faithful Flappy Bird clone in Unity — pipe spawning, scoring, and game-over flow. Built to study tight arcade loops.",
      tags: ["unity", "2d"],
      tech: ["Unity", "C#", "Git"],
      features: ["Procedural pipe spawning", "Score tracking & high score", "Restart flow"],
      projectImpact: {
        problem: "Recreate Flappy Bird's tight one-button feel.",
        solution:
          "Calibrated jump impulse + pipe spacing so the difficulty curve matches the original.",
      },
      metrics: {
        type: "2D Arcade",
        platform: "PC / WebGL",
        engine: "Unity",
        language: "C#",
        teamSize: "Solo",
        devTime: "1 Week",
        status: "Completed",
      },
      challenges: [
        {
          challenge: "Pipe spacing felt inconsistent at higher speeds.",
          solution: "Time-based spawner with fixed horizontal gap calculation.",
        },
      ],
      learnings: ["Gamefeel Tuning", "Scoring Systems", "Scene Flow"],
      gallery: { gameplay: [], development: [], editor: [] },
      links: { github: "https://github.com/ABIKARTHICK-412" },
    },
    {
      id: "pong",
      title: "Pong Clone",
      category: "2D Arcade",
      description:
        "Classic Pong built from scratch in Unity. Local 2-player, paddle physics, and a clean scoring HUD.",
      tags: ["unity", "2d"],
      tech: ["Unity", "C#", "Git"],
      features: ["Two-player local", "Angle-based paddle reflection", "Score HUD"],
      projectImpact: {
        problem: "Build a foundational arcade game from zero.",
        solution: "Implemented paddle reflection math and a deterministic ball reset routine.",
      },
      metrics: {
        type: "2D Arcade",
        platform: "PC",
        engine: "Unity",
        language: "C#",
        teamSize: "Solo",
        devTime: "3 Days",
        status: "Completed",
      },
      challenges: [
        {
          challenge: "Ball reflection felt random.",
          solution: "Mapped contact point to outgoing angle for predictable bounces.",
        },
      ],
      learnings: ["2D Physics", "Input Handling", "UI Basics"],
      gallery: { gameplay: [], development: [], editor: [] },
      links: { github: "https://github.com/ABIKARTHICK-412" },
    },
  ],
  showcase: {
    gifs: [],
    videos: [],
    screenshots: [],
  },
  skillGroups: [
    {
      id: "game-engines",
      title: "Game Engines",
      icon: "Gamepad2",
      items: [{ name: "Unity" }, { name: "Unreal Engine" }],
    },
    {
      id: "programming-languages",
      title: "Programming Languages",
      icon: "Code2",
      items: [
        { name: "C#" },
        { name: "C++" },
        { name: "Java" },
        { name: "OOP" },
        { name: "Data Structures" },
      ],
    },
    {
      id: "gameplay-programming",
      title: "Gameplay Programming",
      icon: "Cpu",
      items: [
        { name: "Gameplay Systems" },
        { name: "Physics" },
        { name: "State Machines" },
        { name: "AI Behaviors" },
        { name: "Game Feel" },
        { name: "2D & 3D" },
      ],
    },
    {
      id: "tools",
      title: "Tools",
      icon: "Wrench",
      items: [
        { name: "Git" },
        { name: "Diversion" },
        { name: "UVCS" },
        { name: "Blender" },
        { name: "Visual Studio" },
        { name: "Rider" },
      ],
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      icon: "Lightbulb",
      items: [
        { name: "Algorithms" },
        { name: "Debugging" },
        { name: "Optimization" },
        { name: "Systems Thinking" },
      ],
    },
  ],
  learningJourney: [
    {
      title: "Unity Learn",
      description: "Self-paced Unity learning across gameplay, UI, and physics.",
      icon: "BookOpen",
    },
    {
      title: "Game Jam",
      description: "Shipped Charge Collector in 72 hours for SCORE SPACE JAM #33.",
      icon: "Trophy",
    },
    {
      title: "Self Learning",
      description: "Studying gameplay programming patterns and engine internals.",
      icon: "Brain",
    },
    {
      title: "Continuous Development",
      description: "Building StarStuff while expanding into Unreal Engine 5 & C++.",
      icon: "Rocket",
    },
  ],
  process: [
    { label: "Concept", icon: "Lightbulb", description: "Idea & pillars" },
    { label: "Design", icon: "PenTool", description: "Mechanics & flow" },
    { label: "Prototype", icon: "Boxes", description: "Greybox & feel" },
    { label: "Develop", icon: "Code2", description: "Systems & content" },
    { label: "Test", icon: "Bug", description: "Iterate from feedback" },
    { label: "Polish", icon: "Sparkles", description: "Juice & performance" },
    { label: "Release", icon: "Rocket", description: "Ship it" },
  ],
  timeline: [
    {
      year: "2024",
      title: "Started Unity Journey",
      description: "Built first 2D games — Pong and Flappy Bird clones.",
    },
    {
      year: "2025",
      title: "First Game Jam",
      description: "Shipped Charge Collector in 72 hours for SCORE SPACE JAM #33.",
    },
    {
      year: "2026",
      title: "Building StarStuff",
      description: "Original 2D physics puzzle platformer in active development.",
    },
  ],
  github: { username: "ABIKARTHICK-412" },
  about: {
    bio: "I'm Abikarthick G — a Gameplay Programmer building games in Unity and currently expanding into Unreal Engine 5 with C++. My focus is on gameplay architecture, physics, AI behaviors, optimization, and the small details that make systems feel responsive. Unity is where I learned to ship — from prototype to playable build — and Unreal is the next step in the same continuous path: applying the same engineering principles to a larger toolset.",
    education: [
      {
        degree: "Advanced Diploma in Game Design and Development",
        school: "Monolith Research and Training Labs Pvt Ltd.",
      },
      {
        degree: "B.Tech Information Technology",
        school: "Mailam Engineering College",
        detail: "CGPA: 8.1",
      },
    ],
  },
  // ── Background images (placeholders — drop files into public/bg/) ──────────
  backgrounds: {
    hero: "/bg/hero.jpg",
    projects: "/bg/projects.jpg",
    mechanics: "/bg/mechanics.jpg",
    skills: "/bg/skills.jpg",
    about: "/bg/about.jpg",
    activity: "/bg/activity.jpg",
    contact: "/bg/contact.jpg",
  },
  // ── Gameplay mechanics carousel (data-driven; add more by appending) ───────
  gameplayMechanics: [
    // TODO: add media (preview/gif/video) and links (github/demo) as systems ship.
    {
      id: "wall-jump",
      title: "Wall Jump",
      engine: "Unity",
      description: "Kinematic wall detection with coyote-time and variable jump impulse for responsive platforming.",
      media: {},
    },
    {
      id: "third-person-shooting",
      title: "Third Person Shooting",
      engine: "Unreal Engine",
      description: "Over-the-shoulder aim, hitscan + projectile weapons, and animation-driven recoil.",
      media: {},
    },
    {
      id: "enemy-ai",
      title: "Enemy AI",
      engine: "Unity",
      description: "Behavior-tree driven NPCs with perception, patrol, and combat states.",
      media: {},
    },
    {
      id: "dialogue-system",
      title: "Dialogue System",
      engine: "Unity",
      description: "Branching dialogue with conditions, variables, and typewriter UI.",
      media: {},
    },
    {
      id: "inventory-system",
      title: "Inventory System",
      engine: "Unity",
      description: "Grid-based inventory with stacking, drag-and-drop, and ScriptableObject items.",
      media: {},
    },
    {
      id: "camera-controller",
      title: "Camera Controller",
      engine: "Unity",
      description: "Cinemachine-style follow with damping, look-ahead, and collision avoidance.",
      media: {},
    },
    {
      id: "object-pooling",
      title: "Object Pooling",
      engine: "Unity",
      description: "Pre-warmed pools to eliminate GC spikes during heavy spawn loads.",
      media: {},
    },
    {
      id: "save-system",
      title: "Save System",
      engine: "Unity",
      description: "JSON-based save/load with versioning and slot management.",
      media: {},
    },
    {
      id: "state-machine",
      title: "State Machine",
      engine: "Unity",
      description: "Generic FSM with typed transitions for player, AI, and UI flows.",
      media: {},
    },
    {
      id: "turn-based-grid",
      title: "Turn Based Grid System",
      engine: "Unity",
      description: "Tile grid with pathfinding, action points, and turn queue.",
      media: {},
    },
    {
      id: "procedural-generation",
      title: "Procedural Generation",
      engine: "Unity",
      description: "Seeded room/level generation with constraint-based layout rules.",
      media: {},
    },
    {
      id: "input-system",
      title: "Input System",
      engine: "Unity",
      description: "Unity Input System bindings with rebinding UI and device switching.",
      media: {},
    },
    {
      id: "animation-controller",
      title: "Animation Controller",
      engine: "Unreal Engine",
      description: "Animation Blueprint with state machines, blend spaces, and root motion.",
      media: {},
    },
  ],
};
