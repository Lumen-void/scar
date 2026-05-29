import { getPublishedRegionBySlug } from "@scar/db/admin";
import { RegionDetailPage } from "../../../_components/region-ui";

export const dynamic = "force-static";

export default async function KulluLahaulPage() {
  const region = await getPublishedRegionBySlug("kullu-lahaul");

  if (!region) {
    return null;
  }

  return <RegionDetailPage region={region} />;
}
