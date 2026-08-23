import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profile.deleteMany();

  const profile = await prisma.profile.create({
    data: {
      fullName: 'Ilya Konyaev',
      title: 'Fullstack Engineer',
      location: 'Moscow, Russia',
      citizenship: 'Russia',
      email: 'uumkon@gmail.com',
      phone: '+7 (950) 482-04-17',
      telegram: '@localUumkon',
      englishLevel: 'B2 (Upper-Intermediate)',
      summary:
        'Backend-leaning fullstack engineer since 2022. Full development lifecycle experience: ' +
        'architecture, implementation, deployment, monitoring. Contributed to 5+ projects in teams ' +
        'of up to 10 people, including high-load systems (100,000+ RPS). Currently building this very ' +
        'card with Claude Code as a daily pair-programming tool.',
      skills: {
        create: [
          { name: 'TypeScript', category: 'core' },
          { name: 'Node.js', category: 'core' },
          { name: 'NestJS', category: 'core' },
          { name: 'React / Next.js', category: 'core' },
          { name: 'Go', category: 'core' },
          { name: 'PostgreSQL', category: 'infrastructure' },
          { name: 'Prisma', category: 'infrastructure' },
          { name: 'Redis', category: 'infrastructure' },
          { name: 'Kafka / NATS', category: 'infrastructure' },
          { name: 'ClickHouse', category: 'infrastructure' },
          { name: 'Docker / Kubernetes', category: 'infrastructure' },
          { name: 'GraphQL / gRPC / REST', category: 'infrastructure' },
          { name: 'Prometheus / Grafana', category: 'infrastructure' },
          { name: 'Git', category: 'tooling' },
          { name: 'Claude Code', category: 'tooling' },
          { name: 'bitcoinjs-lib / ethers.js', category: 'tooling' },
        ],
      },
      experiences: {
        create: [
          {
            company: 'Codd Tech',
            role: 'Middle+ Fullstack Engineer',
            location: 'Moscow',
            startDate: new Date('2023-09-01'),
            endDate: null,
            description:
              'Worked on 5+ projects with a combined user base of over 17,000,000 people.',
            achievements: [
              'Designed and built a fullstack platform for managing chatbot stores, owning the full development cycle from requirements to release and stakeholder communication',
              'Integrated an LLM assistant into a corporate portal: API layer, prompt orchestration, and access control for 3 key use cases',
              'Built crypto payment infrastructure with multi-chain deposits and withdrawals, including BTC and BNB/USDT integrations',
            ],
            stack: [
              'Node.js', 'NestJS', 'React.js', 'Next.js', 'TypeScript', 'PostgreSQL', 'Docker',
              'Kubernetes', 'REST', 'GraphQL', 'Redis', 'GitLab CI/CD', 'Prometheus/Grafana',
              'bitcoinjs-lib', 'ethers.js / web3 (EVM)', 'gRPC', 'ClickHouse', 'NATS', 'Kafka',
            ],
            order: 0,
          },
          {
            company: 'Baspro Group',
            role: 'Junior Node.js Developer',
            location: 'Tyumen',
            startDate: new Date('2022-07-01'),
            endDate: new Date('2023-09-01'),
            description: 'System integration, business and technology process automation, IT consulting.',
            achievements: [
              'Developed an API key system and RBAC to secure backend routes, plus an end-to-end password recovery flow',
              'Brought an eco-admin panel to production-ready state: deployment, JWT auth, and TMS with SEO support',
              'Optimized a high-load advertising service to handle ~100k RPS without performance degradation',
              'Developed the Bios module for streaming data into Oracle and PostgreSQL, automating import/export of LAS files and geophysical data',
              'Implemented data quality control, reducing manual work by 40%',
              'Built the backend for a corporate application: Keycloak auth, user data synchronization, and notification delivery across multiple external services',
            ],
            stack: ['Node.js', 'React Native', 'Oracle', 'Git'],
            order: 1,
          },
        ],
      },
    },
  });

  console.log(`Seeded profile #${profile.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
