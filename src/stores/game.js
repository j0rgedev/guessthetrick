import { defineStore } from 'pinia';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/localStorage.js';

export const useGameStore = defineStore('game', {
    state: () => ({
        trickId: getFromLocalStorage('trickId') || null,
        attempts: getFromLocalStorage('attempts') || 0,
        winner: getFromLocalStorage('winner') || 0,
        dialogClosed: getFromLocalStorage('dialogClosed') || 0
    }),
    actions: {
        incrementAttempts() {
            this.attempts++;
            this.persistState();
        },
        resetAttempts() {
            this.attempts = 0;
            this.winner = 0;
            this.dialogClosed = 0;
            this.persistState();
        },
        setTrickId(trickId) {
            this.trickId = trickId;
            this.persistState();
        },
        setWinner(winner) {
            this.winner = winner;
            this.persistState();
        },
        setDialogClosed(dialogClosed) {
            this.dialogClosed = dialogClosed;
            this.persistState();
        },
        persistState() {
            setToLocalStorage('attempts', this.attempts);
            setToLocalStorage('winner', this.winner);
            setToLocalStorage('dialogClosed', this.dialogClosed);
            setToLocalStorage('trickId', this.trickId);
        },
    },
});