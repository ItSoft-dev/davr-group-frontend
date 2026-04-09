import { adminApi } from "@/lib/api";
import CrudPage from "./CrudPage";

const AdminValues = () => (
  <CrudPage
    title="Company Values"
    queryKey="admin-values"
    fetchFn={adminApi.getValues}
    createFn={adminApi.createValue}
    updateFn={adminApi.updateValue}
    deleteFn={adminApi.deleteValue}
    fields={[
      { name: "title", label: "Title", placeholder: "Safety First" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Description..." },
      { name: "icon", label: "Icon Name", placeholder: "Shield, Clock, Eye, Handshake" },
      { name: "order", label: "Order", type: "number", defaultValue: 0 },
    ]}
    displayFields={["title", "icon", "order"]}
  />
);

export default AdminValues;
