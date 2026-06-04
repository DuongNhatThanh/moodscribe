# supabase-rls-review

## Purpose
Audit Row Level Security correctness for all user-data tables.
Produces: static analysis report + manual two-account test script.

## Usage
Invoke before closing Phase 4, after any new table is added, or when the user asks for an RLS audit.

## Steps
1. Read all files in supabase/migrations/ in order.
2. For each table that stores user data, verify:
   - RLS is enabled
   - SELECT, INSERT, DELETE policies exist with correct USING/WITH CHECK expressions
   - user_id is NOT NULL with a foreign key to auth.users
3. Read actions/entries.ts and app/api/analyze/route.ts.
   Verify every query is gated by getUser() and scoped to the authenticated user.
4. Read lib/supabase/client.ts and confirm it is not imported in server-side files.
5. Grep the entire codebase for SUPABASE_SERVICE_ROLE_KEY. Flag any hit as a FAIL.
6. Report each check as PASS or FAIL with file evidence.
7. Append the two-account manual test script from CLAUDE.md as a MANUAL section.

## Env variable rules
- NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are intentionally public — do not flag them.
- SUPABASE_SERVICE_ROLE_KEY must be absent from the entire codebase. Any occurrence is a FAIL.

## Constraints
- Read-only. No SQL execution. No file edits.
- Do not invent policies or generate SQL.
- A single FAIL blocks the RLS review from passing.
