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
import { useCreateBarOwner, useUpdateBarOwner, useGetBarOwnerById, useCreateBarOwnerBar } from "@/api/AdminApi";
import { useEffect, useState } from "react";
import ManageBarForm from "@/forms/manage-bar-form/ManageBarForm";


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
  
  const [step, setStep] = useState(1);
  const [createdBarOwnerId, setCreatedBarOwnerId] = useState<string | null>(null);

  // Fetch bar owner data only if in edit mode and id is available
  const { barOwner, isLoading: isFetchingBarOwner } = useGetBarOwnerById(isEditMode ? id : undefined);
  const { createBarOwner, isLoading: isCreatingBarOwner } = useCreateBarOwner();
  const { updateBarOwner, isLoading: isUpdatingBarOwner } = useUpdateBarOwner();
  const { createBarOwnerBar, isLoading: isCreatingBarBar } = useCreateBarOwnerBar();

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
        navigate("/admin/bar-owners");
      } else {
        // For creation, pass only form data (Auth0 ID will be generated automatically)
        const result = await createBarOwner(values as CreateBarOwnerFormData);
        console.log("Create Bar Owner raw result:", result);
        
        let barOwnerId: string | null = null;
        if (result && typeof result === 'object') {
          if ('barOwner' in result && result.barOwner && typeof result.barOwner === 'object' && '_id' in result.barOwner) {
            barOwnerId = result.barOwner._id as string;
          } else if ('_id' in result) {
            barOwnerId = result._id as string;
          }
        }
        
        console.log("Extracted barOwnerId:", barOwnerId);
        
        if (barOwnerId) {
          setCreatedBarOwnerId(barOwnerId);
          setStep(2);
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        } else {
          console.error("No bar owner ID found in response", result);
          navigate("/admin/bar-owners");
        }
      }
    } catch (error) {
      console.error("Error submitting bar owner form:", error);
    }
  };

  const onBarSave = async (barFormData: FormData) => {
    if (!createdBarOwnerId) return;
    try {
      await createBarOwnerBar({ barOwnerId: createdBarOwnerId, barFormData });
      navigate("/admin/bar-owners");
    } catch (error) {
      console.error("Error creating bar:", error);
    }
  };

  const isLoading = isCreatingBarOwner || isUpdatingBarOwner || isFetchingBarOwner;

  if (step === 2 && createdBarOwnerId) {
    return (
      <div className="space-y-4 bg-gray-50 rounded-lg md:p-10 text-black">
        <h2 className="text-2xl font-bold">Step 2: Add Bar Details</h2>
        <p className="text-sm text-gray-600">Now that the bar owner is created, please provide the details for their bar.</p>
        
        <div className="mt-6 border-t border-gray-200 pt-6">
          <ManageBarForm onSave={onBarSave} isLoading={isCreatingBarBar} />
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="link" className="text-blue-600" onClick={() => navigate("/admin/bar-owners")}>
            Skip for now and go back to list
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
        <div>
          <h2 className="text-2xl font-bold">{isEditMode ? "Edit Bar Owner" : "Step 1: Create New Bar Owner"}</h2>
          <p className="text-sm text-muted-foreground">
            {isEditMode ? "Update bar owner information" : "Create a new bar owner account. After this step, you will add the bar details."}
          </p>
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
              {isEditMode && (
                <FormDescription>
                  Email cannot be changed for existing bar owners
                </FormDescription>
              )}
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
              {isEditMode ? "Update Bar Owner" : "Next: Add Bar Details"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AdminBarOwnerForm;