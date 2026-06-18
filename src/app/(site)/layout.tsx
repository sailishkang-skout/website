import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageViewTracker } from "@/components/site/PageViewTracker";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageViewTracker />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
