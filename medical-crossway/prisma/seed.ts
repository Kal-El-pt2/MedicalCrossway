import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const tasks = [
  {
    id: 'hs-grad',
    title: 'High school graduation',
    phase: 'premed',
    description: 'Complete high school with strong GPA, especially in sciences. Take AP Biology, AP Chemistry, and AP Calculus if available.',
    requirements:  [] as string[],
    nextTasks:     ['undergrad-prereqs', 'extracurriculars'],
    parallelTasks: [] as string[],
    status: 'complete',
  },
  {
    id: 'undergrad-prereqs',
    title: 'Undergraduate prerequisites',
    phase: 'premed',
    description: 'Complete required pre-med courses: Biology, General Chemistry, Organic Chemistry, Physics, Math/Statistics, and Biochemistry. Aim for 3.7+ GPA.',
    requirements:  ['hs-grad'],
    nextTasks:     ['mcat-prep'],
    parallelTasks: ['extracurriculars', 'research-exp'],
    status: 'complete',
  },
  {
    id: 'extracurriculars',
    title: 'Extracurriculars & volunteering',
    phase: 'premed',
    description: 'Accumulate clinical hours (200+), shadowing (100+), volunteering, leadership, and research experience.',
    requirements:  ['hs-grad'],
    nextTasks:     ['med-application'],
    parallelTasks: ['undergrad-prereqs', 'research-exp'],
    status: 'complete',
  },
  {
    id: 'research-exp',
    title: 'Research experience',
    phase: 'premed',
    description: 'Join a lab or clinical research project. Ideally contribute to a publication or present at a conference.',
    requirements:  ['hs-grad'],
    nextTasks:     ['med-application'],
    parallelTasks: ['undergrad-prereqs', 'extracurriculars'],
    status: 'progress',
  },
  {
    id: 'mcat-prep',
    title: 'MCAT preparation',
    phase: 'mcat',
    description: 'Study for 3-6 months using Kaplan, Princeton Review, or AAMC materials. Target 511+ score.',
    requirements:  ['undergrad-prereqs'],
    nextTasks:     ['mcat-exam'],
    parallelTasks: [] as string[],
    status: 'progress',
  },
  {
    id: 'mcat-exam',
    title: 'Take the MCAT',
    phase: 'mcat',
    description: 'Sit the MCAT exam (7.5 hours). Score range 472-528. Scores above 517 significantly improve acceptance odds.',
    requirements:  ['mcat-prep'],
    nextTasks:     ['med-application'],
    parallelTasks: [] as string[],
    status: 'todo',
  },
  {
    id: 'med-application',
    title: 'Medical school application',
    phase: 'medschool',
    description: 'Submit AMCAS primary application in June, complete secondaries, and prepare for MMI and traditional interviews.',
    requirements:  ['mcat-exam', 'extracurriculars', 'research-exp'],
    nextTasks:     ['ms-year1-2'],
    parallelTasks: [] as string[],
    status: 'todo',
  },
  {
    id: 'ms-year1-2',
    title: 'MS Years 1-2: Pre-clinical',
    phase: 'medschool',
    description: 'Two years of foundational sciences: anatomy, physiology, pharmacology, pathology. Prepare for USMLE Step 1.',
    requirements:  ['med-application'],
    nextTasks:     ['usmle-step1'],
    parallelTasks: [] as string[],
    status: 'todo',
  },
  {
    id: 'usmle-step1',
    title: 'USMLE Step 1',
    phase: 'medschool',
    description: 'Licensing exam covering basic science principles. Now pass/fail. Use First Aid + Anki + UWorld. Typical prep: 6-8 weeks.',
    requirements:  ['ms-year1-2'],
    nextTasks:     ['ms-year3-4'],
    parallelTasks: [] as string[],
    status: 'todo',
  },
  {
    id: 'ms-year3-4',
    title: 'MS Years 3-4: Clinical rotations',
    phase: 'medschool',
    description: 'Rotate through Surgery, Internal Medicine, Pediatrics, OB/GYN, Psychiatry, Family Medicine. Do a surgery sub-I in Year 4.',
    requirements:  ['usmle-step1'],
    nextTasks:     ['usmle-step2', 'residency-app'],
    parallelTasks: [] as string[],
    status: 'todo',
  },
  {
    id: 'usmle-step2',
    title: 'USMLE Step 2 CK',
    phase: 'medschool',
    description: 'Clinical knowledge exam. Aim for 250+ for competitive surgical residencies. Take during MS4.',
    requirements:  ['ms-year3-4'],
    nextTasks:     ['residency-app'],
    parallelTasks: ['residency-app'],
    status: 'todo',
  },
  {
    id: 'residency-app',
    title: 'Residency application (ERAS)',
    phase: 'residency',
    description: 'Apply through ERAS in September of MS4. General surgery is highly competitive - aim for 20-30 programs.',
    requirements:  ['ms-year3-4'],
    nextTasks:     ['general-surgery-res'],
    parallelTasks: ['usmle-step2'],
    status: 'todo',
  },
  {
    id: 'general-surgery-res',
    title: 'General surgery residency',
    phase: 'residency',
    description: '5-year ACGME-accredited residency. Progressive operative responsibility, call duties, and didactics. Yearly ABSITE exams.',
    requirements:  ['residency-app'],
    nextTasks:     ['fellowship-app'],
    parallelTasks: [] as string[],
    status: 'todo',
  },
  {
    id: 'fellowship-app',
    title: 'Surgical fellowship application',
    phase: 'surgery',
    description: 'Apply for subspecialty fellowship: Cardiothoracic, Vascular, Colorectal, Surgical Oncology, or Trauma/Critical Care.',
    requirements:  ['general-surgery-res'],
    nextTasks:     ['fellowship-training'],
    parallelTasks: [] as string[],
    status: 'todo',
  },
  {
    id: 'fellowship-training',
    title: 'Fellowship training',
    phase: 'surgery',
    description: 'Advanced subspecialty training. Develop high-volume operative experience, academic output, and mentorship relationships.',
    requirements:  ['fellowship-app'],
    nextTasks:     ['board-certification'],
    parallelTasks: [] as string[],
    status: 'todo',
  },
  {
    id: 'board-certification',
    title: 'Board certification',
    phase: 'surgery',
    description: 'Pass ABSITE qualifying and certifying exams. Obtain hospital privileges and begin independent attending practice.',
    requirements:  ['fellowship-training'],
    nextTasks:     [] as string[],
    parallelTasks: [] as string[],
    status: 'todo',
  },
]

async function main() {
  console.log('Seeding database...')

  await prisma.country.upsert({
    where: { code: 'us' },
    update: {},
    create: { code: 'us', name: 'United States' },
  })

  for (const t of tasks) {
    await prisma.task.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        title: t.title,
        description: t.description,
        phase: t.phase,
        status: t.status,
        countryCode: 'us',
        requirements: t.requirements,
        nextTasks: t.nextTasks,
        parallelTasks: t.parallelTasks,
      },
    })
  }

  console.log(`Seeded ${tasks.length} tasks for US journey`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())