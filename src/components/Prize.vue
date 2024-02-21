<script setup>

import {onMounted, reactive} from "vue";
import {getPrize} from "@/lib/prizeService.js";
import {useGameStore} from "@/stores/game.js";
import {useToast} from "primevue/usetoast";
import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();
const store = useGameStore();
const toast = useToast();
const prize = reactive({
  locationUrl: '',
  locationPhoto: ''
});

onMounted(async () => {
  jsConfetti.addConfetti({
    confettiRadius: 14,
    emojis: ['🎉']
  });
  try {
    const {data} = await getPrize(store.trickId);
    if (data) {
      prize.locationUrl = data[0].location_url;
      prize.locationPhoto = data[0].location_photo;
    }
  } catch (error) {
    console.log(error)
    toast.add({severity: 'error', summary: 'Error', detail: 'Error al obtener el premio'});
  }
});


</script>

<template>
  <section class="min-h-dvh p-8 flex flex-col gap-6 items-center justify-center relative">
    <h1 class="text-center text-[clamp(38px,5vw,56px)] tracking-wide text-cvd">
      FELICITACIONES, ERES EL GANADOR
    </h1>
    <p class="text-center text-[clamp(14px,5vw,22px)] text-[#EEEEEE]">¡Corre rápido antes que alguien te gane!</p>
    <div class="maps-wrapper">
      <iframe
          :src="prize.locationUrl"
          width="600"
          height="450"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
    <div
        class="w-100 flex flex-col justify-center items-center absolute inset-x-0 text-3xl bottom-0 animate-bounce xl:bottom-16">
      👇
    </div>
  </section>
  <section class="w-full p-8 mt-8 flex flex-col justify-center items-center gap-8">
    <div class="max-h-[400px] sm:max-h-[500px] md:max-h-[600px] w-full md:w-3/4 flex justify-center overflow-hidden">
      <Image
          :src="prize.locationPhoto"
          class="max-h-[400px] sm:max-h-[500px] md:max-h-[600px] w-auto"
          alt="prize_photo"
          preview
      />
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