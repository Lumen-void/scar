import { TripsIndexPage } from "../_components/product-ui";
import { getPublishedTripProducts } from "@scar/db/admin";

export const dynamic = "force-static";

export default async function TripsPage() {
  const products = await getPublishedTripProducts();
  return <TripsIndexPage products={products} />;
}
