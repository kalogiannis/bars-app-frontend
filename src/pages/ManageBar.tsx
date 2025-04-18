import {
    useCreateMyBar,
    useGetMyBar,
    useUpdateMyBar,
  } from "@/api/MyBarApi";
  import ManageBarForm from "@/forms/manage-bar-form/ManageBarForm";
  
  const ManageBarPage = () => {
    const { createBar, isLoading: isCreateLoading } = useCreateMyBar();
    const { bar, isLoading: isGetLoading } = useGetMyBar();
    const { updateBar, isLoading: isUpdateLoading } = useUpdateMyBar();
  
    const isEditing = !!bar;
  
    if (isGetLoading) {
      return <p>Loading...</p>;
    }
  
    return (
      <ManageBarForm
        bar={bar}
        onSave={isEditing ? updateBar : createBar}
        isLoading={isCreateLoading || isUpdateLoading}
      />
    );
  };
  
  export default ManageBarPage;
  