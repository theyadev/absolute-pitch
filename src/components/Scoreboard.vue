<script setup lang="ts">
import { useStore } from "../stores";

const store = useStore();
</script>

<template>
  <div>
    <h3>Finished</h3>

    <p>{{ store.score }}/{{ store.rounds.length }}</p>

    <Button @click="store.reset()">Restart</Button>
  </div>
</template>
