<script setup lang="ts">
import * as Tone from "tone";
import { ref } from "vue";

// Components
import Home from "./components/Home.vue";
import Scoreboard from "./components/Scoreboard.vue";
import Waiting from "./components/Waiting.vue";
import Game from "./components/Game.vue";

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

// Types
interface Round {
  note: string;
  octave: number;
  correct: boolean;
  full_note: string;
}

// Variables
const notes = ref(["C", "D", "E", "F", "G", "A", "B"]);
const suffixes = ref(["", "#", "b"]);

const all_octaves = ref([1, 2, 3, 4, 5, 6, 7, 8]);
const all_notes = ref<string[]>(
  notes.value.flatMap((note) => suffixes.value.map((suffix) => note + suffix))
);

const currently_playing = ref<boolean>(false);

const rounds = ref<Round[]>([]);
const max_round = ref<number>(5);
const finished = ref<boolean>(false);
const score = ref<number>(0);

const random_notes = ref<string[]>([]);

// Functions
function getRandomValue<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function playNote(note: string) {
  currently_playing.value = true;
  wait(500).then(() => {
    currently_playing.value = false;
    random_notes.value = getRandomNotes();
  });
  piano.triggerAttackRelease(note, "2n");
}

function playRandomNote() {
  const randomNote = getRandomValue(all_notes.value);
  const randomOctave = getRandomValue(all_octaves.value);

  rounds.value.push({
    note: randomNote,
    octave: randomOctave,
    correct: false,
    full_note: `${randomNote}${randomOctave}`,
  });

  playNote(`${randomNote}${randomOctave}`);
}

function nextNote(selected_note: string) {
  if (selected_note === rounds.value.at(-1)?.full_note) score.value += 1;

  if (rounds.value.length >= max_round.value) return (finished.value = true);

  playRandomNote();
}

function random() {
  return Math.random() - 0.5;
}

function getRandomNotes() {
  const round = rounds.value.at(-1);

  console.log(round);

  if (!round) return [];

  const octaves = [
    round.octave === 1 ? 3 : round.octave - 1,
    round.octave,
    round.octave === 9 ? 7 : round.octave + 1,
  ];

  const random_notes = all_notes.value
    .filter((n) => n != round.note)
    .sort(random)
    .slice(0, 9);

  const notes = random_notes.map((n) => {
    const octave = getRandomValue(octaves);

    return `${n}${octave}`;
  });

  notes.push(round.full_note);

  return notes.sort(random);
}
</script>

<template>
  <div class="flex flex-col w-screen h-screen items-center justify-center bg-neutral-900 text-white">
    <Waiting v-if="currently_playing" />
    <Scoreboard
      v-else-if="finished"
      :score="score"
      :max_score="rounds.length"
      @restart="
        rounds = [];
        finished = false;
      "
    />
    <Game
      v-else-if="rounds.length"
      :notes="getRandomNotes()"
      :answer="(rounds.at(-1) as Round).full_note"
      @next="(note) => nextNote(note)"
    />
    <Home v-else @start="playRandomNote" />
  </div>
</template>
