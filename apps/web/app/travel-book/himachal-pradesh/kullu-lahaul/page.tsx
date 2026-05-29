import { getPublishedRegionBySlug } from "@scar/db/admin";
import { GroundBookRegionPage } from "../../../_components/travel-book-ui";

export const dynamic = "force-static";

export default async function KulluLahaulGroundBookPage() {
  const region = await getPublishedRegionBySlug("kullu-lahaul");

  if (!region) {
    return null;
  }

  return <GroundBookRegionPage region={region} />;
}
