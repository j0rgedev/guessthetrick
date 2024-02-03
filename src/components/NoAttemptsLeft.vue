<script setup>
import {Countdown} from 'vue3-flip-countdown'
import {useGameStore} from "@/stores/game.js";

const store = useGameStore();
</script>

<template>
  <section class="min-h-dvh p-8 flex flex-col gap-6 items-center justify-center">
    <h1 class="text-center text-[clamp(26px,5vw,52px)] tracking-wide text-cvd">
      Oh no, se te acabaron los intentos
    </h1>
    <p class="text-center text-[clamp(14px,5vw,24px)]">Próxima fecha</p>
    <Countdown
        labelColor="#cfcfcf"
    />
    <!-- Button for testing purposes. It will be removed -->
    <Button
        label="Reiniciar"
        size="small"
        @click="store.resetAttempts"
    />
  </section>
</template>