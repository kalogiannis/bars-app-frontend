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
    name: z.string().nonempty("name is required "),
    city: z.string().nonempty('city is required'),
    country: z.string().nonempty('country is required'),
    openingHours: z.string().nonempty('opening hours is required'), 
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
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
          imageUrl: bar.imageUrl, 
          imageFile: undefined, 
        }
      : {
          name: '',
          city: '',
          country:'',
          openingHours:'',
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
        country:bar.country,
        openingHours:bar.openingHours,
        imageUrl: bar.imageUrl,
        imageFile: undefined,
      });
    }
  }, [bar, reset]);

 
  const onSubmit = (values: BarValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("city",values.city);
    formData.append("country",values.country);
    formData.append("openingHours",values.openingHours);
    
    if (values.imageFile) {
      formData.append("imageFile", values.imageFile);
    }
    onSave(formData);
  };
  return (
    <Form {...form}>
      <form  
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
        onSubmit={handleSubmit(onSubmit)}
       >
        <Details />
        <Separator />
        <ImageSection />
        <div>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default BarForm;
