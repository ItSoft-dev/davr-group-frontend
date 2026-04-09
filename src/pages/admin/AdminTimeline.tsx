import { adminApi } from "@/lib/api";
import CrudPage from "./CrudPage";

const AdminTimeline = () => (
  <CrudPage
    title="Timeline Events"
    queryKey="admin-timeline"
    fetchFn={adminApi.getTimeline}
    createFn={adminApi.createTimeline}
    updateFn={adminApi.updateTimeline}
    deleteFn={adminApi.deleteTimeline}
    fields={[
      { name: "title", label: "Title", placeholder: "Company Founded" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Description..." },
      { name: "year", label: "Year", placeholder: "2022" },
      { name: "icon", label: "Icon Name", placeholder: "Flag, TrendingUp, Award" },
      { name: "order", label: "Order", type: "number", defaultValue: 0 },
    ]}
    displayFields={["title", "year", "icon", "order"]}
  />
);

export default AdminTimeline;
