import { scarTravelProducts } from "@scar/domain";
import { getPublishedTripProductBySlug } from "@scar/db/admin";
import { TripDetailPage } from "../../_components/product-ui";

export const dynamic = "force-static";

export default async function LivingHeritagePage() {
  const product = await getPublishedTripProductBySlug("living-heritage");
  return <TripDetailPage product={product ?? scarTravelProducts[3]} />;
}
