import ResetPasswordAlert from "@/components/forms/settings/alert-reset-password";
import ChangeEmailForm from "@/components/forms/settings/change-email";
import DarkModetoggle from "@/components/globle/settings/dark-mode";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LockKeyhole } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-full px-4 py-6 md:px-6">
      <div className="space-y-1 mb-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal information, security settings, and theme preferences.
        </p>
      </div>

      <Separator className="mb-6" />

      {/* Email & Password Section */}
      <section className="space-y-4 mb-10">
        <h2 className="text-lg font-medium text-foreground">Security</h2>
        <p className="text-sm text-muted-foreground mb-2">
          Update your email address or change your password.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:max-w-md space-y-4">
            <ChangeEmailForm />
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <LockKeyhole className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </div>
        </div>

        <ResetPasswordAlert open={open} setOpen={setOpen} />
      </section>

      <Separator className="mb-10" />

      {/* Theme Mode Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-foreground">Theme Preferences</h2>
        <p className="text-sm text-muted-foreground mb-2">
          Choose between light, dark, or system theme.
        </p>
        <DarkModetoggle />
      </section>
    </div>
  );
}
