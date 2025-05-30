import { Link, Outlet } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AdminDashboardLayout = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                <div className="py-2">
                  <Link 
                    to="/admin" 
                    className="block p-2 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    Dashboard Home
                  </Link>
                </div>
                <Separator />
                <div className="py-2">
                  <Link 
                    to="/admin/bar-owners" 
                    className="block p-2 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    Bar Owners
                  </Link>
                </div>
                <Separator />
                <div className="py-2">
                  <Link 
                    to="/" 
                    className="block p-2 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    Back to Main Site
                  </Link>
                </div>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
