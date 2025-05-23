import { PreferencesContainer } from "@/modules/Preferences/containers/containers";

export default function PreferencesPage() {
  return (
    <div className="flex-1 p-4 md:p-6">
      <PreferencesContainer
        title="Preferences"
        description="Manage your account preferences and settings."
      />
    </div>
  );
}
