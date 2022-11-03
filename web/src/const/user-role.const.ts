/**
 * User role.
 * 'all' | 'anonymous' | 'authenticated'
 * These roles are handled internally by the client.
 * (page guard feature, visit `AppPageInterface.guarded` for more detail).
 * - `all`: This route does not have any restrictions.
 * - `anonymous`: This route is restricted to unauthenticated user only.
 * - `authenticated`: This route is restricted to authenticated user only.
 *
 * For other default roles (`admin`, `manager` and `employee`),
 * it will be restricted to that role only.
 */
export enum USER_ROLE {
  all = "all",
  anonymous = "unauthenticated",
  authenticated = "authenticated",
  admin = "admin",
  manager = "manager",
  sale_staff = "sale_staff",
  technical_staff = "technical_staff",
}
