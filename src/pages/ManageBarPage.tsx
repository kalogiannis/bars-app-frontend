import { useCreateMyBar, useGetMyBar, useUpdateMyBar } from "@/api/MyBarApi";
import ManageBarForm from "@/forms/bar-form/ManageBarForm";

  
  const ManageBarPage = () => {
    const { createBar, isLoading: isCreateLoading } =useCreateMyBar(); //isLoading: isCreateLoading } =
    const { bar } = useGetMyBar();
    const { updateBar, isLoading: isUpdateLoading} = useUpdateMyBar()
   
    const isEditing = !!bar;  
    return (
        <ManageBarForm
          bar={bar}
          onSave={isEditing ? updateBar : createBar} //if isEdditing is true then whenever onSave is called it will pass the data to updateBar function if isEdditing is false ,onSave prop will pass the data to createBar
          isLoading={isCreateLoading || isUpdateLoading}
        />
    )
  };
  
  export default ManageBarPage;

