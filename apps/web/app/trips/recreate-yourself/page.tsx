import { scarTravelProducts } from "@scar/domain";
import { getPublishedTripProductBySlug } from "@scar/db/admin";
import { TripDetailPage } from "../../_components/product-ui";

export const dynamic = "force-static";

export default async function RecreateYourselfPage() {
  const product = await getPublishedTripProductBySlug("recreate-yourself");
  return <TripDetailPage product={product ?? scarTravelProducts[0]} />;
}
