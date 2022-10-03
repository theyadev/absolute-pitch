<script lang="ts" setup>
import Button from "./Button.vue";

import { useStore } from "../stores";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface Emits {
  (event: "start"): void;
}

defineEmits<Emits>();

const octaves = [1, 2, 3, 4, 5, 6, 7, 8];

const store = useStore();
</script>

<template>
  <div class="flex flex-col w-full px-16 md:px-64 gap-y-16">
    <div class="flex flex-col gap-y-2">
      <div class="flex items-center gap-x-2">
        <FontAwesomeIcon class="text-white" icon="gear" /><span>Settings</span>
      </div>
      <div class="w-full h-1 bg-white"></div>
      <div class="flex items-center gap-x-2 mt-4">
        <label class="uppercase font-semibold text-sm">Octaves:</label>
        <div class="flex gap-x-1 flex-wrap w-full">
          <div
            v-for="octave in octaves"
            class="aspect-square h-full flex items-center justify-center rounded border border-white"
            :class="
              store.all_octaves.includes(octave)
                ? 'text-purple-400 border-purple-400'
                : ''
            "
          >
            {{ octave }}
          </div>
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
