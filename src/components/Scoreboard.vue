<script setup lang="ts">
interface Props {
  score: number;
  max_score: number;
}

interface Emits {
  (event: "restart"): void;
}

defineEmits<Emits>();
defineProps<Props>();
</script>

<template>
  <div>
    <h3>Finished</h3>

    <p>{{ score }}/{{ max_score }}</p>

    <Button @click="$emit('restart')">Restart</Button>
  </div>
</template>
