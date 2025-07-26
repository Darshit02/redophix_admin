import { LoginForm } from "@/components/forms/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-gray-100 to-gray-200 relative overflow-hidden">
      {/* Optional gradient overlay if you want soft haze */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
            <div className="bg-white shadow-md p-4 sm:p-6 rounded-2xl border border-gray-200">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 sm:w-5 sm:h-5 bg-gray-400 rounded-full" />
              </div>
            </div>
            <div className="mt-3 text-sm sm:text-base text-gray-700 font-semibold">
              Redophix
            </div>
          </div>

          {/* Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
