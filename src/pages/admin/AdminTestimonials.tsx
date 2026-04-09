import { adminApi } from "@/lib/api";
import CrudPage from "./CrudPage";

const AdminTestimonials = () => (
  <CrudPage
    title="Testimonials"
    queryKey="admin-testimonials"
    fetchFn={adminApi.getTestimonials}
    createFn={adminApi.createTestimonial}
    updateFn={adminApi.updateTestimonial}
    deleteFn={adminApi.deleteTestimonial}
    fields={[
      { name: "name", label: "Name", placeholder: "John Doe" },
      { name: "company", label: "Company", placeholder: "Company Name" },
      { name: "role", label: "Role", placeholder: "Logistics Manager" },
      { name: "content", label: "Content", type: "textarea", placeholder: "Testimonial text..." },
      { name: "rating", label: "Rating (1-5)", type: "number", defaultValue: 5 },
      { name: "is_visible", label: "Visible", type: "checkbox", defaultValue: true },
      { name: "order", label: "Order", type: "number", defaultValue: 0 },
    ]}
    displayFields={["name", "company", "rating", "is_visible"]}
  />
);

export default AdminTestimonials;
