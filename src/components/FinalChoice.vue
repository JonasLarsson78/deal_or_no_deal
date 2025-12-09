<template>
  <div class="final-choice">
    <h2>Sista Chansen!</h2>
    <p>Två väskor kvar. Vill du behålla din väska eller byta?</p>

    <div class="remaining-amounts">
      <h3>Kvarvarande belopp:</h3>
      <div class="amounts-display">
        <div v-for="amount in sortedAmounts" :key="amount" class="amount-badge">
          {{ formatAmount(amount) }} kr
        </div>
      </div>
    </div>

    <div class="final-cases">
      <div @click="emit('keep')" class="briefcase clickable player">
        <span>Din väska</span>
        <div>{{ playerCaseId }}</div>
      </div>
      <div @click="emit('swap')" class="briefcase clickable">
        <span>Byt till</span>
        <div>{{ remainingCaseId }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  playerCaseId: number
  remainingCaseId: number | undefined
  remainingAmounts: number[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  keep: []
  swap: []
}>()

const sortedAmounts = computed(() => {
  return [...props.remainingAmounts].sort((a, b) => b - a)
})

function formatAmount(amount: number): string {
  return amount.toLocaleString('sv-SE')
}
</script>

<style scoped>
.final-choice {
  text-align: center;
  padding: 60px 20px;
}

.final-choice h2 {
  color: #d4af37;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.final-choice p {
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: 30px;
}

.remaining-amounts {
  max-width: 600px;
  margin: 0 auto 40px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border: 2px solid #d4af37;
}

.remaining-amounts h3 {
  color: #d4af37;
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.amounts-display {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.amount-badge {
  background: linear-gradient(135deg, #d4af37, #f8d568);
  color: #000;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.final-cases {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 40px;
}

.final-cases .briefcase {
  position: relative;
  background: linear-gradient(145deg, #2d1810, #4a2817);
  color: #fff;
  padding: 20px 25px 15px 25px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.5),
    inset 0 1px 2px rgba(255, 255, 255, 0.1),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 2px solid #1a0f0a;
  min-width: 200px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.final-cases .briefcase::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 35px;
  height: 12px;
  background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
  border: 2px solid #1a0f0a;
  border-radius: 8px 8px 0 0;
  box-shadow:
    0 -2px 4px rgba(0, 0, 0, 0.5),
    inset 0 1px 1px rgba(255, 255, 255, 0.2);
}

.final-cases .briefcase span {
  font-size: 1rem;
  display: block;
  margin-bottom: 10px;
}

.final-cases .briefcase div {
  font-size: 1.5rem;
}

.final-cases .briefcase:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow:
    0 15px 30px rgba(212, 175, 55, 0.5),
    inset 0 2px 4px rgba(255, 255, 255, 0.2),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(145deg, #3a1f13, #5a3420);
  border-color: #d4af37;
}

.final-cases .briefcase.player {
  background: linear-gradient(145deg, #b8941f, #d4af37);
  color: #000;
  border: 3px solid #8b7355;
  box-shadow:
    0 10px 20px rgba(212, 175, 55, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2);
}

.final-cases .briefcase.player::before {
  background: linear-gradient(145deg, #8b7355, #a0855b);
  border-color: #6d5d45;
}

@media (max-width: 768px) {
  .final-choice {
    padding: 30px 15px;
  }

  .final-choice h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  .final-choice p {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  .remaining-amounts {
    padding: 15px;
    margin-bottom: 25px;
  }

  .remaining-amounts h3 {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  .amounts-display {
    gap: 10px;
  }

  .amount-badge {
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  .final-cases {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 25px;
  }

  .final-cases .briefcase {
    min-width: 150px;
    min-height: 120px;
    padding: 15px 20px 12px 20px;
  }

  .final-cases .briefcase span {
    font-size: 0.9rem;
  }

  .final-cases .briefcase div {
    font-size: 1.2rem;
  }

  .final-cases .briefcase:hover {
    transform: translateY(-4px) scale(1.02);
  }
}

@media (max-width: 480px) {
  .final-choice h2 {
    font-size: 1.3rem;
  }

  .final-choice p {
    font-size: 0.9rem;
  }

  .amount-badge {
    padding: 6px 12px;
    font-size: 0.85rem;
  }

  .final-cases .briefcase {
    min-width: 130px;
    min-height: 100px;
  }
}
</style>
