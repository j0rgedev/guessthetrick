<script setup>
import {Countdown} from 'vue3-flip-countdown'
import {useAttemptStore} from "@/stores/attempt.js";

const store = useAttemptStore();
</script>

<template>
  <section class="p-8 flex flex-col gap-6 items-center justify-center">
    <h1 class="text-center text-[clamp(26px,5vw,56px)] tracking-wide text-cvd">
      Oh no, se te acabaron los intentos :C
    </h1>
    <p>Próxima fecha</p>
    <Countdown
        labelColor="#cfcfcf"
    />
    <Button
        label="Reiniciar"
        size="small"
        @click="store.resetAttempts"
    />
  </section>
</template>