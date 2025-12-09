// Game amounts (20 different amounts in SEK)
export const GAME_AMOUNTS = [
  1, 10, 20, 100, 200, 500, 1000, 2500, 5000, 7500,
  10000, 25000, 50000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000
] as const

// Cases to open per round
export const CASES_PER_ROUND = [6, 3, 3, 3, 2, 1] as const

// Total number of briefcases
export const TOTAL_BRIEFCASES = 20

// Thresholds for bank offer calculation
export const HIGH_VALUE_THRESHOLD = 200000 // 200k+
export const LOW_VALUE_THRESHOLD = 10000 // Below 10k

// Base percentages for bank offers per round
export const ROUND_PERCENTAGES = [0.25, 0.40, 0.55, 0.68, 0.80, 0.90] as const
