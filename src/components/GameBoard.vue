<template>
  <div class="game-screen">
    <!-- Round Info -->
    <div class="round-info">
      <h2>Omgång {{ currentRound }}</h2>
      <p>Öppna {{ casesToOpenThisRound }} väskor ({{ casesToOpenThisRound - openedThisRound }} kvar)</p>
    </div>

    <div class="game-content">
      <!-- Low Amount Board -->
      <AmountBoard title="Låga Belopp" :amounts="lowAmounts" :revealed-amounts="revealedAmounts" type="low" />

      <!-- Briefcases -->
      <div class="center-area">
        <div class="player-case">
          <h3>Din väska</h3>
          <Briefcase :id="playerCaseId" :is-player="true" />
        </div>

        <div class="briefcases-grid">
          <Briefcase v-for="briefcase in activeBriefcases" :key="briefcase.id" :id="briefcase.id" :clickable="true"
            @click="emit('open', briefcase.id)" />
        </div>
      </div>

      <!-- High Amount Board -->
      <AmountBoard title="Höga Belopp" :amounts="highAmounts" :revealed-amounts="revealedAmounts" type="high" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Briefcase from './Briefcase.vue'
import AmountBoard from './AmountBoard.vue'

interface BriefcaseData {
  id: number
  amount: number
  opened: boolean
  isPlayerCase: boolean
}

interface Props {
  briefcases: BriefcaseData[]
  playerCaseId: number
  currentRound: number
  openedThisRound: number
  casesToOpenThisRound: number
  revealedAmounts: number[]
  allAmounts: number[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  open: [caseId: number]
}>()

const activeBriefcases = computed(() => {
  return props.briefcases.filter(b => !b.isPlayerCase && !b.opened)
})

const lowAmounts = computed(() => {
  return props.allAmounts.filter(a => a <= 7500)
})

const highAmounts = computed(() => {
  return props.allAmounts.filter(a => a >= 10000)
})
</script>

<style scoped>
.game-screen {
  padding: 10px;
}

.round-info {
  text-align: center;
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.round-info h2 {
  color: #d4af37;
  margin: 0;
  font-size: 1.3rem;
}

.round-info p {
  color: #fff;
  font-size: 1rem;
  margin: 5px 0 0 0;
}

.game-content {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 15px;
}

.center-area {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.player-case {
  text-align: center;
}

.player-case h3 {
  color: #d4af37;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.player-case :deep(.briefcase) {
  max-width: 120px;
  margin: 0 auto;
}

.briefcases-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin: 10px 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 1024px) {
  .game-content {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .briefcases-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .game-screen {
    padding: 5px;
  }

  .round-info {
    padding: 8px;
    margin-bottom: 10px;
  }

  .round-info h2 {
    font-size: 1.1rem;
  }

  .round-info p {
    font-size: 0.9rem;
  }

  .game-content {
    gap: 8px;
  }

  .briefcases-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }

  .player-case h3 {
    font-size: 1rem;
    margin-bottom: 8px;
  }

  .player-case :deep(.briefcase) {
    max-width: 100px;
  }
}

@media (max-width: 480px) {
  .briefcases-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
  }
}
</style>
