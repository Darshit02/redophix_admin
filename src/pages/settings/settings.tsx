import ChangeEmailForm from "@/components/forms/settings/change-email";
import DarkModetoggle from "@/components/globle/settings/dark-mode";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LockKeyhole } from "lucide-react";

const Settings = () => {
  return (
    <div className="flex flex-col h-full px-4 py-6 md:px-6">
      <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 mb-3">
        Manage your account settings and preferences here.
      </p>

      <Separator />

      <div className="flex-1 mt-2 space-y-6">
        <div>
          <p className="text-sm md:text-base text-gray-800 dark:text-gray-400 mb-4">
            Change Email and Password
          </p>

          <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
            <div className="w-full md:max-w-md">
              <ChangeEmailForm />
              <Button className="cursor-pointer">
                <LockKeyhole className="h-3 w-3" />
                Change Password
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm md:text-base text-gray-800 dark:text-gray-400 mb-4">
            Select or customize your UI theme
          </p>
          <DarkModetoggle />
        </div>
      </div>
    </div>
  );
};

export default Settings;
