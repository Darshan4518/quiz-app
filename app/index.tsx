import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Animated,
  Dimensions,
  FlatList,
} from "react-native";
import { Link } from "expo-router";
import { quizData } from "@/data/quetions";
import { useQuizStore } from "@/store/useQuizeStore";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const setCategory = useQuizStore((state) => state.setCategory);
  const scrollY = useRef(new Animated.Value(0)).current;

  const filteredCategories = quizData.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [100, 50],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const featuredQuiz = quizData[Math.floor(Math.random() * quizData.length)];

  return (
    <View className="flex-1 bg-white">
      <Animated.View
        style={{ height: headerHeight, opacity: headerOpacity }}
        className="bg-blue-500 justify-end p-4"
      >
        <Text className="text-3xl font-bold text-white mb-2">Quiz App</Text>
        <Text className="text-white text-lg">Test your knowledge</Text>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View className="p-4">
          {/* Search Bar */}
          <View className="flex-row items-center mb-6 bg-gray-100 rounded-full p-2">
            <Feather name="search" size={20} color="gray" className="mr-2" />
            <TextInput
              placeholder="Search categories..."
              className="flex-1 px-3 py-2 text-gray-800"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Featured Quiz */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-4">
              Featured Quiz
            </Text>
            <Pressable
              className="bg-blue-500 rounded-lg p-4 shadow-md"
              onPress={() => setCategory(featuredQuiz)}
            >
              <Text className="text-white text-xl font-bold mb-2">
                {featuredQuiz.name}
              </Text>
              <Text className="text-white">
                {featuredQuiz.questionCount} Questions
              </Text>
            </Pressable>
          </View>

          {/* Categories */}
          <Text className="text-lg font-semibold text-gray-700 mb-4">
            Categories
          </Text>
          {filteredCategories.map((category, index) => (
            <Link key={category.id} href="/quiz" asChild>
              <Pressable
                className="flex-row items-center p-4 bg-gray-50 rounded-lg mb-3 shadow-md"
                onPress={() => setCategory(category)}
              >
                <Image
                  source={category?.icon as any}
                  width={80}
                  height={80}
                  className="max-w-9 max-h-9 object-cover mr-4"
                />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800">
                    {category.name}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {category.questionCount} Questions
                  </Text>
                </View>
                <Feather name="chevron-right" size={24} color="gray" />
              </Pressable>
            </Link>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
