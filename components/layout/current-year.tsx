import { cacheLife } from "next/cache";

/** Cached so the footer stays statically prerendered under Cache Components. */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
