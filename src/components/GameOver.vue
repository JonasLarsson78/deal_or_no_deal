<template>
  <div class="game-over">
    <h2>Spelet Slut!</h2>
    <div class="result">
      <p v-if="acceptedDeal">Du accepterade bankens bud!</p>
      <p v-else>Du gick hela vägen!</p>
      <div class="final-amount">{{ formatAmount(finalWinnings) }} kr</div>
      <p class="case-reveal">Din väska innehöll: {{ formatAmount(playerCaseAmount) }} kr</p>
    </div>
    <button @click="emit('restart')" class="btn-primary">Spela Igen</button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  acceptedDeal: boolean
  finalWinnings: number
  playerCaseAmount: number
}

defineProps<Props>()

const emit = defineEmits<{
  restart: []
}>()

function formatAmount(amount: number): string {
  return amount.toLocaleString('sv-SE')
}
</script>

<style scoped>
.game-over {
  text-align: center;
  padding: 60px 20px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  max-width: 600px;
  margin: 100px auto;
}

.game-over h2 {
  color: #d4af37;
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.result p {
  font-size: 1.3rem;
  color: #ddd;
  margin: 10px 0;
}

.final-amount {
  font-size: 4rem;
  color: #d4af37;
  font-weight: bold;
  margin: 40px 0;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
}

.case-reveal {
  font-size: 1.1rem;
  color: #fff;
  margin-top: 20px;
  font-style: italic;
}

.btn-primary {
  padding: 15px 40px;
  font-size: 1.3rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  background: linear-gradient(135deg, #d4af37, #f8d568);
  color: #000;
  margin-top: 20px;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .game-over {
    padding: 40px 20px;
    margin: 50px auto;
    max-width: 90%;
  }

  .game-over h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .result p {
    font-size: 1rem;
  }

  .final-amount {
    font-size: 2rem;
    margin: 25px 0;
  }

  .case-reveal {
    font-size: 0.95rem;
  }

  .btn-primary {
    padding: 12px 30px;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .game-over {
    padding: 30px 15px;
    margin: 30px auto;
  }

  .game-over h2 {
    font-size: 1.3rem;
  }

  .result p {
    font-size: 0.9rem;
  }

  .final-amount {
    font-size: 1.5rem;
  }

  .case-reveal {
    font-size: 0.85rem;
  }

  .btn-primary {
    padding: 10px 25px;
    font-size: 1rem;
  }
}
</style>
