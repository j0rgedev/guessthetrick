import { defineStore } from 'pinia';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/localStorage.js';

export const useGameStore = defineStore('game', {
    state: () => ({
        attempts: getFromLocalStorage('attempts') || 0,
        winner: getFromLocalStorage('winner') || 0,
    }),
    actions: {
        incrementAttempts() {
            this.attempts++;
            this.persistState();
        },
        resetAttempts() {
            this.attempts = 0;
            this.winner = 0;
            this.persistState();
        },
        setWinner(winner) {
            this.winner = winner;
            this.persistState();
        },
        persistState() {
            setToLocalStorage('attempts', this.attempts);
            setToLocalStorage('winner', this.winner);
        },
    },
});