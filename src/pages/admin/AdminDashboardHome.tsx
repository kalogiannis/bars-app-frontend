import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboardHome = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="bg-slate-50">
            <CardTitle>Bar Owners Management</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="mb-4">
              Manage all bar owners in the system. You can create, view, edit, and delete bar owners.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>View all bar owners</li>
              <li>Create new bar owners</li>
              <li>Edit existing bar owner details</li>
              <li>Delete bar owners and their associated bars</li>
              <li>View bars associated with each owner</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-slate-50">
            <CardTitle>Admin Controls</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="mb-4">
              As an administrator, you have full control over the bar owners in the system.
            </p>
            <p>
              Use the sidebar navigation to access different sections of the admin dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
