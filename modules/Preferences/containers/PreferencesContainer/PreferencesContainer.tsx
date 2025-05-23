import React from "react";
import { PreferencesForm } from "../../components/preferences-form";

const PreferencesContainer = () => {
  return (
    <div>
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-2xl font-bold tracking-tight text-[#7B57E0]">Preferences</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and settings.
        </p>
      </div>
      <PreferencesForm />
    </div>
  );
};

export default PreferencesContainer;
