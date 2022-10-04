<script lang="ts" setup>
import Button from "./Button.vue";

import { useStore } from "../stores";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface Emits {
  (event: "start"): void;
}

defineEmits<Emits>();

const store = useStore();

function handleDifficuly(e: Event) {
  const target = e.target as HTMLInputElement;

  store.setDifficulty(parseInt(target.value));
}
</script>

<template>
  <div class="flex flex-col w-full px-16 md:px-64 gap-y-16">
    <div class="flex flex-col gap-y-2">
      <div class="flex items-center gap-x-2">
        <FontAwesomeIcon class="text-white" icon="gear" /><span>Settings</span>
      </div>
      <div class="w-full h-1 bg-white"></div>
      <div class="flex w-full items-center gap-x-4 mt-5">
        <label class="uppercase font-semibold text-sm w-1/4">Difficulty:</label>
        <div class="flex gap-1 flex-wrap w-full">
          <select
            class="bg-transparent focus-visible:outline-none border-2 border-white rounded px-2 py-0.5 flex items-center"
            name="difficulty"
            @change="handleDifficuly"
          >
            <option
              v-for="(difficulty, i) in store.difficulties"
              :value="i"
              :selected="store.difficulty === i"
            >
              {{ difficulty.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex items-center gap-x-4 mt-4">
        <label class="uppercase font-semibold text-sm w-1/4">Rounds: </label>
        <div class="flex gap-1 flex-wrap w-full">
          <Button @click="store.setMaxRound(store.max_round - 1)">
            <FontAwesomeIcon icon="arrow-left" />
          </Button>
          <input
            class="bg-transparent focus-visible:outline-none border-2 border-white rounded px-2 w-16"
            type="number"
            :value="store.max_round"
            disabled
            @input="
              store.setMaxRound(
                parseInt(($event.target as HTMLInputElement).value)
              )
            "
            max="30"
            min="1"
          />
          <Button @click="store.setMaxRound(store.max_round + 1)">
            <FontAwesomeIcon icon="arrow-right" />
          </Button>
        </div>
      </div>
      <div class="flex items-center gap-x-4 mt-4">
        <label class="uppercase font-semibold text-sm w-1/4">Cheat: </label>
        <div class="flex gap-1 flex-wrap w-full">
          <input type="checkbox" class="w-5 h-5" v-model="store.cheat" />
        </div>
      </div>
      <div class="flex items-center gap-x-4 mt-4">
        <label class="uppercase font-semibold text-sm w-1/4"
          >FR Notation:
        </label>
        <div class="flex gap-1 flex-wrap w-full">
          <input type="checkbox" class="w-5 h-5" v-model="store.use_french" />
        </div>
      </div>
    </div>
    <FontAwesomeIcon
      @click="$emit('start')"
      class="text-white text-9xl text-center mx-auto hover:text-purple-400 transition-colors duration-500 cursor-pointer"
      icon="play"
    />
  </div>
</template>
