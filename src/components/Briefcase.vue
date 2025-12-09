<template>
  <div :class="['briefcase', { 'clickable': clickable, 'player': isPlayer }]" @click="handleClick">
    <slot>{{ id }}</slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: number
  clickable?: boolean
  isPlayer?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.briefcase {
  position: relative;
  background: linear-gradient(145deg, #2d1810, #4a2817);
  color: #fff;
  padding: 20px 25px 15px 25px;
  border-radius: 6px;
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.5),
    inset 0 1px 2px rgba(255, 255, 255, 0.1),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
  aspect-ratio: 1.5 / 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #1a0f0a;
}

/* Briefcase handle */
.briefcase::before {
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

.briefcase.clickable {
  cursor: pointer;
}

.briefcase.clickable:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow:
    0 15px 30px rgba(212, 175, 55, 0.5),
    inset 0 2px 4px rgba(255, 255, 255, 0.2),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(145deg, #3a1f13, #5a3420);
  border-color: #d4af37;
}

.briefcase.player {
  background: linear-gradient(145deg, #b8941f, #d4af37);
  color: #000;
  border: 3px solid #8b7355;
  box-shadow:
    0 10px 20px rgba(212, 175, 55, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2);
}

.briefcase.player::before {
  background: linear-gradient(145deg, #8b7355, #a0855b);
  border-color: #6d5d45;
}

@media (max-width: 768px) {
  .briefcase {
    padding: 12px 15px 10px 15px;
    font-size: 1rem;
    border-width: 1.5px;
  }

  .briefcase::before {
    width: 25px;
    height: 8px;
    top: -6px;
  }

  .briefcase.clickable:hover {
    transform: translateY(-4px) scale(1.02);
  }
}

@media (max-width: 480px) {
  .briefcase {
    padding: 10px 12px 8px 12px;
    font-size: 0.9rem;
  }

  .briefcase::before {
    width: 20px;
    height: 6px;
    top: -5px;
  }
}
</style>
