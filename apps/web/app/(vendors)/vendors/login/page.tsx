import { RoleLoginPage } from "../../../_components/auth-ui";

export default function VendorLoginPage() {
  return (
    <RoleLoginPage
      role="Vendor access"
      title="Login to the vendor registry"
      detail="Update active inventory, baseline pricing and availability after admin onboarding."
      returnHref="/vendors"
    />
  );
}
