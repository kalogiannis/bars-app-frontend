import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Bar } from "@/types";


const formSchema = z
  .object({
    barName: z.string({
      required_error: "bar name is required",
    }),
    city: z.string({
      required_error: "city is required",
    }),
    country: z.string({
      required_error: "country is required",
    }),
    drinks: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type BarFormData = z.infer<typeof formSchema>;

type Props = {
  bar?: Bar; //since bar might be undefined in the case where the user hasnt created a bar yet
  onSave: (barFormData: FormData) => void;
  isLoading: boolean;
};

const ManageBarForm = ({ onSave, isLoading, bar }: Props) => {
  const form = useForm<BarFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drinks: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!bar) {
      return;
    }

    const menuItemsFormatted = bar.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedBar = {
      ...bar,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedBar);
  }, [form, bar]);

  const onSubmit = (formDataJson: BarFormData) => {
    const formData = new FormData();

    formData.append("barName", formDataJson.barName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formDataJson.drinks.forEach((drink, index) => {
      formData.append(`drinks[${index}]`, drink);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageBarForm;
