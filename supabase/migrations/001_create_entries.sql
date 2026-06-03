-- Migration 001: create entries table
-- Run manually in the Supabase dashboard SQL editor.
-- user_id is nullable in Phase 3 — no auth exists yet.
-- NOT NULL + foreign key to auth.users is added in migration 002 (Phase 4).

CREATE TABLE public.entries (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NULL,
  content     text        NOT NULL,
  mood        text        NOT NULL,
  mood_emoji  text        NOT NULL,
  affirmation text        NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);
