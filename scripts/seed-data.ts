export const portfolioData = [
  // ── Identity & Summary ───────────────────────────────────────────────────
  `I am Mounika Murugonda, a Senior Frontend Engineer with 13+ years of experience delivering scalable, high-performance, user-centric enterprise applications across healthcare, finance, compliance, and enterprise SaaS domains. I have expert-level proficiency in React, Next.js, Angular, TypeScript, and modern JavaScript (ES6+), building design-system-driven, WCAG-compliant, cross-browser applications. You can reach me at iammounikamurugonda@gmail.com. My portfolio is at mounikamurugonda.vercel.app and my LinkedIn is linkedin.com/in/murugondamounika.`,

  `I do hands-on AI-powered frontend development: RAG application integration, LLM function calling, and AI-assisted engineering workflows using Claude and GitHub Copilot. I have proven expertise in Micro-Frontend architecture (Module Federation, Nx Monorepo), advanced state management across client, global, and server state (Redux, Zustand, NgRx, TanStack Query), REST/GraphQL APIs, secure authentication (Azure MSAL, OAuth2), performance optimization, and CI/CD on Azure DevOps with cloud deployments across Azure, AWS, and Vercel. I have a track record of technical leadership: owning frontend architecture end to end, leading and mentoring teams, enforcing coding standards, and shipping production-grade solutions in Agile environments.`,

  `Throughout my career I have worked as a consultant/contractor placed by IT services firms, delivering projects for their clients, including Complyia, PwC, HFMA, Lenovo, Deloitte, WTP Advisors, PCC Technology, and AT&T Business Solutions.`,

  // ── Technical Skills ─────────────────────────────────────────────────────
  `My core frontend skills include HTML5, CSS3, SCSS/SASS, JavaScript (ES6+), TypeScript, RxJS, Responsive Design, Cross-Browser Compatibility, WCAG Accessibility, and SEO.`,

  `My frameworks and architecture expertise includes React, React 18, Next.js (SSR/SSG/ISR), Angular, AngularJS, Micro-Frontends with Module Federation, Nx Monorepo, and TurboRepo.`,

  `My AI and LLM skills include RAG Application Integration, LLM Function Calling, AI-Assisted Workflows, Claude, GitHub Copilot, and AI-Assisted Development.`,

  `My UI and styling tools include Figma, Tailwind CSS, ShadCN UI, Radix UI, MUI, Angular Material, Bootstrap, Design Systems, and Storybook.`,

  `For state management I use Redux (RTK), NgRx, Zustand, TanStack Query (React Query), and Context API. For APIs and auth: REST, GraphQL, OAuth2, JWT, NextAuth, and Azure MSAL.`,

  `My backend and database experience includes Node.js, Express.js, Prisma, MongoDB, Supabase, and Dataverse.`,

  `My testing and quality stack: Jest, Vitest, Playwright, Cypress, React Testing Library, ESLint, Prettier, Husky, and Chrome DevTools. My CI/CD and build stack: Azure DevOps, Nx Affected Builds, Vite, Webpack, Docker, Git, and GitHub. Cloud deployments on Azure, AWS, Vercel, and Netlify.`,

  `For data visualization I use D3.js, Recharts, AG Grid, yFiles, Power BI, and Highcharts. I follow Agile/Scrum and Component-Driven Development methodologies.`,

  // ── Current Role: Complyia ───────────────────────────────────────────────
  `Since October 2024 I have been a Senior Frontend Engineer for the client Complyia (Oakbrook Terrace, Illinois), working on Complyia's enterprise compliance and tax-provision platform. I am part of the frontend team and contribute across architecture, build system, CI/CD, testing strategy, design system, and delivery. I contributed to architecting the platform as an Nx monorepo with Micro-Frontend architecture (Module Federation), chosen over a single-build monolith so 7 applications deploy independently, removing cross-team release coordination.`,

  `At Complyia I integrated v1 of the platform's RAG application on the frontend: streaming chat UI, citation rendering, response handling, and LLM function-calling integration for structured AI interactions. I also built AI-integrated workflows in the Data Manager module, embedding LLM-driven features directly into user-facing data operations.`,

  `At Complyia I developed a shared design-system library of 55+ reusable components (47 core UI primitives and composites plus 10 domain modules including org chart, data grid, PDF viewer, and virtual select) using React 18, TypeScript, Tailwind CSS, ShadCN UI, and Radix UI, documented in Storybook and consumed across all 7 apps. I built data-dense dashboards and visualizations using D3.js, Recharts, and AG Grid Enterprise for large compliance datasets and reporting views.`,

  `At Complyia I implemented layered state management: Zustand for global/UI state and TanStack Query for server state with caching and synchronization. I set up CI/CD pipelines in Azure DevOps with Nx affected-only builds, automated lint/test gates, and per-PR preview deployments. I helped establish the team's testing strategy: unit tests with Vitest/Jest, E2E suites with Playwright running in CI, and AI-assisted test generation (Claude, Copilot) reducing unit-test writing time by 60%.`,

  `At Complyia I enforced coding standards across the team: ESLint + Prettier + Husky pre-commit hooks, PR review checklist, and shared conventions. I integrated Azure MSAL authentication with role-based access control, reduced bundle size by 30% via code splitting, lazy loading, and caching strategies, and mentored fellow engineers on React patterns, state management, and monorepo workflows while participating in architectural decisions and code reviews. Tech stack: Nx Workspace, Micro-Frontends (Module Federation), React 18, TypeScript, Vite, Tailwind CSS, ShadCN UI, Radix UI, AG Grid Enterprise, D3.js, Recharts, Zustand, TanStack Query, Azure MSAL, RAG/LLM Integration, Claude, GitHub Copilot, Playwright, Vitest, Jest, Storybook, Zod, React Hook Form, Azure DevOps, Docusaurus.`,

  // ── PwC ──────────────────────────────────────────────────────────────────
  `From February 2023 to January 2024 I was a Senior Frontend Developer for the client PwC (PricewaterhouseCoopers) in Hyderabad, India, a continuous 12-month engagement delivering two enterprise platforms: Cloud for Tax (tax compliance) and Entity Operations (legal entity management).`,

  `On PwC Cloud for Tax I led frontend development of an enterprise tax-compliance platform using React.js, Next.js, and TypeScript, applying SSR, SSG, ISR, and API routes for high-performance tax workflows. I built custom PCF (Power Apps Component Framework) controls, Power Pages portals with Liquid templates, and reusable form and data-grid components integrated with Dataverse. I built yFiles graph visualizations to render complex entity-relationship structures for tax modeling, and developed interactive dashboards with Power BI embedding and Redux state management, applying Next.js code splitting and image optimization.`,

  `On PwC Entity Operations I built and shipped a production legal entity management application full stack: React.js + Redux frontend with REST and GraphQL APIs designed and implemented using Node.js, Express, and Prisma. I designed the API layer with structured architecture, validation, and standardized error handling, and managed database schema evolution in the live production database using Prisma migrations, safely introducing and retiring columns without disrupting existing workflows. I ensured reliability with Cypress unit and E2E test coverage, deployed via Docker and Azure.`,

  // ── HFMA ─────────────────────────────────────────────────────────────────
  `From January 2020 to February 2023 I was a Senior Frontend Developer for the client HFMA (Healthcare Financial Management Association). I designed and developed MapApp, a healthcare-finance enterprise application, owning frontend architecture and delivery across a 3-year engagement. I architected a modular Angular 12 + TypeScript application with role-based authentication and authorization (Guards, Interceptors), structured into 10 lazy-loaded feature modules. I implemented NgRx for predictable state management and RxJS for reactive data streams, reduced application load time by 40% through lazy loading, change-detection tuning, and bundle optimization, and ensured reliability with Cypress testing. Tech: Angular 12, TypeScript, HTML5, CSS3, SCSS, Bootstrap, NgRx, RxJS, REST APIs, Cypress.`,

  // ── Lenovo ───────────────────────────────────────────────────────────────
  `From May 2018 to January 2020 I was a Senior UI Developer for the client Lenovo, building Lenovo AirStack, a scalable SaaS UI platform, with reusable Angular Material components and custom theming. I developed enterprise-scale frontend applications using Angular 6, TypeScript, HTML5, and CSS3, and optimized frontend performance, stability, and maintainability, supporting delivery through Git, Docker, and CI/CD pipelines on AWS.`,

  // ── Deloitte ─────────────────────────────────────────────────────────────
  `From March 2017 to March 2018 I was a UI/UX Developer for the client Deloitte. I designed and developed the Section 987 tax visualization dashboard using Angular and Highcharts: dynamic reusable components, interactive graphs, and data-heavy grids with cross-browser compatibility and WCAG compliance. I collaborated with tax subject matter experts, business analysts, and backend developers.`,

  // ── WTP Advisors ─────────────────────────────────────────────────────────
  `From March 2016 to March 2017 I was a UI/UX Developer for the client WTP Advisors. I designed and developed the Modernized Processing System (MPS), a financial application with responsive, pixel-perfect, SEO-optimized interfaces using HTML5, CSS3, and AngularJS, including reusable components and interactive UI elements for high-traffic workflows.`,

  // ── Earlier Experience ────────────────────────────────────────────────────
  `From January 2015 to March 2016 I was a UI/UX Developer for the client PCC Technology Inc, translating wireframes and high-fidelity mockups into responsive interfaces for a government Business Services platform using HTML, CSS, Bootstrap, JavaScript, and jQuery. From September 2012 to October 2014 I was a Web Designer for the client AT&T Business Solutions, designing and developing a suite of responsive, SEO-optimized business websites with custom WordPress themes built from scratch.`,

  // ── Education ────────────────────────────────────────────────────────────
  `I have a Bachelor's Degree in BA (Applied Mathematics & Statistics) from Osmania University (2015) and a Certification in Multimedia from Arena Animations (2012).`,

  // ── AI & Portfolio ───────────────────────────────────────────────────────
  `I am passionate about AI-integrated frontend development. I have built RAG applications with streaming chat UIs, LLM function-calling integrations, and AI-assisted engineering workflows using Claude and GitHub Copilot. This portfolio itself is an AI-powered experience built with React, Vite, Framer Motion, LangChain, and Sarvam AI.`,

  `One of my personal projects is UtilToolkits (utiltoolkits.com), a free developer toolbox with 95+ browser-based utilities built with Next.js, TypeScript, and Tailwind CSS, deployed on Vercel.`,

  // ── Beyond Code & Interests ───────────────────────────────────────────────
  `Beyond code, I am a creative individual who enjoys drawing, pencil shading, and painting. I host the TopCartoonCharacters YouTube channel where I showcase my character art.`,

  `I am a content creator on YouTube, managing two channels: TopCartoonCharacters (focused on digital art and character sketches) and TechEscaper (focused on frontend development tutorials and tech insights).`,

  `I am currently exploring AI tools and coding-powered automation to build and launch my own products. I also enjoy learning the piano, keep a personal diary for reflection, and go swimming for fitness and mental clarity.`,

  `I am a very fast learner because I started my career as a web designer and I am constantly upgrading my skills and moving to new roles.`,
];
