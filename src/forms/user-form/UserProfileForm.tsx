
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import LoadingButton from "@/components/LoadingButton";
import { User } from "@/types";

const formSchema = z.object({
  email: z.string().optional(), 
  name: z.string().min(1, "Name is required"), 
  addressLine1: z.string().min(1, "Address Line 1 is required"), 
  city: z.string().min(1, "City is required"), 
  country: z.string().min(1, "Country is required"), 
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User; 
  onSave: (userProfileData: UserFormData) => void; 
  isLoading: boolean; 
  title?: string;
  buttonText?: string; 
};

const UserProfileForm = ({
  onSave,
  isLoading,
  currentUser,
  title = "User Profile", 
  buttonText = "Submit", 
}: Props) => {

  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser, 
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)} 
        className="space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 rounded-xl shadow-2xl border border-gray-700 max-w-3xl mx-4 md:mx-auto my-8"
      >
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-2 tracking-wide">
            {title}
          </h2>
          <FormDescription className="text-gray-400 text-lg">
            View and change your profile information here.
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 text-base">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled 
                  className="bg-gray-700 text-gray-400 border border-gray-600 focus:border-blue-500 rounded-lg p-3 transition duration-200 ease-in-out"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 text-base">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-gray-700 text-white border border-gray-600 focus:border-blue-500 rounded-lg p-3 transition duration-200 ease-in-out placeholder-gray-500"
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-sm" /> 
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 text-base">Address Line 1</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-gray-700 text-white border border-gray-600 focus:border-blue-500 rounded-lg p-3 transition duration-200 ease-in-out placeholder-gray-500"
                    placeholder="e.g., 123 Main St"
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 text-base">City</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-gray-700 text-white border border-gray-600 focus:border-blue-500 rounded-lg p-3 transition duration-200 ease-in-out placeholder-gray-500"
                    placeholder="e.g., New York"
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 text-base">Country</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-gray-700 text-white border border-gray-600 focus:border-blue-500 rounded-lg p-3 transition duration-200 ease-in-out placeholder-gray-500"
                    placeholder="e.g., USA"
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-sm" />
              </FormItem>
            )}
          />
        </div>

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;

