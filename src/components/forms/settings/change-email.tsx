import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { CircleCheck, MailCheck } from "lucide-react";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { CHNAGE_EMAIL } from "@/api/settings/email-change/email-change";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const formSchema = z.object({
  newEmail: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a valid email address",
    })
    .email("Invalid email format"),
});

export default function ChangeEmailForm() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newEmail: user?.email || "",
    },
  });

  const [showDialog, setShowDialog] = useState(false);
  const [pendingData, setPendingData] = useState<z.infer<typeof formSchema> | null>(null);

  async function handleConfirmChange() {
    if (!pendingData) return;
    try {
      const res = await dispatch(CHNAGE_EMAIL(pendingData));
      console.log(res);
    } catch (error) {
      console.error("Email change error", error);
      toast.error("Failed to change email.");
    } finally {
      setPendingData(null);
      setShowDialog(false);
    }
  }

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    setPendingData(values);
    setShowDialog(true);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-8 max-w-3xl py-10"
        >
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="abc@gmail.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer">
            <MailCheck className="h-3 w-3 mr-2" />
            Change Email
          </Button>
        </form>
      </Form>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will update your account email to <strong>{pendingData?.newEmail}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDialog(false)} className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmChange} className="cursor-pointer">
             <CircleCheck className="h-3 w-3"/>
              Yes, Change 
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
