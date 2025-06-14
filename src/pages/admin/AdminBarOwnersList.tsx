import { useGetAllBarOwners, useDeleteBarOwner } from "@/api/AdminApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminBarOwnersList = () => {
  const { barOwners, isLoading, refetch } = useGetAllBarOwners();
  const { deleteBarOwner } = useDeleteBarOwner();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this bar owner? This will also delete all associated bars.")) {
      try {
        await deleteBarOwner(id);
        refetch();
      } catch (error) {
        toast.error("Failed to delete bar owner");
        console.log(error)
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading bar owners...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bar Owners Management</h1>
        <Button onClick={() => navigate("/admin/bar-owners/new")}>
          Add New Bar Owner
        </Button>
      </div>

      {barOwners && barOwners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {barOwners.map((owner) => (
            <Card key={owner._id} className="overflow-hidden">
              <CardHeader className="bg-slate-50">
                <CardTitle className="text-xl">{owner.name || "Unnamed Owner"}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p><span className="font-semibold">Email:</span> {owner.email}</p>
                  {owner.addressLine1 && (
                    <p><span className="font-semibold">Address:</span> {owner.addressLine1}</p>
                  )}
                  {owner.city && (
                    <p><span className="font-semibold">City:</span> {owner.city}</p>
                  )}
                  {owner.country && (
                    <p><span className="font-semibold">Country:</span> {owner.country}</p>
                  )}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/admin/bar-owners/${owner._id}/bars`)}
                  >
                    View Bars
                  </Button>
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/admin/bar-owners/${owner._id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDelete(owner._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-slate-50 rounded-lg">
          <p className="text-lg">No bar owners found</p>
          <Button 
            className="mt-4" 
            onClick={() => navigate("/admin/bar-owners/new")}
          >
            Add Your First Bar Owner
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminBarOwnersList;
