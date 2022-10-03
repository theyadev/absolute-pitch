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
  <div>
    <span class="text-red-500">{{ rounds.at(-1)?.full_note }}</span>
    <div class="flex items-center flex-wrap justify-center gap-4 px-16">
      <div
        v-for="note in all_notes"
        :key="note"
        class="cursor-pointer bg-blue-400 px-2 py-1 rounded text-white"
        :class="selected_note === note ? 'bg-green-500' : ''"
        @click="selected_note = note"
      >
        {{ note }}
      </div>
    </div>

    <Button @click="$emit('next', selected_note)">Next</Button>
  </div>
</template>
