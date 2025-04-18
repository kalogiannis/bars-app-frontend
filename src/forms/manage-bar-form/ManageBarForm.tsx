import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { useEffect } from "react";
import { Bar } from "@/types";

const formSchema = z.object({
  barName: z.string({ required_error: "Bar name is required" }),
  city: z.string({ required_error: "City is required" }),
  country: z.string({ required_error: "Country is required" }),
  drinks: z.array(z.string()).nonempty({ message: "Select at least one drink" }),
});

type BarFormData = z.infer<typeof formSchema>;

type Props = {
  bar?: Bar;
  onSave: (barFormData: FormData) => void;
  isLoading: boolean;
};

const ManageBarForm = ({ onSave, isLoading, bar }: Props) => {
  const form = useForm<BarFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { drinks: [""] },
  });
  const { control, register, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "drinks" });

  useEffect(() => {
    if (!bar) return;
    const updated: BarFormData = {
      barName: bar.barName,
      city: bar.city,
      country: bar.country,
      drinks: bar.drinks,
    };
    reset(updated);
  }, [bar, reset]);

  const onSubmit = (data: BarFormData) => {
    const formData = new FormData();
    formData.append("barName", data.barName);
    formData.append("city", data.city);
    formData.append("country", data.country);
    data.drinks.forEach((drink, idx) => formData.append(`drinks[${idx}]`, drink));
    onSave(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium">Bar Name</label>
          <input
            {...register("barName")}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input {...register("city")} className="mt-1 block w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Country</label>
          <input {...register("country")} className="mt-1 block w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Drinks</label>
          <div className="mt-1 space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <input
                  {...register(`drinks.${index}` as const)}
                  className="block flex-1"
                />
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => append("")}>Add Drink</button>
          </div>
        </div>
        <div>
          {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
        </div>
      </form>
    </Form>
  );
};

export default ManageBarForm;
