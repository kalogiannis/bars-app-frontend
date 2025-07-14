
import { useCreateUser, useUpdateUser, useGetUserById, User } from "@/api/AdminApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const AdminUserForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const { createUser } = useCreateUser();
  const { updateUser } = useUpdateUser();
  const { user, isLoading } = useGetUserById(id);

  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    addressLine1: "",
    city: "",
    country: "",
    role: "user",
    auth0Id: "",
  });

  useEffect(() => {
    if (isEditing && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        addressLine1: user.addressLine1 || "",
        city: user.city || "",
        country: user.country || "",
        role: user.role || "user",
        auth0Id: user.auth0Id || "",
      });
    }
  }, [isEditing, user]);

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    try {
      if (isEditing) {
        // ensure we pass the correct ID from the URL
        await updateUser({
          ...(formData as Omit<User, '_id'>),
          _id: id!,
        } as User);
        toast.success("User updated successfully");
      } else {
        await createUser(formData as User);
        toast.success("User created successfully");
      }
      navigate("/admin/users");
    } catch (error: unknown) {
      let msg = isEditing ? "Failed to update user" : "Failed to create user";
      if (error instanceof Error && error.message) {
        msg += `: ${error.message}`;
      }
      toast.error(msg);
      console.error("Error submitting user form:", error);
    }
  };

  if (isEditing && isLoading) {
    return <div className="flex justify-center p-8">Loading user...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit User" : "Create New User"}
        </h1>
        <Button variant="outline" onClick={() => navigate("/admin/users") }>
          Back to Users
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit User Details" : "User Information"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter user name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="bar_owner">Bar Owner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="auth0Id">Auth0 ID</Label>
                <Input
                  id="auth0Id"
                  type="text"
                  value={formData.auth0Id}
                  onChange={(e) => handleInputChange("auth0Id", e.target.value)}
                  placeholder="Enter Auth0 ID"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="addressLine1">Address</Label>
                <Input
                  id="addressLine1"
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                  placeholder="Enter address"
                />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter city"
                />
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="Enter country"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/users")}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update User" : "Create User"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserForm;
