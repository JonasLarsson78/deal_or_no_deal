<template>
  <div class="choose-case">
    <h2>Välj din väska!</h2>
    <div class="briefcases-grid">
      <Briefcase v-for="briefcase in briefcases" :key="briefcase.id" :id="briefcase.id" :clickable="true"
        @click="emit('choose', briefcase.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Briefcase from './Briefcase.vue'

interface BriefcaseData {
  id: number
  amount: number
  opened: boolean
  isPlayerCase: boolean
}

interface Props {
  briefcases: BriefcaseData[]
}

defineProps<Props>()

const emit = defineEmits<{
  choose: [caseId: number]
}>()
</script>

<style scoped>
.choose-case {
  text-align: center;
  padding: 40px 20px;
}

.choose-case h2 {
  color: #fff;
  margin-bottom: 30px;
}

.briefcases-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin: 20px 0;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.choose-case :deep(.briefcase) {
  cursor: pointer;
}

.choose-case :deep(.briefcase:hover) {
  transform: translateY(-8px) scale(1.05);
  box-shadow:
    0 15px 30px rgba(212, 175, 55, 0.5),
    inset 0 2px 4px rgba(255, 255, 255, 0.2),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(145deg, #3a1f13, #5a3420);
  border-color: #d4af37;
}
</style>
