<template>
  <div class="bank-offer">
    <h2>Bankens Bud</h2>
    <div class="offer-amount">{{ formatAmount(offer) }} kr</div>
    <p>Vill du ta budet?</p>
    <div class="offer-buttons">
      <button @click="emit('accept')" class="btn-deal">DEAL</button>
      <button @click="emit('reject')" class="btn-no-deal">NO DEAL</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  offer: number
}

defineProps<Props>()

const emit = defineEmits<{
  accept: []
  reject: []
}>()

function formatAmount(amount: number): string {
  return amount.toLocaleString('sv-SE')
}
</script>

<style scoped>
.bank-offer {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 60px 80px;
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  border-radius: 15px;
  max-width: 600px;
  z-index: 100;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);
  border: 3px solid #d4af37;
}

.bank-offer h2 {
  color: #d4af37;
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.offer-amount {
  font-size: 4rem;
  color: #fff;
  font-weight: bold;
  margin: 30px 0;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
}

.bank-offer p {
  font-size: 1.5rem;
  color: #ddd;
  margin-bottom: 40px;
}

.offer-buttons {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.btn-deal,
.btn-no-deal {
  padding: 15px 40px;
  font-size: 1.3rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-deal {
  background: linear-gradient(135deg, #28a745, #5cb85c);
  color: white;
}

.btn-no-deal {
  background: linear-gradient(135deg, #dc3545, #f44336);
  color: white;
}

.btn-deal:hover,
.btn-no-deal:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .bank-offer {
    padding: 40px 50px;
  }

  .offer-amount {
    font-size: 2.5rem;
  }
}
</style>
