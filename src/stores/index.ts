import { defineStore } from "pinia";
import { ref } from "vue";

// Types
interface Round {
  note: string;
  octave: number;
  correct: boolean;
  full_note: string;
}

export const useStore = defineStore("main", () => {
  const notes = ref(["C", "D", "E", "F", "G", "A", "B"]);
  const french_notes = ref<{[key: string]: string}>({
    C: "Do",
    D: "Ré",
    E: "Mi",
    F: "Fa",
    G: "Sol",
    A: "La",
    B: "Si",
  });

  const suffixes = ref(["", "#", "b"]);

  const all_octaves = ref([3, 4, 5]);
  const all_notes = ref<string[]>(
    notes.value.flatMap((note) => suffixes.value.map((suffix) => note + suffix))
  );

  const rounds = ref<Round[]>([]);
  const max_round = ref<number>(5);
  const finished = ref<boolean>(false);
  const score = ref<number>(0);

  const cheat = ref<boolean>(false);
  const use_french = ref<boolean>(false);

  function addRound(round: Round) {
    rounds.value.push(round);
  }

  function reset() {
    rounds.value = [];
    finished.value = false;
    score.value = 0;
  }

  function incrementScore() {
    score.value += 1;
  }

  function setFinished(value: boolean) {
    finished.value = value;
  }

  function setMaxRound(value: number) {
    if (value > 30 || value < 1) return
    max_round.value = value;
  }

  function toggleOctave(octave: number) {
    if (all_octaves.value.includes(octave)) {
      all_octaves.value = all_octaves.value.filter((o) => o !== octave);
    } else {
      all_octaves.value.push(octave);
    }
  }
  function setCheat(value: boolean) {
    cheat.value = value;
  }

  return {
    notes,
    suffixes,
    all_octaves,
    all_notes,
    rounds,
    max_round,
    finished,
    score,
    cheat,
    french_notes,
    use_french,

    addRound,
    incrementScore,
    setFinished,
    reset,
    setMaxRound,
    toggleOctave,
    setCheat,
  };
});
