import { adminApi } from "@/lib/api";
import CrudPage from "./CrudPage";

const AdminWhyUs = () => (
  <CrudPage
    title="Why Choose Us"
    queryKey="admin-why-us"
    fetchFn={adminApi.getWhyChooseUs}
    createFn={adminApi.createWhyChooseUs}
    updateFn={adminApi.updateWhyChooseUs}
    deleteFn={adminApi.deleteWhyChooseUs}
    fields={[
      { name: "title", label: "Title", placeholder: "On-Time Delivery" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Description..." },
      { name: "icon", label: "Icon Name", placeholder: "Clock, Users, Shield, Headphones" },
      { name: "stat_value", label: "Stat Value", placeholder: "98%" },
      { name: "stat_label", label: "Stat Label", placeholder: "On-Time Rate" },
      { name: "order", label: "Order", type: "number", defaultValue: 0 },
    ]}
    displayFields={["title", "stat_value", "stat_label", "icon"]}
  />
);

export default AdminWhyUs;
