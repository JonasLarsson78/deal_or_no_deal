import type { Briefcase } from '../types'
import { HIGH_VALUE_THRESHOLD, LOW_VALUE_THRESHOLD, ROUND_PERCENTAGES } from '../constants'

/**
 * Calculate the bank's offer based on remaining briefcases and current round
 */
export function calculateBankOffer(briefcases: Briefcase[], currentRound: number): number {
  // Get all unopened cases (including player's case)
  const remainingBriefcases = briefcases.filter(b => !b.opened)
  const remainingAmounts = remainingBriefcases.map(b => b.amount)

  // Calculate statistics
  const sum = remainingAmounts.reduce((acc, amt) => acc + amt, 0)
  const average = sum / remainingAmounts.length
  const min = Math.min(...remainingAmounts)
  const max = Math.max(...remainingAmounts)

  // Analyze remaining amounts to adjust offer
  const highValueCases = remainingAmounts.filter(amt => amt >= HIGH_VALUE_THRESHOLD)
  const lowValueCases = remainingAmounts.filter(amt => amt < LOW_VALUE_THRESHOLD)

  const highValueRatio = highValueCases.length / remainingAmounts.length
  const lowValueRatio = lowValueCases.length / remainingAmounts.length

  // Base percentage - higher starting values
  let basePercentage = ROUND_PERCENTAGES[currentRound - 1] || 0.5

  // Dynamic adjustment based on remaining values
  // If many high-value cases remain (good for player), bank offers LESS
  if (highValueRatio > 0.6) {
    basePercentage *= 0.85
  } else if (highValueRatio > 0.4) {
    basePercentage *= 0.92
  } else if (highValueRatio === 0) {
    // No high values left - increase offer significantly
    basePercentage *= 1.4
  } else if (highValueRatio < 0.2) {
    // Few high values - increase offer
    basePercentage *= 1.15
  }

  // If mostly low values remain (bad for player), bank offers LESS
  if (lowValueRatio > 0.7) {
    basePercentage *= 0.65
  } else if (lowValueRatio > 0.5) {
    basePercentage *= 0.80
  } else if (lowValueRatio < 0.2) {
    // Most low values eliminated (good for player), increase offer
    basePercentage *= 1.3
  } else if (lowValueRatio < 0.3) {
    basePercentage *= 1.15
  }

  // Bonus: If player eliminated many low values early, reward with better offer
  if (currentRound <= 2 && lowValueRatio < 0.25) {
    basePercentage *= 1.35 // Strong early strategy bonus
  } else if (currentRound <= 2 && lowValueRatio < 0.4) {
    basePercentage *= 1.2 // Good early strategy bonus
  }

  // Calculate weighted average (favor middle values)
  const sortedAmounts = [...remainingAmounts].sort((a, b) => a - b)
  const median = sortedAmounts[Math.floor(sortedAmounts.length / 2)] || average
  const weightedAverage = (average * 0.6) + (median * 0.4)

  // Add strategic variance (-3% to +3%)
  const variance = (Math.random() - 0.5) * 0.06
  const finalPercentage = basePercentage + variance

  // Final offer
  const offer = Math.round(weightedAverage * finalPercentage)

  // Ensure offer is never less than minimum or more than max
  return Math.max(min, Math.min(offer, max * 0.95))
}
