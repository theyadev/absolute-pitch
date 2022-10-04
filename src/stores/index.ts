import { defineStore } from "pinia";
import { computed, ref } from "vue";

// Types
interface Round {
  note: string;
  octave: number;
  correct: boolean;
  full_note: string;
  answer: string;
}

export const useStore = defineStore("main", () => {
  const notes = ref(["C", "D", "E", "F", "G", "A", "B"]);
  const french_notes = ref<{ [key: string]: string }>({
    C: "Do",
    D: "Ré",
    E: "Mi",
    F: "Fa",
    G: "Sol",
    A: "La",
    B: "Si",
  });

  const suffixes = ref(["", "#", "b"]);

  const difficulties = ref([
    { name: "Easy", octaves: [4], suffixes: [0], notes: [0, 1, 2] },
    { name: "Medium", octaves: [4], suffixes: [0], notes: [0, 1, 2, 3, 4] },
    {
      name: "Advanced",
      octaves: [4],
      suffixes: [0],
      notes: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      name: "Hard",
      octaves: [4],
      suffixes: [0, 1],
      notes: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      name: "Expert",
      octaves: [3, 4, 5],
      suffixes: [0, 1],
      notes: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      name: "Impossible",
      octaves: [2, 3, 4, 5, 6],
      suffixes: [0, 1],
      notes: [0, 1, 2, 3, 4, 5, 6],
    },
  ]);

  const difficulty = ref(1);

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
    setCorrect(true);
  }

  function setAnswer(answer: string) {
    rounds.value[rounds.value.length - 1].answer = answer;
  }

  function setFinished(value: boolean) {
    finished.value = value;
  }

  function setMaxRound(value: number) {
    if (value > 30 || value < 1) return;
    max_round.value = value;
  }

  function setCheat(value: boolean) {
    cheat.value = value;
  }
  function setDifficulty(value: number) {
    difficulty.value = value;
  }

  function setCorrect(value: boolean) {
    rounds.value[rounds.value.length - 1].correct = value;
  }

  const all_notes = computed(() => {
    const current_difficulty = difficulties.value[difficulty.value];

    const difficulty_notes = current_difficulty.notes.map(
      (i) => notes.value[i]
    );
    const difficulty_suffixes = current_difficulty.suffixes.map(
      (i) => suffixes.value[i]
    );

    return difficulty_notes.flatMap((note) =>
      difficulty_suffixes.map((suffix) => note + suffix)
    );
  });
  function convertToFrench(note: string) {
    return (
      french_notes.value[note.slice(0, 1)] +
      note.slice(1).replace("b", "♭").replace("#", "♯")
    );
  }
  return {
    notes,
    suffixes,
    rounds,
    max_round,
    finished,
    score,
    cheat,
    french_notes,
    use_french,
    difficulty,
    difficulties,
    all_notes,

    addRound,
    incrementScore,
    setFinished,
    reset,
    setMaxRound,
    setCheat,
    setDifficulty,
    setAnswer,
    setCorrect,
    convertToFrench
  };
});
