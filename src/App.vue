<script setup lang="ts">
import * as Tone from "tone";
import { ref } from "vue";

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

const notes = ref(["C", "D", "E", "F", "G", "A", "B"]);
const suffixes = ref(["", "#", "b"]);

const all_octaves = ref(["1", "2", "3", "4", "5", "6", "7", "8"]);
const all_notes = ref<string[]>(
  notes.value.flatMap((note) => suffixes.value.map((suffix) => note + suffix))
);

const timeout = ref<number>(1000);

function getRandomValue<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function playNote(note: string) {
  piano.triggerAttackRelease(note, "2n");
}

function playRandomNote() {
  const randomNote = getRandomValue(all_notes.value);
  const randomOctave = getRandomValue(all_octaves.value);
  console.log(randomNote + randomOctave);
  playNote(`${randomNote}${randomOctave}`);
}

function playRandomNotes(n: number) {
  if (Math.random() < 0.001) return playMegalovania();

  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      playRandomNote();
    }, i * timeout.value);
  }
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function playMegalovania() {
  playNote("D4");
  await wait(100);
  playNote("D4");
  await wait(200);
  playNote("D5");
  await wait(300);
  playNote("A4");
  await wait(400);
  playNote("G#4");
  await wait(300);
  playNote("G4");
  await wait(300);
  playNote("F4");
  await wait(250);
  playNote("D4");
  await wait(150);
  playNote("F4");
  await wait(150);
  playNote("G4");
}
</script>

<template>
  <div
    class="flex flex-col w-screen h-screen items-center justify-center gap-4"
  >
    <label for="timeout">Timeout</label>
    <input
      v-model="timeout"
      name="timeout"
      type="text"
      class="px-4 py-1 border focus-visible:outline-none rounded focus-visible:border-black/50 focus-visible:scale-110 transition-all duration-500"
    />
    <label for="notes">Octaves</label>
    <input
      @change="(e) => all_octaves = (e.target as HTMLInputElement).value.split(',')"
      :value="all_octaves.join(',')"
      name="octaves"
      type="text"
      class="px-4 py-1 border focus-visible:outline-none rounded focus-visible:border-black/50 focus-visible:scale-110 transition-all duration-500"
    />
    <label for="notes">Notes</label>
    <input
      @change="(e) => all_notes = (e.target as HTMLInputElement).value.split(',')"
      :value="all_notes.join(',')"
      name="notes"
      type="text"
      class="px-4 py-1 border focus-visible:outline-none rounded focus-visible:border-black/50 focus-visible:scale-110 transition-all duration-500"
    />
    <button class="bg-slate-500/30 px-6 py-2 rounded" @click="playRandomNote()">
      Play random note
    </button>
    <button
      class="bg-slate-500/30 px-6 py-2 rounded"
      @click="playRandomNotes(10)"
    >
      Play 10 random note
    </button>
  </div>
</template>
