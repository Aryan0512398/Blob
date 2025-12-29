import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Pressable } from 'react-native';

import { useAuthStore } from '@/store/authStore';

const providers = [
  { label: 'Continue with Google', accent: 'bg-red-500' },
  { label: 'Continue with GitHub', accent: 'bg-slate-600' },
];

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    login();
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView
      className="flex-1 bg-neutral-100 dark:bg-neutral-950"
      edges={['top', 'left', 'right']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 32 }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View className="items-center gap-3">
          <Text className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Welcome back
          </Text>
          <Text className="text-center text-3xl font-black text-neutral-900 dark:text-neutral-50">
            Sign in to sync your workspace
          </Text>
          <Text className="max-w-[320px] text-center text-base leading-6 text-neutral-600 dark:text-neutral-400">
            Connect any provider below to access your saved flashcards, quizzes, and AI notes.
          </Text>
        </View>

        <View className="mt-10 gap-4">
          {providers.map(({ label, accent }) => (
            <View
              key={label}
              className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-900">
              <Text className="flex-1 text-base font-medium text-neutral-800 dark:text-neutral-200">
                {label}
              </Text>
              <View className={`ml-4 h-10 w-10 items-center justify-center rounded-full ${accent}`}>
                <Text className="text-xs font-semibold uppercase text-white">Go</Text>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-10 gap-3">
          <Pressable
            className="h-14 items-center justify-center rounded-full bg-emerald-500"
            style={({ pressed }) => ({ backgroundColor: pressed ? '#059669' : '#10b981' })}
            onPress={handleLogin}>
            <Text className="text-lg font-semibold uppercase tracking-wide text-white">
              Enter app
            </Text>
          </Pressable>
          <Pressable
            className="h-12 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700"
            onPress={() => router.back()}>
            <Text className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              Explore the welcome screen again
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
