import React from "react";
import { PreferencesForm } from "../../components/preferences-form";

const PreferencesContainer = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Preferences</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and settings.
        </p>
      </div>
      <PreferencesForm />
    </div>
  );
};

export default PreferencesContainer;
