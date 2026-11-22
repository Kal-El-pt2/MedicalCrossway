import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type ResearchStudyRow = {
  id: string;
  title: string | null;
  status: "in_process" | "published";
  stage: string;
  studyType: string;
  field: string;
  topic: string;
  keywords: string[];
  roles: Array<{ title: string; open: number }>;
  summary: string;
  leadName: string | null;
  hoursPerWeek: string | null;
  duration: string | null;
  publishedJournal: string | null;
};

export async function GET() {
  try {
    const rows = await prisma.$queryRaw<ResearchStudyRow[]>`
      SELECT
        id::text AS id,
        CASE WHEN status = 'published' THEN title ELSE NULL END AS title,
        status,
        stage,
        study_type AS "studyType",
        field,
        topic,
        keywords,
        roles,
        summary,
        lead_name AS "leadName",
        hours_per_week AS "hoursPerWeek",
        duration,
        published_journal AS "publishedJournal"
      FROM public.research_studies
      WHERE status IN ('in_process', 'published')
      ORDER BY updated_at DESC, created_at DESC
    `;

    return NextResponse.json(
      {
        studies: rows.filter((study) => study.status === "in_process"),
        published: rows.filter((study) => study.status === "published"),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Research studies are unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
