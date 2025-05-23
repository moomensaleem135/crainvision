import { PreferencesContainer } from "@/modules/Preferences/containers/containers";

export default function PreferencesPage() {
  return (
    <div className="flex-1 p-4 md:p-6 max-w-screen-xl mx-auto">
      <PreferencesContainer
        title="👋 Welcome to Crain Vision"
        description="Let's set up your preferences to personalize your experience. You can always change these later."
        comeFrom={"register"}
      />
    </div>
  );
}
