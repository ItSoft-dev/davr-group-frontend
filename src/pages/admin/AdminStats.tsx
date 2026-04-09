import { adminApi } from "@/lib/api";
import CrudPage from "./CrudPage";

const AdminStats = () => (
  <CrudPage
    title="Stats"
    queryKey="admin-stats"
    fetchFn={adminApi.getStats}
    createFn={adminApi.createStat}
    updateFn={adminApi.updateStat}
    deleteFn={adminApi.deleteStat}
    fields={[
      { name: "label", label: "Label", placeholder: "Active Trucks" },
      { name: "value", label: "Value", placeholder: "3" },
      { name: "icon", label: "Icon Name", placeholder: "Truck, Users, MapPin, Clock" },
      { name: "suffix", label: "Suffix", placeholder: "%, +, etc." },
      { name: "order", label: "Order", type: "number", defaultValue: 0 },
    ]}
    displayFields={["label", "value", "suffix", "icon", "order"]}
  />
);

export default AdminStats;
