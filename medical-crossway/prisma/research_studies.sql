-- Additive schema for the Research Labs listing.
-- In-progress titles are kept in the database but the API does not return them.
CREATE TABLE IF NOT EXISTS public.research_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_process'
    CHECK (status IN ('in_process', 'published')),
  stage TEXT NOT NULL DEFAULT 'Protocol',
  study_type TEXT NOT NULL DEFAULT 'Systematic review',
  field TEXT NOT NULL,
  topic TEXT NOT NULL,
  keywords TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  roles JSONB NOT NULL DEFAULT '[]'::JSONB
    CHECK (jsonb_typeof(roles) = 'array'),
  summary TEXT NOT NULL DEFAULT '',
  lead_name TEXT,
  hours_per_week TEXT,
  duration TEXT,
  published_journal TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS research_studies_listing_idx
  ON public.research_studies (status, field, stage, updated_at DESC);
