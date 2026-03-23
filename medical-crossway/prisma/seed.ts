import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const adapter = new PrismaMariaDb({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASSWORD!,
  database: 'medical_crossway',
  connectionLimit: 5,
})

const prisma = new PrismaClient({ adapter })

const tasks = [
  {
    id: 'hs-grad',
    title: 'High school graduation',
    phase: 'HIGH_SCHOOL',
    description: 'Complete high school with strong GPA, especially in sciences.',
    requirements: [],
    nextTasks: ['undergrad-prereqs', 'extracurriculars'],
    parallelTasks: [],
    status: 'complete',
  },
  {
    id: 'undergrad-prereqs',
    title: 'Undergraduate prerequisites',
    phase: 'HIGH_SCHOOL',
    description: 'Complete required pre-med courses and aim for high GPA.',
    requirements: ['hs-grad'],
    nextTasks: ['mcat-prep'],
    parallelTasks: ['extracurriculars', 'research-exp'],
    status: 'complete',
  },
  {
    id: 'mcat-prep',
    title: 'MCAT preparation',
    phase: 'ENTRANCE_EXAM',
    description: 'Study for MCAT (3–6 months).',
    requirements: ['undergrad-prereqs'],
    nextTasks: ['mcat-exam'],
    parallelTasks: [],
    status: 'progress',
  },
  {
    id: 'mcat-exam',
    title: 'Take MCAT',
    phase: 'ENTRANCE_EXAM',
    description: 'Attempt MCAT exam.',
    requirements: ['mcat-prep'],
    nextTasks: ['med-application'],
    parallelTasks: [],
    status: 'todo',
  },
  {
    id: 'med-application',
    title: 'Medical school application',
    phase: 'MED_SCHOOL',
    description: 'Apply via AMCAS.',
    requirements: ['mcat-exam'],
    nextTasks: ['ms-year1-2'],
    parallelTasks: [],
    status: 'todo',
  },
]

async function main() {
  console.log('Seeding database...')

  // ✅ 1. Create country first
  await prisma.country.upsert({
    where: { code: 'us' },
    update: {},
    create: {
      code: 'us',
      name: 'United States',
    },
  })

  // ✅ 2. Insert tasks
  for (const t of tasks) {
    await prisma.task.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        title: t.title,
        phase: t.phase,
        description: t.description,
        status: t.status,

        countryCode: 'us', // ✅ REQUIRED FIX

        requirements: t.requirements,   // ✅ NO stringify
        nextTasks: t.nextTasks,
        parallelTasks: t.parallelTasks,
      },
    })
  }

  console.log(`Seeded ${tasks.length} tasks.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())