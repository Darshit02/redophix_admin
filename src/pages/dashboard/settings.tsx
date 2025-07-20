import ChangeEmailForm from "@/components/forms/settings/change-email";
import ChangePasswordForm from "@/components/forms/settings/change-password";
import DarkModetoggle from "@/components/globle/settings/dark-mode";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="flex flex-col h-full">
      <p className="text-md text-gray-400 mb-3">
        Manage your account settings and preferences here.
      </p>
      <Separator />
      <div className="flex-1 mt-4">
        {/* Settings content goes here */}
        <p className="text-md text-gray-400 mb-1">
          Change Email and Password. Other settings
        </p>
        <div className="flex-1 justify-start items-start">
          <div className="max-w-md">
            <ChangeEmailForm />
          </div>
          <div className="flex-1 justify-start items-start">
            <div className="max-w-md">
              <ChangePasswordForm />
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <p className="text-md text-gray-400 mb-3">Select or customize your UI theme</p>
        <DarkModetoggle />
      </div>
    </div>
  );
};

export default Settings;
