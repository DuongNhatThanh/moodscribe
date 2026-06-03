-- Migration 002: tighten user_id + enable RLS
-- Prerequisites: all rows with user_id = NULL must be deleted first.
-- Run in Supabase Dashboard → SQL Editor after npm run build passes locally.

ALTER TABLE public.entries
  ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE public.entries
  ADD CONSTRAINT entries_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.entries ENABLE ROW LEVEL SECURITY;

-- SELECT: users see only their own entries
CREATE POLICY "users_select_own_entries"
  ON public.entries FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: users can only insert rows with their own user_id
CREATE POLICY "users_insert_own_entries"
  ON public.entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- DELETE: users can only delete their own entries
CREATE POLICY "users_delete_own_entries"
  ON public.entries FOR DELETE
  USING (auth.uid() = user_id);
