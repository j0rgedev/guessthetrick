import { defineStore } from 'pinia';

export const useAttemptStore = defineStore('attempts', {
    state: () => ({
        attempts: 0,
    }),
    actions: {
        incrementAttempts() {
            this.attempts++;
            this.saveAttemptsToLocalStorage();
        },
        resetAttempts() {
            this.attempts = 0;
            this.saveAttemptsToLocalStorage();
        },
        loadAttemptsFromLocalStorage() {
            const storedAttempts = localStorage.getItem('attempts');
            if (storedAttempts) {
                this.attempts = parseInt(storedAttempts, 10)
            }
        },
        saveAttemptsToLocalStorage() {
            localStorage.setItem('attempts', this.attempts);
        },
    },
});
