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
const { rounds, use_french, french_notes, all_notes } = storeToRefs(store);

const selected_note = ref<string>("");

function convertToFrench(note: string) {
  return (
    french_notes.value[note.slice(0, 1)] +
    note.slice(1).replace("b", "♭").replace("#", "♯")
  );
}
</script>

<template>
  <div class="flex flex-col px-16 w-full place-items-center">
    <span v-if="store.cheat" class="text-red-500 mb-4">{{
      use_french
        ? convertToFrench(rounds.at(-1)?.full_note as string)
        : rounds.at(-1)?.full_note
    }}</span>
    <div
      class="grid gap-y-4 gap-x-12"
      :class="
        store.difficulties[store.difficulty].suffixes.length === 1
          ? 'grid-cols-1'
          : store.difficulties[store.difficulty].suffixes.length === 2
          ? 'grid-cols-2'
          : 'grid-cols-3'
      "
    >
      <div
        v-for="note in all_notes"
        :key="note"
        class="hover:border-purple-500/50 hover:text-purple-500/50 hover:scale-95 transition-all duration-300 cursor-pointer aspect-square flex items-center justify-center border-2 w-14 border-white px-2 py-1 rounded text-white"
        :class="
          selected_note === note
            ? 'border-purple-400 text-purple-400 scale-105'
            : ''
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
