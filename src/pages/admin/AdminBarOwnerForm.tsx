import  { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateBarOwner, useGetBarOwnerById, useUpdateBarOwner } from "@/api/AdminApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import LoadingButton from "@/components/LoadingButton";

const AdminBarOwnerForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = id !== "new";
  const navigate = useNavigate();
  
  const { barOwner, isLoading: isLoadingBarOwner } = useGetBarOwnerById(isEditMode ? id! : "placeholder");
  const { createBarOwner, isLoading: isCreating } = useCreateBarOwner();
  const { updateBarOwner, isLoading: isUpdating } = useUpdateBarOwner(isEditMode ? id! : "placeholder");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    auth0Id: "",
    addressLine1: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    if (isEditMode && barOwner) {
      setFormData({
        name: barOwner.name || "",
        email: barOwner.email || "",
        auth0Id: barOwner.auth0Id || "",
        addressLine1: barOwner.addressLine1 || "",
        city: barOwner.city || "",
        country: barOwner.country || "",
      });
    }
  }, [isEditMode, barOwner]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditMode && updateBarOwner) {
        // For edit mode, we don't send email and auth0Id
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { email, auth0Id, ...updateData } = formData;
        await updateBarOwner(updateData);
      } else {
        await createBarOwner(formData);
      }
      
      navigate("/admin/bar-owners");
    } catch (error) {
      console.log(error)
      toast.error(`Failed to ${isEditMode ? "update" : "create"} bar owner`);
    }
  };

  if (isEditMode && isLoadingBarOwner) {
    return <div className="flex justify-center p-8">Loading bar owner data...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{isEditMode ? "Edit Bar Owner" : "Create New Bar Owner"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {!isEditMode && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="auth0Id">Auth0 ID</Label>
                    <Input
                      id="auth0Id"
                      name="auth0Id"
                      value={formData.auth0Id}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-sm text-gray-500">
                      This should be the Auth0 user ID from the Auth0 dashboard
                    </p>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address</Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/bar-owners")}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  isLoading={isCreating || isUpdating}
                >
                  {isEditMode ? "Update" : "Create"}
                </LoadingButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBarOwnerForm;
