<template>
  <div class="game-container">
    <h1>Deal or No Deal</h1>

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
</script>

<style scoped>
.game-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
}

h1 {
  text-align: center;
  color: #d4af37;
  font-size: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
}

.bank-offer-overlay {
  position: relative;
}

.bank-offer-overlay :deep(.game-screen) {
  opacity: 0.6;
  pointer-events: none;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
