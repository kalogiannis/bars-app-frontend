

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
import { useParams, useNavigate } from "react-router-dom";
import { useCreateBarOwner, useUpdateBarOwner, useGetBarOwnerById } from "@/api/AdminApi";
import { useEffect } from "react";

// Schema for creating a new bar owner (email is required)
const createFormSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

// Schema for updating an existing bar owner (email is optional and disabled)
const updateFormSchema = z.object({
  email: z.string().email("Invalid email address").optional(), // Optional for update, but will be pre-filled
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

type CreateBarOwnerFormData = z.infer<typeof createFormSchema>;
type UpdateBarOwnerFormData = z.infer<typeof updateFormSchema>;

const AdminBarOwnerForm = () => {
  const { id } = useParams(); // Get id from URL for edit mode
  const navigate = useNavigate();
  const isEditMode = !!id && id !== "new";

  // Fetch bar owner data only if in edit mode and id is available
  const { barOwner, isLoading: isFetchingBarOwner } = useGetBarOwnerById(isEditMode ? id : undefined);
  const { createBarOwner, isLoading: isCreatingBarOwner } = useCreateBarOwner();
  const { updateBarOwner, isLoading: isUpdatingBarOwner } = useUpdateBarOwner();

  const form = useForm<CreateBarOwnerFormData | UpdateBarOwnerFormData>({
    resolver: zodResolver(isEditMode ? updateFormSchema : createFormSchema),
    defaultValues: {
      email: "",
      name: "",
      addressLine1: "",
      city: "",
      country: "",
    },
  });

  // Populate form with fetched bar owner data in edit mode
  useEffect(() => {
    if (isEditMode && barOwner) {
      form.reset({
        email: barOwner.email,
        name: barOwner.name,
        addressLine1: barOwner.addressLine1 || "",
        city: barOwner.city || "",
        country: barOwner.country || "",
      });
    }
  }, [isEditMode, barOwner, form]);

  const onSubmit = async (values: CreateBarOwnerFormData | UpdateBarOwnerFormData) => {
    try {
      if (isEditMode && barOwner) {
        // For update, pass bar owner ID and form data
        await updateBarOwner({ 
          _id: barOwner._id, 
          name: values.name,
          addressLine1: values.addressLine1,
          city: values.city,
          country: values.country,
        });
      } else {
        // For creation, pass only form data (Auth0 ID will be generated automatically)
        await createBarOwner(values as CreateBarOwnerFormData);
      }
      navigate("/admin/bar-owners");
    } catch (error) {
      console.error("Error submitting bar owner form:", error);
    }
  };

  const isLoading = isCreatingBarOwner || isUpdatingBarOwner || isFetchingBarOwner;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
        <div>
          <h2 className="text-2xl font-bold">{isEditMode ? "Edit Bar Owner" : "Create New Bar Owner"}</h2>
          <FormDescription>
            {isEditMode ? "Update bar owner information" : "Create a new bar owner account. Auth0 ID will be generated automatically."}
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
              {isEditMode && (
                <FormDescription>
                  Email cannot be changed for existing bar owners
                </FormDescription>
              )}
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

        {!isEditMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Auth0 ID will be generated automatically when the bar owner is created. 
              The bar owner will be able to log in using their email address.
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/bar-owners")}
          >
            Cancel
          </Button>
          {isLoading ? (
            <LoadingButton isLoading={isLoading} />
          ) : (
            <Button type="submit" className="bg-orange-500">
              {isEditMode ? "Update Bar Owner" : "Create Bar Owner"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AdminBarOwnerForm;
