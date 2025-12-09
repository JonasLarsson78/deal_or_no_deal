<template>
  <div class="welcome-screen">
    <h2>Välkommen till Deal or No Deal!</h2>
    <p>20 väskor innehåller olika belopp. Välj din väska och försök få så bra bud som möjligt från banken!</p>
    <button @click="emit('start')" class="btn-primary">Starta Spel</button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  start: []
}>()
</script>

<style scoped>
.welcome-screen {
  text-align: center;
  padding: 60px 20px;
}

.welcome-screen h2 {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 20px;
}

.welcome-screen p {
  font-size: 1.2rem;
  color: #ddd;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
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
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}
</style>
