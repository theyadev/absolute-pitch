<script setup lang="ts">
import * as Tone from "tone";
import { ref } from "vue";
import { useStore } from "./stores";

// Components
import Home from "./components/Home.vue";
import Scoreboard from "./components/Scoreboard.vue";
import Waiting from "./components/Waiting.vue";
import Game from "./components/Game.vue";
import { storeToRefs } from "pinia";
import getRandomValue from "./utils/getRandomValue";

// ToneJS Init
const piano = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  baseUrl: "https://tonejs.github.io/audio/salamander/",
  release: 0.3,
}).toDestination();

Tone.start();

// Variables
const store = useStore();
const { finished, rounds, max_round, difficulties, difficulty, all_notes } =
  storeToRefs(store);
const currently_playing = ref<boolean>(false);

// Functions

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function playNote(note: string) {
  currently_playing.value = true;
  wait(500).then(() => {
    currently_playing.value = false;
  });
  piano.triggerAttackRelease(note, "2n");
}

function playRandomNote() {
  const current_difficulty = difficulties.value[difficulty.value];
  const randomNote = getRandomValue(
    all_notes.value
  );
  const randomOctave = getRandomValue(current_difficulty.octaves);

  store.addRound({
    note: randomNote,
    octave: randomOctave,
    correct: false,
    full_note: `${randomNote}${randomOctave}`,
  });

  playNote(`${randomNote}${randomOctave}`);
}

function nextNote(selected_note: string) {
  if (selected_note === rounds.value.at(-1)?.note) store.incrementScore();

  if (rounds.value.length >= max_round.value) {
    store.setFinished(true);
    return;
  }

  playRandomNote();
}
</script>

<template>
  <div
    class="flex flex-col w-screen h-screen items-center justify-center bg-neutral-900 text-white"
  >
    <Waiting v-if="currently_playing" />
    <Scoreboard v-else-if="finished" />
    <Game v-else-if="rounds.length" @next="(note) => nextNote(note)" />
    <Home v-else @start="playRandomNote" />
  </div>
</template>
