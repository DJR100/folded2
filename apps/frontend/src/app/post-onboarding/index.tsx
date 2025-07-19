import { router } from "expo-router";

import { OnboardingLayout } from "@/components/layouts/onboarding";
import { Text } from "@/components/ui";
import { useAuthContext } from "@/hooks/use-auth-context";

export default function Onboarding() {
  const { setPostOnboarding } = useAuthContext();

  return (
    <OnboardingLayout
      title="Thanks for joining"
      button={{
        text: "Go to dashboard",
        onPress: () => {
          router.push("/dashboard");
          setPostOnboarding("DONE");
        },
      }}
    >
      <Text>You can now continue through to the dashboard.</Text>
    </OnboardingLayout>
  );
}
