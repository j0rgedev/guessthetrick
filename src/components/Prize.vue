<script setup>

import {onMounted, ref} from "vue";
import {getPrize} from "@/lib/prizeService.js";

const locationUrl = ref('');

onMounted( async () => {
  const { data, error } = await getPrize();
  if (error) {
    console.error('Error al obtener el premio:', error.message);
  } else {
    locationUrl.value = data[0].location_url;
  }
});

</script>

<template>
  <section class="min-h-dvh p-8 flex flex-col gap-6 items-center justify-center">
    <h1 class="text-center text-[clamp(38px,5vw,56px)] tracking-wide text-cvd">
      Felicitaciones, eres el ganador
    </h1>
    <p class="text-center text-[clamp(14px,5vw,22px)] text-[#cfcfcf]">Corre rápido antes que alguien te gane!</p>
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