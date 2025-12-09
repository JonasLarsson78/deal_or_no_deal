<template>
  <div class="amounts-board">
    <h3>{{ title }}</h3>
    <div class="amounts-grid">
      <div v-for="amount in amounts" :key="amount"
        :class="['amount-item', type === 'low' ? 'amount-low' : 'amount-high', { 'revealed': revealedAmounts.includes(amount) }]">
        {{ formatAmount(amount) }} kr
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  amounts: number[]
  revealedAmounts: number[]
  type: 'low' | 'high'
}

defineProps<Props>()

function formatAmount(amount: number): string {
  return amount.toLocaleString('sv-SE')
}
</script>

<style scoped>
.amounts-board {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
}

.amounts-board h3 {
  color: #d4af37;
  text-align: center;
  margin-bottom: 15px;
}

.amounts-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.amount-item {
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  transition: all 0.3s;
}

.amount-item.amount-low {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
}

.amount-item.amount-high {
  background: linear-gradient(135deg, #991b1b, #dc2626);
}

.amount-item.revealed {
  text-decoration: line-through;
  opacity: 0.4;
}
</style>
