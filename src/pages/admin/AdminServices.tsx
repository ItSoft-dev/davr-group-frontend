import { adminApi } from "@/lib/api";
import CrudPage from "./CrudPage";

const AdminServices = () => (
  <CrudPage
    title="Services"
    queryKey="admin-services"
    fetchFn={adminApi.getServices}
    createFn={adminApi.createService}
    updateFn={adminApi.updateService}
    deleteFn={adminApi.deleteService}
    fields={[
      { name: "title", label: "Title", placeholder: "Full Truckload (FTL)" },
      { name: "icon", label: "Icon Name", placeholder: "Truck, Package, Zap, Route, Box" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Service description..." },
      { name: "features", label: "Features (JSON array)", type: "textarea", placeholder: '["Feature 1", "Feature 2"]' },
      { name: "is_featured", label: "Featured", type: "checkbox" },
      { name: "order", label: "Order", type: "number", defaultValue: 0 },
    ]}
    displayFields={["title", "icon", "is_featured", "order"]}
  />
);

export default AdminServices;
