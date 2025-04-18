import {
    useCreateMyRestaurant,
    useGetMyRestaurant,
    useUpdateMyRestaurant,
  } from "@/api/MyRestaurantApi";
  import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
  
  const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } =useCreateMyRestaurant(); //isLoading: isCreateLoading } =
    const { restaurant } = useGetMyRestaurant();
    const { updateRestaurant, isLoading: isUpdateLoading} = useUpdateMyRestaurant()
   
    const isEditing = !!restaurant;  
    return (
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant} //if isEdditing is true then whenever onSave is called it will pass the data to updateRestaurant function if isEdditing is false ,onSave prop will pass the data to createRestaurant
          isLoading={isCreateLoading || isUpdateLoading}
        />
    )
  };
  
  export default ManageRestaurantPage;

