# nextjs-app-router-review

## Purpose
Verify that Next.js App Router conventions from CLAUDE.md are followed:
component boundaries, data flow direction, env variable hygiene, and route assignment.

## Usage
Invoke after adding components/pages/actions, before phase gates close,
or when the user asks to check component boundaries.

## Approved API fetch flows
- EntryForm calling POST /api/analyze is the intended pattern — Claude must go through the API route.
  Do not flag this as a violation.
- Flag any other Client Component making fetch('/api/...') calls for review.
  These are not automatic FAILs, but must be examined to confirm they are intentional and justified.

## Steps
1. List all files with "use client" directive. For each:
   - Confirm it has event handlers, browser APIs, or hooks that justify the directive.
   - Confirm it does not import lib/claude.ts, lib/supabase/server.ts, or any Anthropic SDK.
2. Confirm lib/supabase/client.ts is only imported in "use client" files.
3. Read actions/entries.ts. Confirm all mutations are Server Actions ('use server').
4. Read app/api/analyze/route.ts. Confirm it is the sole caller of analyzeEntry().
5. Find all fetch('/api/...') calls in Client Components. For each:
   - If it is EntryForm calling /api/analyze: mark PASS (approved pattern).
   - If it is any other component or endpoint: flag for review with file:line and ask the user to confirm it is intentional.
6. Check env variable names: ANTHROPIC_API_KEY must not have NEXT_PUBLIC_ prefix.
7. Grep the codebase for SUPABASE_SERVICE_ROLE_KEY. Flag any hit as a FAIL.
8. Report each check as PASS, FAIL, or REVIEW-NEEDED with file:line evidence.
9. Summarise: PASS count, FAIL count, REVIEW-NEEDED count, and what to address.

## Constraints
- Read-only. Do not edit any file.
- Do not refactor — report violations only.
- Do not flag NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY as problems.
- Do not flag EntryForm's /api/analyze fetch as a violation.
- Do not run the dev server or build.
