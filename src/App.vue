<script setup>
  import Main from "@/components/Main.vue";
  import {computed, ref} from "vue";
  import Prize from "@/components/Prize.vue";
  import {useGameStore} from "@/stores/attempt.js";
  import NoAttemptsLeft from "@/components/NoAttemptsLeft.vue";
  import {getFromLocalStorage, setToLocalStorage} from "@/utils/localStorage.js";

  const store = useGameStore();

  const modalVisible = ref(false);
  const dialogClosed = ref(getFromLocalStorage('dialogClosed') || false);

  const onClose = (callback) => {
    callback();
    window.scrollTo(0, 0);
    dialogClosed.value = true;
    if(store.winner || store.attempts===3){
      setToLocalStorage('dialogClosed', dialogClosed.value);
    }
  }

  const component = computed(() => {
    return {
      showMain: !store.winner && store.attempts < 3,
      showPrize: store.winner && dialogClosed.value,
      showNoAttemptsLeft: (store.attempts === 3 && !store.winner) && dialogClosed.value,
    }
  })

  const results = computed(() => {
    if (store.winner) {
      return {
        title: '¡GANASTE!',
        description: 'Presiona el botón y verás la sorpresa 👀',
        button: 'Ver premio'
      };
    } else {
      return {
        title: 'TRUCO INCORRECTO',
        description:
            store.attempts === 3 ?
            '¡Oh no! Gracias por participar. Podrás volver a intentarlo en la próxima edición 😥' :
            '¡No te preocupes! Puedes volver a intentarlo 👍',
        button: 'Cerrar'
      };
    }
  });
</script>

<template>
  <Dialog
      v-model:visible="modalVisible"
      modal
      :style="{ width: '26rem', borderRadius: '24px', border: 'none' }" :breakpoints="{ '450px': '90vw' }"
      :pt="{
        mask: {
            style: 'backdrop-filter: blur(2px)'
        }
      }"
  >
    <template #container="{ closeCallback }">
      <div class="bg-gradient-to-b from-[#1D2944] to-[#0A0E17] rounded-3xl">
        <div class="flex flex-col justify-center items-center gap-4 p-6">
          <h1 class="text-center text-cvd text-[clamp(28px,3vw,34px)] leading-none tracking-wider">
            {{ results.title }}
          </h1>
          <p class="text-center text-[#FFF2EF] text-[clamp(14px,3vw,20px)] leading-none"> {{ results.description }} </p>
          <Button
              :label="results.button"
              size="small"
              @click="onClose(closeCallback)"
              outlined
          />
        </div>
      </div>
    </template>
  </Dialog>
  <main class="w-full h-full relative min-h-dvh overflow-visible">
    <div class="bg-image bg-hero"></div>
    <div class="bg-overlay"></div>
    <Main @results="modalVisible = true" class="main" v-if="component.showMain"/>
    <Prize v-if="component.showPrize" />
    <NoAttemptsLeft v-if="component.showNoAttemptsLeft"/>
  </main>
</template>

<style>
  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('./assets/images/bgimage.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: black;
    filter: blur(5px);
    opacity: 0.8;
    z-index: -5;
  }

  .bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -3;
  }
</style>