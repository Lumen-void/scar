import { RoleLoginPage } from "../../../_components/auth-ui";

export default function GuideLoginPage() {
  return (
    <RoleLoginPage
      role="Guide access"
      title="Login to the guide switchboard"
      detail="Claim micro-bookings, sync safety checklists and verify traveler codes only after admin role approval."
      returnHref="/guides"
    />
  );
}
