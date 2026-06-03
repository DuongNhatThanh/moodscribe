import Anthropic from '@anthropic-ai/sdk'
import type { Mood, MoodResult } from '@/lib/types'

const VALID_MOODS: readonly Mood[] = [
  'happy', 'sad', 'anxious', 'calm', 'angry', 'reflective', 'grateful', 'overwhelmed',
]

const FALLBACK: MoodResult = {
  mood: 'reflective',
  emoji: '🤔',
  affirmation: 'Keep writing. Every word counts.',
}

const SYSTEM_PROMPT = `You are an empathetic mood analyst. Given a personal journal entry, return a JSON object describing the writer's emotional tone.

Return only raw JSON with no markdown formatting, no code blocks, no explanation, and no preamble.

The JSON must have exactly these three fields:
- "mood": one of exactly these eight values: happy, sad, anxious, calm, angry, reflective, grateful, overwhelmed
- "emoji": a single emoji that represents the mood
- "affirmation": one short, warm, affirming sentence addressed to the writer (no longer than 20 words)

Example: {"mood":"calm","emoji":"😌","affirmation":"You are finding your footing, one breath at a time."}`

export async function analyzeEntry(content: string): Promise<MoodResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('analyzeEntry: ANTHROPIC_API_KEY is not set')
    return FALLBACK
  }

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 150,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content }],
    })

    const block = response.content[0]
    // Guard against non-text blocks (e.g. tool_use) that would break .text access
    if (!block || block.type !== 'text') {
      return FALLBACK
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(block.text)
    } catch {
      return FALLBACK
    }

    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      typeof (parsed as Record<string, unknown>).mood !== 'string' ||
      typeof (parsed as Record<string, unknown>).emoji !== 'string' ||
      typeof (parsed as Record<string, unknown>).affirmation !== 'string'
    ) {
      return FALLBACK
    }

    const { mood, emoji, affirmation } = parsed as Record<string, string>

    // Discard and fall back if Claude returned a mood outside the fixed enum
    if (!VALID_MOODS.includes(mood as Mood)) {
      return FALLBACK
    }

    return { mood: mood as Mood, emoji, affirmation }
  } catch (error) {
    console.error('analyzeEntry failed:', error)
    return FALLBACK
  }
}
