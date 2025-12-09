<template>
  <div class="game-container">
    <div class="header">
      <h1>Deal or No Deal</h1>
      <button v-if="gameState !== 'welcome' && gameState !== 'game-over'" class="quit-button" @click="confirmQuit">
        Avbryt spel
      </button>
    </div>

    <!-- Welcome Screen -->
    <WelcomeScreen v-if="gameState === 'welcome'" @start="startGame" />

    <!-- Choose Player's Briefcase -->
    <ChooseCase v-if="gameState === 'choose-player-case'" :briefcases="briefcases" @choose="choosePlayerCase" />

    <!-- Reveal Modal -->
    <RevealModal v-if="revealModal.show" :case-id="revealModal.caseId" :amount="revealModal.amount"
      @close="closeRevealModal" />

    <!-- Main Game Screen -->
    <GameBoard v-if="gameState === 'playing'" :briefcases="briefcases" :player-case-id="playerCaseId"
      :current-round="currentRound" :opened-this-round="openedThisRound"
      :cases-to-open-this-round="casesToOpenThisRound" :revealed-amounts="revealedAmounts" :all-amounts="amounts"
      @open="openBriefcase" />

    <!-- Bank Offer Screen -->
    <div v-if="gameState === 'bank-offer'" class="bank-offer-overlay">
      <GameBoard :briefcases="briefcases" :player-case-id="playerCaseId" :current-round="currentRound"
        :opened-this-round="openedThisRound" :cases-to-open-this-round="0" :revealed-amounts="revealedAmounts"
        :all-amounts="amounts" @open="() => { }" />
      <BankOffer :offer="currentOffer" @accept="acceptOffer" @reject="rejectOffer" />
    </div>

    <!-- Final Choice -->
    <FinalChoice v-if="gameState === 'final-choice'" :player-case-id="playerCaseId"
      :remaining-case-id="remainingCase?.id" :remaining-amounts="finalRemainingAmounts" @keep="keepPlayerCase"
      @swap="swapCase" />

    <!-- Game Over -->
    <GameOver v-if="gameState === 'game-over'" :accepted-deal="acceptedDeal" :final-winnings="finalWinnings"
      :player-case-amount="playerCaseAmount" @restart="resetGame" />
  </div>
</template>

<script setup lang="ts">
import WelcomeScreen from './components/WelcomeScreen.vue'
import ChooseCase from './components/ChooseCase.vue'
import GameBoard from './components/GameBoard.vue'
import RevealModal from './components/RevealModal.vue'
import BankOffer from './components/BankOffer.vue'
import FinalChoice from './components/FinalChoice.vue'
import GameOver from './components/GameOver.vue'
import { useGameState } from './composables/useGameState'

// Use the game state composable
const {
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
  amounts,
  casesToOpenThisRound,
  remainingCase,
  finalRemainingAmounts,
  startGame,
  choosePlayerCase,
  openBriefcase,
  closeRevealModal,
  acceptOffer,
  rejectOffer,
  keepPlayerCase,
  swapCase,
  resetGame
} = useGameState()

function confirmQuit() {
  if (confirm('Är du säker på att du vill avbryta spelet? Allt framsteg kommer att försvinna.')) {
    resetGame()
  }
}
</script>

<style scoped>
.game-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px;
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
}

.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

h1 {
  text-align: center;
  color: #d4af37;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
}

.quit-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 20px;
  background: linear-gradient(135deg, #e63946, #c1121f);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.quit-button:hover {
  background: linear-gradient(135deg, #d62828, #9d0208);
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
}

.quit-button:active {
  transform: translateY(-50%) scale(0.98);
}

.bank-offer-overlay {
  position: relative;
}

.bank-offer-overlay :deep(.game-screen) {
  opacity: 0.6;
  pointer-events: none;
}

@media (max-width: 768px) {
  .game-container {
    padding: 5px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .quit-button {
    position: static;
    transform: none;
    margin-top: 10px;
    font-size: 0.8rem;
    padding: 6px 12px;
  }

  .header {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 10px;
  }

  .quit-button:hover {
    transform: scale(1.05);
  }

  .quit-button:active {
    transform: scale(0.98);
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.2rem;
  }

  .quit-button {
    font-size: 0.75rem;
    padding: 5px 10px;
  }
}
</style>
