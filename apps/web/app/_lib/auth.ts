import { redirect } from "next/navigation";
import type { AdminRole } from "@scar/db";

export function verifyPassword() {
  return false;
}

export async function createAdminSession() {
  return null;
}

export async function getAdminSession() {
  return null;
}

export async function requireAdmin() {
  redirect("/operator-login");
}

export async function requireAdminRole(_allowedRoles: AdminRole[]) {
  redirect("/operator-login");
}

export async function clearAdminSession() {
  return null;
}
