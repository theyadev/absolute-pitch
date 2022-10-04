<script setup lang="ts">
import { useStore } from "../stores";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Button from "./Button.vue";
const store = useStore();

interface Emits {
  (event: "play", note: string): void;
}

defineEmits<Emits>();
</script>

<template>
  <div class="flex flex-col gap-y-2 w-1/2">
    <div class="flex items-center gap-x-2">
      <FontAwesomeIcon class="text-white" icon="flag" /><span>Results</span>
    </div>
    <div class="w-full h-1 bg-white"></div>

    <div class="flex w-full items-center gap-x-4">
      <p class="uppercase font-semibold text-sm w-2/5 md:w-1/4">Score:</p>
      <p>{{ store.score }}/{{ store.rounds.length }}</p>
    </div>

    <div class="flex flex-col">
      <p class="uppercase font-semibold text-sm w-2/5 md:w-1/4 mb-2 flex items-center gap-x-2">
        <FontAwesomeIcon class="text-white" icon="flag" /> Answers
      </p>
    <div class=" h-0.5 w-3/4 bg-white mb-1"></div>

      <div v-for="(round, i) in store.rounds" class="flex gap-x-2 items-center">
        <p class="uppercase font-semibold text-sm w-2/5 md:w-1/4" :class="round.correct ? 'text-green-400' : 'text-red-500'">
          Round {{ i + 1 }}:
        </p>
        <div class="flex gap-x-2 items-center">
          <span>{{
            round.answer
          }}</span>
          <div v-if="!round.correct" class="flex gap-x-1 items-center">
            <span class="uppercase text-xs">Correct: {{ round.note }}</span>
          </div>
          <FontAwesomeIcon class="text-white hover:text-purple-400 cursor-pointer" icon="play" @click="$emit('play', round.full_note)" />
        </div>
      </div>
    </div>

    <Button @click="store.reset()" class="w-max px-12 mt-2">Restart</Button>
  </div>
</template>
