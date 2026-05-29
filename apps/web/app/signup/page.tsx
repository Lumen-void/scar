import { AuthPage } from "../_components/auth-ui";

export default function SignupPage() {
  return (
    <AuthPage
      mode="signup"
      title="Create your traveler profile"
      detail="Build the profile SCAR uses to filter places, experiences, privacy, safety and itinerary rhythm."
      returnHref="/settings"
    />
  );
}
