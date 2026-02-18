import { useParams, useNavigate } from "react-router-dom";
import { useGetBar } from "@/api/BarApi";
import {
  useGetDrinkMenu,
  useAddDrinkItem,
  useUpdateDrinkItem,
  useDeleteDrinkItem,
} from "@/api/AdminApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { useEffect, useState } from "react";
import { DrinkItem } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";

/* -------------------- ZOD SCHEMA -------------------- */
const drinkFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0.01, "Price must be positive"),
  category: z.enum([
    "Beer",
    "Wine",
    "Cocktail",
    "Spirit",
    "Non-Alcoholic",
    "Special",
  ]),
  imageUrl: z.string().optional(),
  featured: z.boolean().default(false),
  ingredients: z.string().optional(), // comma-separated in form
  alcoholPercentage: z.coerce.number().min(0).max(100).optional(),
});

/* -------------------- SAFE EMPTY FORM -------------------- */
const EMPTY_DRINK_FORM: z.output<typeof drinkFormSchema> = {
  name: "",
  description: "",
  price: 0,
  category: "Beer",
  imageUrl: "",
  featured: false,
  ingredients: "",
  alcoholPercentage: undefined,
};

/* -------------------- TYPES -------------------- */
type DrinkFormInput = z.input<typeof drinkFormSchema>;
type DrinkFormOutput = z.output<typeof drinkFormSchema>;

/* -------------------- COMPONENT -------------------- */
const AdminManageDrinkMenuPage = () => {
  const { barId } = useParams<{ barId: string }>();
  const navigate = useNavigate();

  const [editingDrink, setEditingDrink] = useState<DrinkItem | null>(null);

  const { data: bar, isLoading: isLoadingBar } = useGetBar(barId);
  const { drinkMenu, isLoading: isLoadingMenu } = useGetDrinkMenu(barId);
  const { addDrinkItem, isLoading: isAddingDrink } = useAddDrinkItem();
  const { updateDrinkItem, isLoading: isUpdatingDrink } = useUpdateDrinkItem();
  const { deleteDrinkItem, isLoading: isDeletingDrink } = useDeleteDrinkItem();

  /* -------------------- REACT HOOK FORM -------------------- */
  const form = useForm<DrinkFormInput, unknown, DrinkFormOutput>({  //  const form = useForm<DrinkFormInput, any, DrinkFormOutput>({
    resolver: zodResolver(drinkFormSchema),
    defaultValues: EMPTY_DRINK_FORM,
  });

  /* -------------------- EDIT MODE RESET -------------------- */
  useEffect(() => {
    if (editingDrink) {
      form.reset({
        name: editingDrink.name,
        description: editingDrink.description,
        price: editingDrink.price,
        category: editingDrink.category,
        imageUrl: editingDrink.imageUrl || "",
        featured: editingDrink.featured,
        ingredients: editingDrink.ingredients?.join(", ") || "",
        alcoholPercentage: editingDrink.alcoholPercentage,
      });
    } else {
      form.reset(EMPTY_DRINK_FORM);
    }
  }, [editingDrink, form]);

  /* -------------------- SUBMIT -------------------- */
  const onSubmit: SubmitHandler<DrinkFormOutput> = async (values) => {
    if (!barId) return;

    const ingredientsArray = values.ingredients
      ? values.ingredients.split(",").map((s) => s.trim())
      : [];

    const drinkData = {
      ...values,
      barId,
      ingredients: ingredientsArray,
    };

    try {
      if (editingDrink) {
        await updateDrinkItem({ drinkId: editingDrink._id, drinkData });
      } else {
        await addDrinkItem(drinkData);
      }

      form.reset(EMPTY_DRINK_FORM);
      setEditingDrink(null);
    } catch (error) {
      console.error("Error managing drink item:", error);
    }
  };

  /* -------------------- DELETE -------------------- */
  const handleDelete = async (drinkId: string) => {
    if (!barId) return;

    if (window.confirm("Delete this drink item?")) {
      try {
        await deleteDrinkItem(drinkId);
      } catch (error) {
        console.error("Error deleting drink:", error);
      }
    }
  };

  /* -------------------- LOADING STATES -------------------- */
  if (isLoadingBar) {
    return <div className="flex justify-center p-8">Loading bar data...</div>;
  }

  if (!bar) {
    return <div className="flex justify-center p-8">Bar not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">
          Manage Menu for {bar.name}
        </h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back to Bar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>
              {editingDrink ? "Edit Drink Item" : "Add New Drink Item"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Beer">Beer</SelectItem>
                          <SelectItem value="Wine">Wine</SelectItem>
                          <SelectItem value="Cocktail">Cocktail</SelectItem>
                          <SelectItem value="Spirit">Spirit</SelectItem>
                          <SelectItem value="Non-Alcoholic">Non-Alcoholic</SelectItem>
                          <SelectItem value="Special">Special</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingredients (comma separated)</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="alcoholPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alcohol %</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex space-x-3 border p-4 rounded-md">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Featured Item</FormLabel>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  {editingDrink && (
                    <Button type="button" variant="outline" onClick={() => setEditingDrink(null)}>
                      Cancel
                    </Button>
                  )}

                  {isAddingDrink || isUpdatingDrink ? (
                    <LoadingButton isLoading />
                  ) : (
                    <Button type="submit" className="bg-orange-500">
                      {editingDrink ? "Update Drink" : "Add Drink"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Current Menu Items</CardTitle>
          </CardHeader>

          <CardContent>
            {isLoadingMenu ? (
              <div className="flex justify-center p-8">Loading menu...</div>
            ) : !drinkMenu?.length ? (
              <p className="text-center text-gray-500">No drink items added yet.</p>
            ) : (
              <div className="space-y-4">
                {drinkMenu.map((drink: DrinkItem) => (
                  <div key={drink._id} className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-semibold">
                        {drink.name} ({drink.category})
                      </p>
                      <p className="text-sm text-gray-600">{drink.description}</p>
                      {!!drink.ingredients?.length && (
                        <p className="text-xs text-gray-500">
                          Ingredients: {drink.ingredients.join(", ")}
                        </p>
                      )}
                      {drink.alcoholPercentage !== undefined && (
                        <p className="text-xs text-gray-500">{drink.alcoholPercentage}% ABV</p>
                      )}
                      <p className="font-bold text-orange-500">${drink.price.toFixed(2)}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="icon" variant="outline" onClick={() => setEditingDrink(drink)}>
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        disabled={isDeletingDrink}
                        onClick={() => handleDelete(drink._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminManageDrinkMenuPage;
