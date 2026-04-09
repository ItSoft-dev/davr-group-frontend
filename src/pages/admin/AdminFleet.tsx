import { adminApi } from "@/lib/api";
import CrudPage from "./CrudPage";

const AdminFleet = () => (
  <div className="space-y-12">
    <CrudPage
      title="Fleet Vehicles"
      queryKey="admin-vehicles"
      fetchFn={adminApi.getVehicles}
      createFn={adminApi.createVehicle}
      updateFn={adminApi.updateVehicle}
      deleteFn={adminApi.deleteVehicle}
      fields={[
        { name: "unit_number", label: "Unit Number", placeholder: "Unit #104" },
        { name: "vehicle_type", label: "Vehicle Type", placeholder: "Dry Van 53' Trailer" },
        { name: "capacity", label: "Capacity", placeholder: "45,000 lbs" },
        { name: "year", label: "Year", type: "number", defaultValue: 2024 },
        { name: "features", label: "Features (JSON array)", type: "textarea", placeholder: '["GPS Enabled", "DOT Compliant"]' },
        { name: "status", label: "Status", placeholder: "Active" },
        { name: "order", label: "Order", type: "number", defaultValue: 0 },
      ]}
      displayFields={["unit_number", "vehicle_type", "capacity", "status"]}
    />

    <CrudPage
      title="Fleet Features"
      queryKey="admin-fleet-features"
      fetchFn={adminApi.getFleetFeatures}
      createFn={adminApi.createFleetFeature}
      updateFn={adminApi.updateFleetFeature}
      deleteFn={adminApi.deleteFleetFeature}
      fields={[
        { name: "title", label: "Title", placeholder: "GPS Tracking" },
        { name: "description", label: "Description", type: "textarea", placeholder: "Feature description..." },
        { name: "icon", label: "Icon Name", placeholder: "Wrench, MapPin, Globe, Shield" },
        { name: "order", label: "Order", type: "number", defaultValue: 0 },
      ]}
      displayFields={["title", "icon", "order"]}
    />
  </div>
);

export default AdminFleet;
