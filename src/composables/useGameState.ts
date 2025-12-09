import { ref, computed, watch } from 'vue'
import type { Briefcase, GameState, RevealModal } from '../types'
import { GAME_AMOUNTS, CASES_PER_ROUND, TOTAL_BRIEFCASES } from '../constants'
import { calculateBankOffer as calcBankOffer } from '../utils/bankOffer'
import { encrypt, decrypt } from '../utils/encryption'

const STORAGE_KEY = 'deal_or_no_deal_game_state'

/**
 * Composable for managing the game state and logic
 */
export function useGameState() {
  // Load saved state from localStorage
  const loadSavedState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return null
      
      const decrypted = decrypt(saved)
      return decrypted
    } catch (error) {
      console.error('Failed to load saved game state:', error)
      return null
    }
  }

  const savedState = loadSavedState()

  // State
  const gameState = ref<GameState>(savedState?.gameState || 'welcome')
  const briefcases = ref<Briefcase[]>(savedState?.briefcases || [])
  const playerCaseId = ref<number>(savedState?.playerCaseId || 0)
  const playerCaseAmount = ref<number>(savedState?.playerCaseAmount || 0)
  const currentRound = ref<number>(savedState?.currentRound || 1)
  const openedThisRound = ref<number>(savedState?.openedThisRound || 0)
  const revealedAmounts = ref<number[]>(savedState?.revealedAmounts || [])
  const currentOffer = ref<number>(savedState?.currentOffer || 0)
  const finalWinnings = ref<number>(savedState?.finalWinnings || 0)
  const acceptedDeal = ref<boolean>(savedState?.acceptedDeal || false)
  const revealModal = ref<RevealModal>({
    show: false,
    caseId: 0,
    amount: 0
  })

  // Save state to localStorage whenever it changes
  const saveState = () => {
    try {
      const stateToSave = {
        gameState: gameState.value,
        briefcases: briefcases.value,
        playerCaseId: playerCaseId.value,
        playerCaseAmount: playerCaseAmount.value,
        currentRound: currentRound.value,
        openedThisRound: openedThisRound.value,
        revealedAmounts: revealedAmounts.value,
        currentOffer: currentOffer.value,
        finalWinnings: finalWinnings.value,
        acceptedDeal: acceptedDeal.value
      }
      const encrypted = encrypt(stateToSave)
      localStorage.setItem(STORAGE_KEY, encrypted)
    } catch (error) {
      console.error('Failed to save game state:', error)
    }
  }

  const clearSavedState = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear saved game state:', error)
    }
  }

  // Watch for state changes and save
  watch([gameState, briefcases, playerCaseId, currentRound, openedThisRound, currentOffer, finalWinnings, acceptedDeal], () => {
    if (gameState.value !== 'welcome') {
      saveState()
    }
  }, { deep: true })

  // Computed
  const casesToOpenThisRound = computed(() => {
    return CASES_PER_ROUND[currentRound.value - 1] || 0
  })

  const remainingCase = computed(() => {
    return briefcases.value.find(b => !b.opened && !b.isPlayerCase)
  })

  const finalRemainingAmounts = computed(() => {
    return briefcases.value
      .filter(b => !b.opened)
      .map(b => b.amount)
  })

  // Functions
  function startGame() {
    clearSavedState()
    gameState.value = 'choose-player-case'
    initializeBriefcases()
  }

  function initializeBriefcases() {
    // Shuffle amounts
    const shuffledAmounts = [...GAME_AMOUNTS].sort(() => Math.random() - 0.5)

    // Create briefcases with shuffled amounts
    briefcases.value = Array.from({ length: TOTAL_BRIEFCASES }, (_, i) => ({
      id: i + 1,
      amount: shuffledAmounts[i]!,
      opened: false,
      isPlayerCase: false
    }))
  }

  function choosePlayerCase(caseId: number) {
    const briefcase = briefcases.value.find(b => b.id === caseId)
    if (briefcase) {
      briefcase.isPlayerCase = true
      playerCaseId.value = caseId
      playerCaseAmount.value = briefcase.amount
      gameState.value = 'playing'
      currentRound.value = 1
      openedThisRound.value = 0
    }
  }

  function openBriefcase(caseId: number) {
    const briefcase = briefcases.value.find(b => b.id === caseId)
    if (!briefcase || briefcase.opened) return

    briefcase.opened = true
    revealedAmounts.value.push(briefcase.amount)

    // Show reveal modal
    revealModal.value = {
      show: true,
      caseId: briefcase.id,
      amount: briefcase.amount
    }
  }

  function closeRevealModal() {
    revealModal.value.show = false
    openedThisRound.value++

    // Check if round is complete
    if (openedThisRound.value >= casesToOpenThisRound.value) {
      if (currentRound.value < 6) {
        // Show bank offer
        calculateBankOffer()
        gameState.value = 'bank-offer'
      } else {
        // Final round - only 2 cases left
        gameState.value = 'final-choice'
      }
    }
  }

  function calculateBankOffer() {
    currentOffer.value = calcBankOffer(briefcases.value, currentRound.value)
  }

  function acceptOffer() {
    acceptedDeal.value = true
    finalWinnings.value = currentOffer.value
    gameState.value = 'game-over'
  }

  function rejectOffer() {
    currentRound.value++
    openedThisRound.value = 0
    gameState.value = 'playing'
  }

  function keepPlayerCase() {
    acceptedDeal.value = false
    finalWinnings.value = playerCaseAmount.value
    gameState.value = 'game-over'
  }

  function swapCase() {
    acceptedDeal.value = false
    if (remainingCase.value) {
      finalWinnings.value = remainingCase.value.amount
    }
    gameState.value = 'game-over'
  }

  function resetGame() {
    clearSavedState()
    gameState.value = 'welcome'
    briefcases.value = []
    playerCaseId.value = 0
    playerCaseAmount.value = 0
    currentRound.value = 1
    openedThisRound.value = 0
    revealedAmounts.value = []
    currentOffer.value = 0
    finalWinnings.value = 0
    acceptedDeal.value = false
    revealModal.value = { show: false, caseId: 0, amount: 0 }
  }

  return {
    // State
    gameState,
    briefcases,
    playerCaseId,
    playerCaseAmount,
    currentRound,
    openedThisRound,
    revealedAmounts,
    currentOffer,
    finalWinnings,
    acceptedDeal,
    revealModal,
    amounts: [...GAME_AMOUNTS],

    // Computed
    casesToOpenThisRound,
    remainingCase,
    finalRemainingAmounts,

    // Functions
    startGame,
    choosePlayerCase,
    openBriefcase,
    closeRevealModal,
    acceptOffer,
    rejectOffer,
    keepPlayerCase,
    swapCase,
    resetGame
  }
}
