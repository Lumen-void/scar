// Public demo build stub.
// The production database client and schema are intentionally not published.
export type GroundRuleType = string;
export type AdminRole = string;
export type AssetType = string;
export type AvailabilityStatus = string;
export type BookingInquiryStatus = string;
export type MediaType = string;
export type PublishStatus = string;
export type SourceKind = string;
export type SourceSeedMode = string;
export type SourceTrustLevel = string;
export type TravelProductCategory = string;
export type UserRole = string;
export type VerificationStatus = string;

export const prisma: any = new Proxy(
  {},
  {
    get() {
      return new Proxy(
        {},
        {
          get() {
            return async () => {
              throw new Error("Database access is disabled in the public demo build.");
            };
          }
        }
      );
    }
  }
);
