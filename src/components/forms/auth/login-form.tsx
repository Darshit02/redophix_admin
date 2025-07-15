import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { useLoginMutation } from "@/api/auth";
import { AuthSchema } from "./schema";
import { setUser } from "@/store/user/authSlice";
import { PasswordInput } from "@/components/globle/password-input";
import { useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { mutateAsync: login } = useLoginMutation();

  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  useEffect(() => {
    const storedCredentials = localStorage.getItem("login-credentials");
    if (storedCredentials) {
      const { email, password } = JSON.parse(storedCredentials);
      form.setValue("email", email);
      form.setValue("password", password);
      form.setValue("remember_me", true);
    }
  }, [form]);

  const onSubmit = async (values: z.infer<typeof AuthSchema>) => {
    if (values.remember_me) {
      // Store credentials in local storage
      localStorage.setItem(
        "login-credentials",
        JSON.stringify({ email: values.email, password: values.password })
      );
    } else {
      // Clear stored credentials if "Remember Me" is unchecked
      localStorage.removeItem("login-credentials");
    }

    login({
      email: values.email,
      password: values.password,
    })
      .then((data: any) => {
        const sessionExpiry = Date.now() + 7 * 24 * 3600 * 1000; //7 days in milliseconds
        dispatch(
          setUser({
            user: data,
            accessToken: data.access_token,
            sessionExpiry,
          })
        );
        toast.success("Login successful!");
        navigate("/dashboard");
      })
      .catch((error: Error) => {
        console.error("Login failed:", error);
        toast.error("Login failed, please check your credentials.");
      });
  };
  return (
    <div className="w-full max-w-lg mx-auto px-3">
      {/* Glass card container */}
      <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl">
      {/*  */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-5 w-full">
            <div className="text-center space-y-2">
              <h1 className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">
                Yooo, welcome back!
              </h1>
              <p className="text-white/70 text-sm">
                First time here? Sign up for free
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Your email"
                        type="email"
                        {...field}
                        className="bg-black/40 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:ring-white/30 h-10 sm:h-12 rounded-lg backdrop-blur-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        {...field}
                        className="bg-black/40 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:ring-white/30 h-10 sm:h-12 rounded-lg backdrop-blur-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-white/90 font-medium h-10 sm:h-12 rounded-lg shadow-lg transition-all duration-200"
            >
              Sign in
            </Button>

            <div className="text-center text-xs text-white/60 px-2">
              You acknowledge that you read, and agree to,{" "}
              <a href="#" className="text-white/80 hover:text-white underline">
                Terms of Service and our Privacy Policy
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}