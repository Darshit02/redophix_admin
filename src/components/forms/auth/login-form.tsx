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

export function LoginForm() {
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
      localStorage.setItem(
        "login-credentials",
        JSON.stringify({ email: values.email, password: values.password })
      );
    } else {
      localStorage.removeItem("login-credentials");
    }

    try {
      const data: any = await login({
        email: values.email,
        password: values.password,
      });

      const sessionExpiry = Date.now() + 7 * 24 * 3600 * 1000;
      dispatch(
        setUser({
          user: data,
          accessToken: data.access_token,
          sessionExpiry,
        })
      );
      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid credentials.");
    }
  };

  return (
    <div className="w-full max-w-max mx-auto px-4">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8">
        <div className="text-center mb-6 space-y-1">
          <h2 className="text-2xl font-semibold text-gray-800">Sign in</h2>
          <p className="text-sm text-gray-500">Enter your credentials below</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...field}
                      className="h-10 b border border-gray-300 text-gray-900 placeholder:text-gray-600 focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
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
                      placeholder="Password"
                      {...field}
                      className="h-10 border-gray-300 text-gray-900 placeholder:text-gray-600 focus:ring-primary focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-10 bg-primary cursor-pointer text-white"
            >
              Sign in
            </Button>

            <p className="text-xs text-center text-gray-500">
              By signing in, you agree to our{" "}
              <a
                href="#"
                className="underline text-gray-700 hover:text-black"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline text-gray-700 hover:text-black"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
