<script lang="ts" setup>
import Button from "./Button.vue";
interface Emits {
  (event: "start"): void;
}
const emit = defineEmits<Emits>();
</script>

<template>
  <Button
    @click="$emit('start')"
    class="place-self-center col-span-2 aspect-square row-start-2"
  >
    Play random note
  </Button>
</template>
