<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';

interface Props {
  answer: string;
  notes: string[];
}

interface Emits {
  (event: "next", selected_note: string): void;
}

defineEmits<Emits>()
defineProps<Props>()


const selected_note = ref<string>()

</script>

<template>
  <div>
    <span class="text-red-500">{{ answer }}</span>
    <div class="flex items-center flex-wrap justify-center gap-4 px-16">
      <div
        v-for="note in notes"
        :key="note"
        class="cursor-pointer bg-blue-400 px-2 py-1 rounded text-white"
        :class="selected_note === note ? 'bg-green-500' : ''"
        @click="selected_note = note"
      >
        {{ note }}
      </div>
    </div>

    <Button @click="$emit('next', selected_note)">Next</Button>
  </div>
</template>
