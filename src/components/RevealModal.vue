<template>
  <div class="reveal-modal-overlay" @click="emit('close')">
    <div class="reveal-modal" @click.stop>
      <div class="reveal-case-number">Väska {{ caseId }}</div>
      <div class="reveal-amount">{{ formatAmount(amount) }} kr</div>
      <button @click="emit('close')" class="btn-continue">Fortsätt</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  caseId: number
  amount: number
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

function formatAmount(amount: number): string {
  return amount.toLocaleString('sv-SE')
}
</script>

<style scoped>
.reveal-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
}

.reveal-modal {
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  padding: 60px 80px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  border: 3px solid #d4af37;
  animation: scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.reveal-case-number {
  font-size: 1.5rem;
  color: #999;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.reveal-amount {
  font-size: 5rem;
  font-weight: bold;
  color: #d4af37;
  margin: 30px 0;
  text-shadow: 0 0 30px rgba(212, 175, 55, 0.6);
  animation: glow 1.5s ease-in-out infinite alternate;
}

.btn-continue {
  margin-top: 30px;
  padding: 15px 50px;
  font-size: 1.2rem;
  font-weight: bold;
  background: linear-gradient(135deg, #d4af37, #f8d568);
  color: #000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-continue:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(212, 175, 55, 0.4);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes glow {
  from {
    text-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
  }

  to {
    text-shadow: 0 0 40px rgba(212, 175, 55, 0.8);
  }
}

@media (max-width: 768px) {
  .reveal-modal {
    padding: 40px 50px;
  }

  .reveal-amount {
    font-size: 3rem;
  }
}
</style>
