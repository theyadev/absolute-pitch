<script setup lang="ts">
import Button from "./Button.vue";

import { ref } from "vue";
import { useStore } from "../stores";
import { storeToRefs } from "pinia";

interface Emits {
  (event: "next", selected_note: string): void;
}

defineEmits<Emits>();

const store = useStore();
const { rounds, all_notes, use_french, french_notes } = storeToRefs(store);

const selected_note = ref<string>("");

function convertToFrench(note: string) {
  return (
    french_notes.value[note.slice(0, 1)] +
    note.slice(1).replace("b", "♭").replace("#", "♯")
  );
}
</script>

<template>
  <div class="flex flex-col px-16">
    <span v-if="store.cheat" class="text-red-500">{{
      rounds.at(-1)?.full_note
    }}</span>
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="note in all_notes"
        :key="note"
        class="cursor-pointer aspect-square flex items-center justify-center border-2 border-white px-2 py-1 rounded text-white"
        :class="
          (selected_note === note ? 'border-purple-400 text-purple-400 ' : '') +
          (use_french ? 'w-12' : '')
        "
        @click="selected_note = note"
      >
        <span v-if="use_french">{{ convertToFrench(note) }}</span>
        <span v-else>{{ note }}</span>
      </div>
    </div>

    <Button
      class="w-max ml-auto px-4 py-2 mt-8"
      @click="selected_note !== '' ? $emit('next', selected_note) : ''"
      >Next</Button
    >
  </div>
</template>
