import { adminApi } from "@/lib/api";
import CrudPage from "./CrudPage";

const AdminCompanyInfo = () => (
  <CrudPage
    title="Company Info"
    queryKey="admin-company-info"
    fetchFn={adminApi.getCompanyInfo}
    createFn={adminApi.createCompanyInfo}
    updateFn={adminApi.updateCompanyInfo}
    deleteFn={adminApi.deleteCompanyInfo}
    fields={[
      { name: "key", label: "Key", placeholder: "phone, email, address, about_title" },
      { name: "value", label: "Value", type: "textarea", placeholder: "Value..." },
      { name: "category", label: "Category", placeholder: "general, contact, about, social" },
    ]}
    displayFields={["key", "value", "category"]}
  />
);

export default AdminCompanyInfo;
