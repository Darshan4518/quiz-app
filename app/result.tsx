import React from "react";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useQuizStore } from "@/store/useQuizeStore";

export default function Result() {
  const router = useRouter();
  const { score, currentCategory, resetQuiz } = useQuizStore();

  if (!currentCategory) {
    router.replace("/");
    return null;
  }

  const totalQuestions = currentCategory.questions.length;
  const percentage = (score / totalQuestions) * 100;

  const handleBackToHome = () => {
    resetQuiz();
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="flex-1 items-center justify-center">
        <View className="w-48 h-48 rounded-full bg-blue-500 items-center justify-center mb-8">
          <Text className="text-white text-4xl font-bold">
            {score}/{totalQuestions}
          </Text>
          <Text className="text-white text-xl">{percentage.toFixed(0)}%</Text>
        </View>

        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Quiz Completed!
        </Text>
        <Text className="text-xl text-gray-600 text-center mb-8">
          You've completed the {currentCategory.name} quiz
        </Text>

        <View className="w-full space-y-4 flex-col gap-4">
          <Pressable
            className="w-full bg-green-500 p-4 rounded-lg flex-row items-center justify-center"
            onPress={() => {
              resetQuiz();
              router.push("/quiz");
            }}
          >
            <Feather
              name="refresh-cw"
              size={24}
              color="white"
              className="mr-2"
            />
            <Text className="text-white text-center font-semibold text-lg">
              Retake Quiz
            </Text>
          </Pressable>

          <Pressable
            className="w-full bg-gray-200 p-4 rounded-lg flex-row items-center justify-center"
            onPress={handleBackToHome}
          >
            <Feather name="home" size={24} color="black" className="mr-2" />
            <Text className="text-gray-800 text-center font-semibold text-lg">
              Back to Home
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
