import React, { useEffect } from "react";
import { View, Text, Pressable, ScrollView, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useQuizStore } from "@/store/useQuizeStore";

export default function Quiz() {
  const router = useRouter();
  const {
    currentCategory,
    currentQuestionIndex,
    selectedAnswers,
    setAnswer,
    nextQuestion,
    previousQuestion,
    calculateScore,
  } = useQuizStore();

  useEffect(() => {
    if (!currentCategory) {
      router.replace("/");
    }
  }, [currentCategory, router]);

  if (!currentCategory) {
    return null;
  }

  const currentQuestion = currentCategory.questions[currentQuestionIndex];
  const totalQuestions = currentCategory.questions.length;

  const handleAnswer = (answer: string) => {
    setAnswer(currentQuestion.id, answer);
  };

  const handleNext = () => {
    if (currentQuestionIndex === totalQuestions - 1) {
      calculateScore();
      router.push("/result");
    } else {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        <View className="flex-row justify-between items-center mb-6">
          <Pressable onPress={() => router.back()} className="p-2">
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
          <Text className="text-xl font-bold text-gray-800">
            {currentCategory.name} Quiz
          </Text>
          <Pressable onPress={() => router.push("/result")} className="p-2">
            <Text className="text-red-500 font-semibold">Quit</Text>
          </Pressable>
        </View>

        <View className="mb-6">
          <View className="h-2 bg-gray-200 rounded-full">
            <View
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
          <Text className="text-center mt-2 text-gray-600">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Text>
        </View>

        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            {currentQuestion.question}
          </Text>
          {currentQuestion.options.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => handleAnswer(option)}
              className={`p-4 rounded-lg border mb-3 ${
                selectedAnswers[currentQuestion.id] === option
                  ? "bg-blue-100 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-lg ${
                  selectedAnswers[currentQuestion.id] === option
                    ? "text-blue-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row justify-between p-4 bg-white border-t border-gray-200">
        <Pressable
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`px-6 py-3 rounded-lg ${
            currentQuestionIndex === 0 ? "bg-gray-300" : "bg-blue-500"
          }`}
        >
          <Text className="text-white font-semibold">Previous</Text>
        </Pressable>

        <Pressable
          onPress={handleNext}
          disabled={!selectedAnswers[currentQuestion.id]}
          className={`px-6 py-3 rounded-lg ${
            selectedAnswers[currentQuestion.id] ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <Text className="text-white font-semibold">
            {currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
