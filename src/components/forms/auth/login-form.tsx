import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { useLoginMutation } from "@/api/auth";
import { AuthSchema } from "./schema";
import { setUser } from "@/store/user/authSlice";
import { PasswordInput } from "@/components/globle/password-input";
import { Checkbox } from "@/components/ui/checkbox";
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
        const sessionExpiry = Date.now() + 7 * 24 * 3600 * 1000; // 7 days in milliseconds
        dispatch(
          setUser({
            user: data,
            accessToken: data.access_token,
            sessionExpiry,
          })
        );
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      })
      .catch((error: Error) => {
        console.error("Login failed:", error);
        toast.error("Login failed, please check your credentials.");
      });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8  mx-auto"
      >
        <div className="flex flex-col items-center gap-2 text-center ">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormDescription>Please Enter your Email here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="password" {...field} />
              </FormControl>
              <FormDescription>Enter your password here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remember_me"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Remember Me</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
