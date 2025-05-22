import { PreferencesForm } from "@/components/preferences-form"

export default function PreferencesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Preferences</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings.</p>
      </div>
      <PreferencesForm />
    </div>
  )
}
