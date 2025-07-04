
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardStats } from "@/api/AdminApi";
import { Building2, Users, UserCheck, TrendingUp, Activity } from "lucide-react";
import {Spinner} from "@/components/Spinner";

const AdminDashboardHome = () => {
  const { stats, isLoading, error } = useGetDashboardStats();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>Error loading dashboard statistics</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center">
        <p>No statistics available</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>
      
      {/* Total Statistics */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Total Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bars</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totals.bars}</div>
              <p className="text-xs text-muted-foreground">
                Registered bars in the system
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bar Owners</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totals.barOwners}</div>
              <p className="text-xs text-muted-foreground">
                Active bar owner accounts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totals.users}</div>
              <p className="text-xs text-muted-foreground">
                All registered users
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Last 7 Days */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Last 7 Days
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">New Bars:</span>
                <span className="font-semibold">{stats.recent.last7Days.bars}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">New Bar Owners:</span>
                <span className="font-semibold">{stats.recent.last7Days.barOwners}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">New Users:</span>
                <span className="font-semibold">{stats.recent.last7Days.users}</span>
              </div>
            </CardContent>
          </Card>

          {/* Last 30 Days */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Last 30 Days
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">New Bars:</span>
                <span className="font-semibold">{stats.recent.last30Days.bars}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">New Bar Owners:</span>
                <span className="font-semibold">{stats.recent.last30Days.barOwners}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">New Users:</span>
                <span className="font-semibold">{stats.recent.last30Days.users}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Active Statistics */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Active in Last 30 Days</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bars</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active.bars}</div>
              <p className="text-xs text-muted-foreground">
                Bars updated in last 30 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bar Owners</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active.barOwners}</div>
              <p className="text-xs text-muted-foreground">
                Bar owners active in last 30 days
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Management Cards */}
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
