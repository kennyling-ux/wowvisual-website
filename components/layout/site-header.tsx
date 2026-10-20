import { Logo } from "@/components/ui/logo";
import { HeaderClient } from "./header-client";

export function SiteHeader() {
  return <HeaderClient logo={<Logo />} logoOnDark={<Logo tone="onDark" />} />;
}
