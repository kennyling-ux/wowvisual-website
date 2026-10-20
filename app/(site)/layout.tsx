import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { VideoModalProvider } from "@/components/work/video-modal";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <VideoModalProvider>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </VideoModalProvider>
  );
}
