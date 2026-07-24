import { notFound } from "next/navigation";
import { isLocale } from "@/lib/site";
import { getDict } from "@/content/dictionary";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  Hero,
  Proof,
  Services,
  Work,
  Process,
  Pricing,
  Faq,
  FinalCta,
} from "@/components/sections";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  return (
    <>
      <Nav locale={locale} dict={dict} />
      <main>
        <Hero locale={locale} dict={dict} />
        <Proof dict={dict} />
        <Services dict={dict} />
        <Work dict={dict} />
        <Process dict={dict} />
        <Pricing dict={dict} />
        <Faq dict={dict} />
        <FinalCta dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
