import { useGetAllUsers, useDeleteUser, User } from "@/api/AdminApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const AdminUsersList = () => {
  const { users, isLoading, refetch } = useGetAllUsers();
  const { deleteUser } = useDeleteUser();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Filter users based on search query
  const handleSearch = (searchFormData: SearchForm) => {
    const query = searchFormData.searchQuery.toLowerCase();
    setSearchQuery(query);

    if (users) {
      const filtered = users.filter(
        (user: User) =>
          user.name?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          user.city?.toLowerCase().includes(query) ||
          user.country?.toLowerCase().includes(query) ||
          user.role?.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setFilteredUsers([]);
  };

  // Use filtered results if search is active, otherwise use all users
  const displayedUsers = searchQuery ? filteredUsers : users;

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (error) {
        toast.error("Failed to delete user");
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading users...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold">
            Total Users: {displayedUsers ? displayedUsers.length : 0}
          </div>
          <Button onClick={() => navigate("/admin/users/new")}>
            Add New User
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          onSubmit={handleSearch}
          onReset={handleReset}
          placeHolder="Search users by name, email, city, country, or role..."
          searchQuery={searchQuery}
        />
      </div>

      {displayedUsers && displayedUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedUsers.map((user: User) => (
            <Card key={user._id} className="overflow-hidden">
              <CardHeader className="bg-slate-50">
                <CardTitle className="text-xl">
                  {user.name || "Unnamed User"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-semibold">Role:</span> {user.role}
                  </p>
                  {user.addressLine1 && (
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {user.addressLine1}
                    </p>
                  )}
                  {user.city && (
                    <p>
                      <span className="font-semibold">City:</span> {user.city}
                    </p>
                  )}
                  {user.country && (
                    <p>
                      <span className="font-semibold">Country:</span>{" "}
                      {user.country}
                    </p>
                  )}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    // onClick={() => navigate(`/admin/users/${user._id}/edit`)}
                    // instead of user._id
                    onClick={() =>
                      navigate(`/admin/users/${user.auth0Id}/edit`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-slate-50 rounded-lg">
          <p className="text-lg">No users found</p>
        </div>
      )}
    </div>
  );
};

export default AdminUsersList;
