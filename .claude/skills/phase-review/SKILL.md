# phase-review

## Purpose
Verify that a named phase's Definition of Done is fully met before the next phase begins.
Produces a checklist report: each item is PASS, FAIL, or MANUAL (requires human verification on Vercel).

## Usage
Invoke when the user indicates a phase is complete or wants to move to the next phase.
Ask the user: "Which phase are you reviewing?" if not stated.

## Steps
1. Read CLAUDE.md in full. Extract the Definition of Done for the stated phase.
2. For each checklist item:
   a. Identify what file evidence would confirm it.
   b. Read those files. Record a verdict: PASS / FAIL / MANUAL.
3. For PASS items: cite the file and line number as evidence.
4. For FAIL items: state what is missing and where it should be.
5. For MANUAL items: describe exactly what the user must verify on the Vercel URL.
6. Summarise: total PASS / FAIL / MANUAL counts.
7. If any FAIL exists, block phase advancement and list what must be fixed first.
8. If all items are PASS or MANUAL: confirm the phase can be closed pending manual verification.

## Constraints
- Read-only. Do not edit files.
- Do not invent checklist items beyond what CLAUDE.md specifies.
- Do not mark a phase complete if any FAIL is present.
- Do not run the dev server or make external requests.
