import { create } from "zustand";
import { QuizCategory, Question } from "../data/quetions";

interface QuizState {
  currentCategory: QuizCategory | null;
  currentQuestionIndex: number;
  selectedAnswers: Record<number, string>;
  score: number;
  setCategory: (category: QuizCategory) => void;
  setAnswer: (questionId: number, answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  calculateScore: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  currentCategory: null,
  currentQuestionIndex: 0,
  selectedAnswers: {},
  score: 0,

  setCategory: (category) => {
    set({
      currentCategory: category,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      score: 0,
    });
  },

  setAnswer: (questionId, answer) => {
    set((state) => ({
      selectedAnswers: { ...state.selectedAnswers, [questionId]: answer },
    }));
  },

  nextQuestion: () => {
    set((state) => ({
      currentQuestionIndex: Math.min(
        (state.currentCategory?.questions.length || 1) - 1,
        state.currentQuestionIndex + 1
      ),
    }));
  },

  previousQuestion: () => {
    set((state) => ({
      currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
    }));
  },

  calculateScore: () => {
    const state = get();
    if (!state.currentCategory) return;

    const correct = state.currentCategory.questions.reduce((acc, question) => {
      return (
        acc +
        (state.selectedAnswers[question.id] === question.correctAnswer ? 1 : 0)
      );
    }, 0);

    set({ score: correct });
  },

  resetQuiz: () => {
    set({ currentQuestionIndex: 0, selectedAnswers: {}, score: 0 });
  },
}));
