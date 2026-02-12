import { FormControl,  FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useFormContext } from 'react-hook-form'

const ImageSection = () => {
  const { control, watch } = useFormContext()
  const existingImageUrl = watch('imageUrl')

  return (
    <div className="space-y-6"> 
      <div>
        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-wide">
          Image
        </h2>
        <p className="text-gray-400 text-lg">
          Add or change the image for your bar.
        </p>
      </div>
      <div className="flex flex-col gap-8 md:w-[50%]">
        {
          existingImageUrl && (
            <div className="aspect-video w-full">
              <img
                src={existingImageUrl}
                alt="Bar Image" 
                className="rounded-md object-cover h-full w-full shadow-md border border-gray-700" 
              />
            </div>
          )
        }
        <FormField
          control={control}
          name='imageFile'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className='bg-gray-700 text-white border border-gray-600 focus:border-blue-500 rounded-lg p-3 transition duration-200 ease-in-out placeholder-gray-500'
                  type='file'
                  accept='.jpg, .jpeg, .png' 
                  onChange={(event) => field.onChange(event.target.files ? event.target.files[0] : null)}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-sm" /> 
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default ImageSection