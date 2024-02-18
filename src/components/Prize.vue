<script setup>

import {onMounted, ref} from "vue";
import {getPrize} from "@/lib/prizeService.js";
import ConfettiExplosion from "vue-confetti-explosion";
import {useGameStore} from "@/stores/game.js";
import {useToast} from "primevue/usetoast";

const store = useGameStore();
const toast = useToast();
const locationUrl = ref('');

onMounted( async () => {
  try {
    const { data } = await getPrize();
    if(data) locationUrl.value = data[0].location_url;
  } catch (error){
    toast.add({severity: 'error', summary: 'Error', detail: 'Error al obtener el premio'});
  }
});

</script>

<template>
  <div class="absolute left-2/4">
    <ConfettiExplosion/>
  </div>
  <section class="min-h-dvh p-8 flex flex-col gap-6 items-center justify-center">
    <h1 class="text-center text-[clamp(38px,5vw,56px)] tracking-wide text-cvd">
      FELICITACIONES, ERES EL GANADOR
    </h1>
    <p class="text-center text-[clamp(14px,5vw,22px)] text-[#EEEEEE]">¡Corre rápido antes que alguien te gane!</p>
    <div class="maps-wrapper">
      <iframe
          :src="locationUrl"
          width="600"
          height="450"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
    <!-- Button for testing purposes. It will be removed -->
    <Button
        label="Reiniciar"
        size="small"
        @click="store.resetAttempts"
    />
  </section>
</template>

<style scoped>
  .maps-wrapper {
    position: relative;
    padding-bottom: 44%;
    height: 0;
    overflow: hidden;
    max-width: 980px;
    max-height: 500px;
    margin: 0 auto;
    width: 100%;
  }

  .maps-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 980px;
    max-height: 500px;
    margin: 0 auto;
    width: 100% !important;
    height: 100% !important;
  }

  @media (width < 768px) {
    .maps-wrapper {
      padding-bottom: 80%;
    }
  }
</style>