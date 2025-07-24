
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
import LoadingButton from "@/components/LoadingButton";
import { useParams } from "react-router-dom";
import { useCreateAdminUser, useUpdateAdminUser, useGetAdminUserById } from "@/api/AdminUserApi";
import { useEffect } from "react";

// Schema for creating a new user (email is required)
const createFormSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

// Schema for updating an existing user (email is optional and disabled)
const updateFormSchema = z.object({
  email: z.string().email("Invalid email address").optional(), // Optional for update, but will be pre-filled
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

type CreateUserFormData = z.infer<typeof createFormSchema>;
type UpdateUserFormData = z.infer<typeof updateFormSchema>;

const AdminUserForm = () => {
  const { id: auth0Id } = useParams(); // Get auth0Id from URL for edit mode
  const isEditMode = !!auth0Id;

  // Fetch user data only if in edit mode and auth0Id is available
  const { adminUser, isLoading: isFetchingUser } = useGetAdminUserById(auth0Id || "");
  const { createAdminUser, isLoading: isCreatingUser } = useCreateAdminUser();
  const { updateAdminUser, isLoading: isUpdatingUser } = useUpdateAdminUser();

  const form = useForm<CreateUserFormData | UpdateUserFormData>({
    resolver: zodResolver(isEditMode ? updateFormSchema : createFormSchema),
    defaultValues: {
      email: "",
      name: "",
      addressLine1: "",
      city: "",
      country: "",
    },
  });

  // Populate form with fetched user data in edit mode
  useEffect(() => {
    if (isEditMode && adminUser) {
      form.reset({
        email: adminUser.email,
        name: adminUser.name,
        addressLine1: adminUser.addressLine1,
        city: adminUser.city,
        country: adminUser.country,
      });
    }
  }, [isEditMode, adminUser, form]);

  const onSubmit = async (values: CreateUserFormData | UpdateUserFormData) => {
    if (isEditMode && auth0Id) {
      // For update, pass auth0Id from URL and form data
      await updateAdminUser({ auth0Id, formData: values as UpdateUserFormData });
    } else {
      // For creation, pass only form data
      await createAdminUser(values as CreateUserFormData);
    }
  };

  const isLoading = isCreatingUser || isUpdatingUser || isFetchingUser;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
        <div>
          <h2 className="text-2xl font-bold">{isEditMode ? "Edit User" : "Create New User"}</h2>
          <FormDescription>
            {isEditMode ? "Update user information" : "Create a new user account"}
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled={isEditMode} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isLoading ? (
          <LoadingButton isLoading={isLoading} />
        ) : (
          <Button type="submit" className="bg-orange-500">
            {isEditMode ? "Update User" : "Create User"}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default AdminUserForm;