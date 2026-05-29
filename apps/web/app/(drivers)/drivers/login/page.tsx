import { RoleLoginPage } from "../../../_components/auth-ui";

export default function DriverLoginPage() {
  return (
    <RoleLoginPage
      role="Driver access"
      title="Login to the driver engine"
      detail="Manage route waypoints, passenger drops and hazard status from a protected driver account."
      returnHref="/drivers"
    />
  );
}
