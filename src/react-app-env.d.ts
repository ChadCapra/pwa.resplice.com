/// <reference types="react-scripts" />

// Utility Types
type Dictionary<T> = {
  [key: string]: T
}

type Match = {
  path: string
}

type Callback = (...args: any[]) => void
// End Utility Types
