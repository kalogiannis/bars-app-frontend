import { useParams } from "react-router-dom";
import { useGetBarOwnerById, useGetBarOwnerBars } from "@/api/AdminApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Bar } from "@/types";

const AdminBarOwnerBars = () => {
  const { id } = useParams<{ id: string }>();
  const { barOwner, isLoading: isLoadingOwner } = useGetBarOwnerById(id!);
  const { bars, isLoading: isLoadingBars } = useGetBarOwnerBars(id!);
  const navigate = useNavigate();

  if (isLoadingOwner || isLoadingBars) {
    return <div className="flex justify-center p-8">Loading data...</div>;
  }

  if (!barOwner) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center p-8 bg-slate-50 rounded-lg">
          <p className="text-lg">Bar owner not found</p>
          <Button 
            className="mt-4" 
            onClick={() => navigate("/admin/bar-owners")}
          >
            Back to Bar Owners
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bars for {barOwner.name || "Unnamed Owner"}</h1>
        <Button onClick={() => navigate("/admin/bar-owners")}>
          Back to Bar Owners
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="bg-slate-50">
          <CardTitle>Owner Details</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{barOwner.name || "Not provided"}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{barOwner.email}</p>
            </div>
            <div>
              <p className="font-semibold">Address:</p>
              <p>{barOwner.addressLine1 || "Not provided"}</p>
            </div>
            <div>
              <p className="font-semibold">Location:</p>
              <p>{barOwner.city && barOwner.country ? `${barOwner.city}, ${barOwner.country}` : "Not provided"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Bars</h2>
      
      {bars && bars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bars.map((bar: Bar) => (
            <Card key={bar._id} className="overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img 
                  src={bar.imageUrl} 
                  alt={bar.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{bar.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p><span className="font-semibold">Location:</span> {bar.city}, {bar.country}</p>
                  <p><span className="font-semibold">Opening Hours:</span> {bar.openingHours}</p>
                  <p><span className="font-semibold">Capacity:</span> {bar.capacity}</p>
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(`/detail/${bar._id}`, '_blank')}
                    className="w-full"
                  >
                    View Bar Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-slate-50 rounded-lg">
          <p className="text-lg">No bars found for this owner</p>
        </div>
      )}
    </div>
  );
};

export default AdminBarOwnerBars;
