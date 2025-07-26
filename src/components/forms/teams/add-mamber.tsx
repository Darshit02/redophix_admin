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
import toast from "react-hot-toast";
import { PhoneInput } from "@/components/globle/phone-input";
import BackButton from "@/components/globle/back-button";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { ADD_TEAM_MEMBER } from "@/api/teams/team-mamber";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  mobile: z.string(),
  email: z.string().email(),
  designation: z.string().min(1),
  imgUrl: z.string().url(),
});

export default function AddMamber() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await dispatch(ADD_TEAM_MEMBER(values));
      toast.success("Member added successfully");
      navigate(-1);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const watchedFields = form.watch();


  return (
    <div className=" mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Add Team Member</h2>
        <BackButton />
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>Full name of the member.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Designation */}
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="UI/UX Designer, Developer, etc." {...field} />
                  </FormControl>
                  <FormDescription>Role in the team.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mobile */}
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} defaultCountry="IN" placeholder="Enter phone number" />
                  </FormControl>
                  <FormDescription>Include country code.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description (full width) */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Frontend developer with React and Tailwind skills" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image URL (full width) */}
            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourdomain.com/image.jpg" {...field} />
                  </FormControl>
                   <FormDescription>This will be displayed on the team card.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button (full width) */}
            <div className="md:col-span-2 flex justify-end ">
              <Button type="submit" className="cursor-pointer">Submit</Button>
            </div>
          </form>
        </Form>
        <div className="mt-10">
  <h3 className="text-lg font-semibold text-foreground mb-4">Live Preview</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
    {/* FRONT VIEW */}
    <div className="rounded-xl overflow-hidden shadow-md border border-border bg-card max-w-sm">
      <div className="w-full h-48 overflow-hidden bg-muted">
        {watchedFields.imgUrl ? (
          <img
            src={watchedFields.imgUrl}
            alt={watchedFields.name || "Preview"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="text-xl font-bold text-foreground">{watchedFields.name || "Name"}</h4>
        <p className="text-sm text-muted-foreground">{watchedFields.designation || "Designation"}</p>
      </div>
    </div>

    {/* BACK VIEW */}
    <div className="rounded-xl shadow-md border border-border bg-card p-4 max-w-sm flex flex-col justify-between">
      <div>
        <h4 className="text-xl font-bold text-foreground mb-1">
          {watchedFields.name || "Name"}
        </h4>
        <p className="text-sm text-muted-foreground mb-2">
          {watchedFields.designation || "Designation"} • {"India"}
        </p>
        <p className="text-xs text-muted-foreground break-all mb-1">
          {watchedFields.email || "email@example.com"}
        </p>
        <p className="text-xs text-muted-foreground break-all mb-1">
          {watchedFields.description || "Description about the member..."}
        </p>
      </div>
      <p className="text-xs text-muted-foreground break-all mt-4">
        {watchedFields.mobile || "+91 00000 00000"}
      </p>
    </div>
  </div>
</div>

  </div>
</div>

  );
}
