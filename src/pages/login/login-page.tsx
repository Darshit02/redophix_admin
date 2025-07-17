import { LoginForm } from "@/components/forms/auth/login-form";
import Silk from "@/components/globle/Silk";
// import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Silk />
      </div>
      
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Header */}
        {/* <div className="p-4 sm:p-6 flex-shrink-0">
          <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors backdrop-blur-sm bg-black/20 px-3 py-2 rounded-lg">
            <ArrowLeft className="size-4" />
            Back
          </button>
        </div> */}

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-md">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-5 sm:mb-7">
              <div className="bg-black/40 backdrop-blur-md p-3 sm:p-5 rounded-2xl border border-white/10">
                <div className="w-7 h-7 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-6 sm:h-6 bg-white/40 rounded-full"></div>
                </div>
              </div>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}