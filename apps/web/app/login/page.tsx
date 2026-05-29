import { AuthPage } from "../_components/auth-ui";

export default function LoginPage() {
  return (
    <AuthPage
      mode="login"
      title="Login to your travel profile"
      detail="Access saved travel books, personal filters, security settings and your active itinerary."
      returnHref="/profile"
    />
  );
}
