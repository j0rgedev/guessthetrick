<script setup>
import {useField, useForm} from 'vee-validate';
import {onMounted} from "vue";
import {ref} from "vue";
import {getTrick, guessTrick} from "@/lib/trickService.js";
import {useGameStore} from "@/stores/attempt.js";

const emit = defineEmits(['results'])
const store = useGameStore();

const trick = ref({});
const isCorrectGuess = ref(false);

onMounted(async () => {
  if (store.winner) {
    emit('results', true);
  } else {
    const {data, error} = await getTrick();
    if (error) {
      console.error('Error al obtener el truco:', error.message);
    } else {
      trick.value = data[0];
    }
  }

});

/*
*  Validations
*/

const {handleSubmit, resetForm} = useForm();
const {value, errorMessage} = useField('value', validateField);
const isLoading = ref(false);

function validateField(value) {
  if (!value) {
    return 'No te pases de vivo :P';
  }
  return true;
}

const onSubmit = handleSubmit(async (values) => {
  if (values.value && values.value.length > 0) {
    isLoading.value = true;
    try {
      const {winner, error} = await guessTrick(trick.value["id"], values.value);
      if (error) {
        console.error('Error al adivinar el truco:', error.message);
      }
      isCorrectGuess.value = winner;
    } finally {
      isLoading.value = false;
      emit('results');
      if (isCorrectGuess.value) {
        store.resetAttempts();
        store.setWinner(1);
      } else {
        store.incrementAttempts();
      }
      resetForm();
    }
  }
});
</script>
<template>
  <section class="min-h-dvh p-5 max-w-screen-md my-0 mx-auto flex flex-col gap-10 items-center justify-evenly">
    <h1 class="text-center text-[clamp(22px,5vw,38px)] tracking-wide">Adivina el truco y obtén las coordenadas para
      ganarte un premio</h1>
    <div class="my-0 mx-auto w-full max-w-2xl">
      <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;" class="w-full">
        <iframe :src="trick.video_url"
                width="1280" height="720"
                title="trick_clip"
                style="border:none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; max-width: 100%;">
        </iframe>
      </div>
    </div>
    <form @submit="onSubmit" class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <span class="p-float-label">
          <InputText
              id="value"
              v-model="value"
              type="text"
              size="large"
              :disabled="Object.keys(trick).length === 0 || isLoading"
              :class="{ 'p-invalid': errorMessage }"
              aria-describedby="text-error"
          />
          <label for="value">Nombre del truco</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
      </div>
      <Button
          type="submit"
          label="Adivinar"
          icon="pi pi-search"
          size="large"
          class="tracking-wider"
          :loading="isLoading"
          :disabled="Object.keys(trick).length === 0"
      />
    </form>
  </section>
</template>