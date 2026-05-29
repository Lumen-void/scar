function demoAction() {
  return {
    ok: true,
    mode: "public-demo",
    note: "Live operator actions are disabled in the public showcase build."
  };
}

export async function createActivityAssignment() {
  return demoAction();
}

export async function deleteActivityAssignment() {
  return demoAction();
}

export async function claimGuideAssignment() {
  return demoAction();
}

export async function updateDriverWaypointStatus() {
  return demoAction();
}

export async function updateVendorInventory() {
  return demoAction();
}

export async function validateActivityToken() {
  return demoAction();
}
