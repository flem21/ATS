const PipelineStage = {
  APPLIED: 'Applied',
  SCREENING: 'Screening',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  HIRED: 'Hired',
  REJECTED: 'Rejected',
};

const seedCandidates = [
  {
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    phone: '123-456-7890',
    role: 'Senior Frontend Engineer',
    avatarUrl: 'https://picsum.photos/seed/1/100',
    stage: PipelineStage.APPLIED,
    applicationDate: new Date('2023-10-01').toISOString(),
    notes: ['Strong portfolio with React projects.', 'Referred by John Doe.'],
    resumeText: `Alice Johnson - Senior Frontend Engineer\n\nExperience:\n- 5 years at TechCorp, building scalable UIs with React and TypeScript.\n- Led the migration of a legacy Backbone.js app to Next.js.\n\nSkills:\n- React, TypeScript, GraphQL, Next.js, Tailwind CSS, Web Performance Optimization.`
  },
  {
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    phone: '234-567-8901',
    role: 'Backend Developer',
    avatarUrl: 'https://picsum.photos/seed/2/100',
    stage: PipelineStage.SCREENING,
    applicationDate: new Date('2023-10-02').toISOString(),
    notes: ['Excellent system design knowledge demonstrated in screening call.'],
    resumeText: `Bob Williams - Backend Developer\n\nExperience:\n- 8 years of experience with Node.js, Express, and MongoDB.\n- Designed and implemented microservices architecture for a high-traffic e-commerce platform.\n\nSkills:\n- Node.js, Python, Go, Docker, Kubernetes, PostgreSQL, AWS.`
  },
  {
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    phone: '345-678-9012',
    role: 'Product Manager',
    avatarUrl: 'https://picsum.photos/seed/3/100',
    stage: PipelineStage.INTERVIEW,
    applicationDate: new Date('2023-09-28').toISOString(),
    notes: ['Great communication skills.', 'Has experience in B2B SaaS products.'],
    resumeText: `Charlie Brown - Product Manager\n\nSummary:\n- A data-driven Product Manager with a track record of launching successful products.\n- Expert in Agile methodologies, user story mapping, and market research.\n\nExperience:\n- Product Lead at Innovate Inc., increased user engagement by 25%.\n- Product Manager at StartupX, launched their flagship product.`
  },
    {
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    phone: '456-789-0123',
    role: 'UI/UX Designer',
    avatarUrl: 'https://picsum.photos/seed/4/100',
    stage: PipelineStage.OFFER,
    applicationDate: new Date('2023-09-25').toISOString(),
    notes: ['Exceptional portfolio. Team was very impressed with the design challenge solution.'],
    resumeText: `Diana Prince - UI/UX Designer\n\nPortfolio: designbydiana.com\n\nSummary:\n- Creative designer focused on user-centric and visually appealing interfaces.\n\nSkills:\n- Figma, Sketch, Adobe XD, Prototyping, User Research, Design Systems.`
  },
  {
    name: 'Ethan Hunt',
    email: 'ethan.h@example.com',
    phone: '567-890-1234',
    role: 'DevOps Engineer',
    avatarUrl: 'https://picsum.photos/seed/5/100',
    stage: PipelineStage.APPLIED,
    applicationDate: new Date('2023-10-05').toISOString(),
    notes: [],
    resumeText: `Ethan Hunt - DevOps Engineer\n\nSummary:\n- Expert in CI/CD pipelines, infrastructure as code, and cloud automation.\n\nSkills:\n- Jenkins, GitLab CI, Terraform, Ansible, AWS, GCP, Kubernetes.`
  },
   {
    name: 'Fiona Glenanne',
    email: 'fiona.g@example.com',
    phone: '678-901-2345',
    role: 'Senior Frontend Engineer',
    avatarUrl: 'https://picsum.photos/seed/6/100',
    stage: PipelineStage.INTERVIEW,
    applicationDate: new Date('2023-10-03').toISOString(),
    notes: ['Solid technical interview. Good problem-solving approach.'],
    resumeText: `Fiona Glenanne - Senior Frontend Engineer\n\nExperience:\n- 6 years working with Vue.js and Nuxt.js.\n- Passionate about accessibility and building inclusive web experiences.\n\nSkills:\n- Vue.js, Nuxt.js, TypeScript, State Management (Vuex/Pinia), Web Accessibility (WCAG).`
  }
];

module.exports = { seedCandidates };
