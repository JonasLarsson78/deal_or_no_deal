// Game types
export interface Briefcase {
  id: number
  amount: number
  opened: boolean
  isPlayerCase: boolean
}

export type GameState = 'welcome' | 'choose-player-case' | 'playing' | 'bank-offer' | 'final-choice' | 'game-over'

export interface RevealModal {
  show: boolean
  caseId: number
  amount: number
}
