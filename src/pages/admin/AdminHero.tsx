import { adminApi } from "@/lib/api";
import CrudPage from "./CrudPage";

const AdminHero = () => (
  <CrudPage
    title="Hero Sections"
    queryKey="admin-hero"
    fetchFn={adminApi.getHero}
    createFn={adminApi.createHero}
    updateFn={adminApi.updateHero}
    deleteFn={adminApi.deleteHero}
    fields={[
      { name: "title", label: "Title", placeholder: "Reliable Trucking Services Across the USA" },
      { name: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Subtitle text..." },
      { name: "button_text", label: "Button Text", placeholder: "Get a Free Quote" },
      { name: "button_link", label: "Button Link", placeholder: "/quote" },
      { name: "is_active", label: "Active", type: "checkbox", defaultValue: true },
      { name: "order", label: "Order", type: "number", defaultValue: 0 },
    ]}
    displayFields={["title", "button_text", "is_active", "order"]}
  />
);

export default AdminHero;
