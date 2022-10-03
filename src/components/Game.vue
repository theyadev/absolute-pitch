<script setup lang="ts">
import { ref } from "vue";
import Button from "./Button.vue";
import { useStore } from "../stores";
import { storeToRefs } from "pinia";
import getRandomValue from "../utils/getRandomValue";

interface Emits {
  (event: "next", selected_note: string): void;
}

defineEmits<Emits>();

const store = useStore();
const { rounds, all_notes } = storeToRefs(store);

const selected_note = ref<string>();
</script>

<template>
  <div class="flex flex-col px-16">
    <span v-if="store.cheat" class="text-red-500">{{ rounds.at(-1)?.full_note }}</span>
    <div class="grid grid-cols-5 gap-4">
      <div
        v-for="note in all_notes"
        :key="note"
        class="cursor-pointer aspect-square flex items-center justify-center border-2 border-white px-2 py-1 rounded text-white"
        :class="selected_note === note ? 'border-purple-400 text-purple-400' : ''"
        @click="selected_note = note"
      >
        {{ note }}
      </div>
    </div>

    <Button class="w-max ml-auto px-4 py-2" @click="$emit('next', selected_note)">Next</Button>
  </div>
</template>
