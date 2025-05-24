
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription, 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const Details = () => {
  const { control } = useFormContext(); 
  return (
    <div className="space-y-6"> 
      <div>
        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-wide">
          Details
        </h2>
        <FormDescription className="text-gray-400 text-lg">
          Provide information about your bar.
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 text-base">Name</FormLabel> 
            <FormControl>
              <Input
                {...field}
                placeholder="Write the name of the bar..."
                className="bg-gray-700 text-white border border-gray-600 focus:border-blue-500 rounded-lg p-3 transition duration-200 ease-in-out placeholder-gray-500"
              />
            </FormControl>
            <FormMessage className="text-red-400 text-sm" /> 
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 text-base">City</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="City.."
                className="bg-gray-700 text-white border border-gray-600 focus:border-blue-500 rounded-lg p-3 transition duration-200 ease-in-out placeholder-gray-500"
              />
            </FormControl>
            <FormMessage className="text-red-400 text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 text-base">Country</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Country.."
                className="bg-gray-700 text-white border border-gray-600 focus:border-blue-500 rounded-lg p-3 transition duration-200 ease-in-out placeholder-gray-500"
              />
            </FormControl>
            <FormMessage className="text-red-400 text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="openingHours"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 text-base">Opening hours</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Opening hours.."
                className="bg-gray-700 text-white border border-gray-600 focus:border-blue-500 rounded-lg p-3 transition duration-200 ease-in-out placeholder-gray-500"
              />
            </FormControl>
            <FormMessage className="text-red-400 text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 text-base">Description</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Describe your bar…"
                className="bg-gray-700 text-white border border-gray-600 focus:border-blue-500 rounded-lg p-3 transition duration-200 ease-in-out placeholder-gray-500"
              />
            </FormControl>
            <FormMessage className="text-red-400 text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300 text-base">Location</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Physical address or neighborhood…"
                className="bg-gray-700 text-white border border-gray-600 focus:border-blue-500 rounded-lg p-3 transition duration-200 ease-in-out placeholder-gray-500"
              />
            </FormControl>
            <FormMessage className="text-red-400 text-sm" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Details;

