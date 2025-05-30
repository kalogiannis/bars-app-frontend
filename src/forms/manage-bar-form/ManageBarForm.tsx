
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Bar } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Details from "./Details";
import ImageSection from "./ImageSection";

const formschema = z
  .object({
    name: z.string().nonempty("Name is required"),
    city: z.string().nonempty('City is required'),
    country: z.string().nonempty('Country is required'),
    openingHours: z.string().nonempty('Opening hours is required'),
    description: z.string().nonempty('Description is required'),
    location: z.string().nonempty('Location is required'),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  // Refine ensures either imageUrl or imageFile is provided
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"], // Points to imageFile for error message
  });

export type BarValues = z.infer<typeof formschema>;

type Props = {
  bar?: Bar; 
  isLoading: boolean;
  onSave: (values: FormData) => void; 
};

const BarForm = ({ bar, isLoading, onSave }: Props) => {
  const form = useForm<BarValues>({
    resolver: zodResolver(formschema),
    defaultValues: bar
      ? {
          name: bar.name,
          city: bar.city,
          country: bar.country,
          openingHours: bar.openingHours,
          description: bar.description,
          location: bar.location,
          imageUrl: bar.imageUrl,
          imageFile: undefined, 
        }
      : {
          name: '',
          city: '',
          country: '',
          openingHours: '',
          description: '',
          location: '',
          imageUrl: undefined,
          imageFile: undefined,
        },
  });

  const { handleSubmit, reset } = form; 

  useEffect(() => {
    if (bar) {
      reset({
        name: bar.name,
        city: bar.city,
        country: bar.country,
        openingHours: bar.openingHours,
        description: bar.description,
        location: bar.location,
        imageUrl: bar.imageUrl,
        imageFile: undefined,
      });
    }
  }, [bar, reset]); 

  const onSubmit = (values: BarValues) => {
    const formData = new FormData(); 

    formData.append("name", values.name);
    formData.append("city", values.city);
    formData.append("country", values.country);
    formData.append("openingHours", values.openingHours);
    formData.append("description", values.description);
    formData.append("location", values.location);

    if (values.imageFile) {
      formData.append("imageFile", values.imageFile);
    }
    onSave(formData); 
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 rounded-xl shadow-2xl border border-gray-700 max-w-3xl mx-4 md:mx-auto my-8"
        onSubmit={handleSubmit(onSubmit)} 
      >
        <Details />
        <Separator className="bg-gray-700 my-6" />
        <ImageSection />
        <div>
          {isLoading ? (
            <LoadingButton isLoading={isLoading} />
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default BarForm;

