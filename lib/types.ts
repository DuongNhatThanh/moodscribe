// All shared TypeScript types for MoodScribe

export type Mood =
  | 'happy'
  | 'sad'
  | 'anxious'
  | 'calm'
  | 'angry'
  | 'reflective'
  | 'grateful'
  | 'overwhelmed'

export type MoodResult = {
  mood: Mood
  emoji: string
  affirmation: string
}

export type Entry = {
  id: string
  user_id: string | null
  content: string
  mood: Mood
  mood_emoji: string
  affirmation: string
  created_at: string
}
