import { useParams, useNavigate } from "react-router-dom";
import { useGetBar } from "@/api/BarApi";
import { useUpdateBar } from "@/api/AdminApi";
import ManageBarForm from "@/forms/manage-bar-form/ManageBarForm";

const AdminBarEditPage = () => {
  const { barId } = useParams<{ barId: string }>();
  const navigate = useNavigate();
  
  const { data: bar, isLoading: isFetching } = useGetBar(barId);
  const { updateBar, isLoading: isUpdating } = useUpdateBar();

  const handleSave = async (barFormData: FormData) => {
    if (!barId) return;
    try {
      await updateBar({ barId, barFormData });
      // Go back to the previous page (likely the bars list for the owner)
      navigate(-1);
    } catch (error) {
      console.error("Error updating bar:", error);
    }
  };

  if (isFetching) {
    return <div className="flex justify-center p-8">Loading bar data...</div>;
  }

  if (!bar) {
    return <div className="flex justify-center p-8">Bar not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Bar: {bar.name}</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
      
      <ManageBarForm 
        bar={bar} 
        onSave={handleSave} 
        isLoading={isUpdating} 
      />
    </div>
  );
};

import { Button } from "@/components/ui/button";

export default AdminBarEditPage;