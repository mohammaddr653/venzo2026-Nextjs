import Greetings from "@/features/greetings/components/greetings";
import Header from "@/features/header/components/header";
import Ads from "@/features/ads/components/ads";
import TrustBar from "@/features/trust-bar/components/trust-bar";
import { Metadata } from "next";
import NewestProductsCarousel from "@/features/products/components/newestProductsCarousel";
import OffProductsCarousel from "@/features/products/components/offProductsCarousel";
import adcollection1 from "@/data/adcollection1.json";
import adcollection2 from "@/data/adcollection2.json";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export const metadata: Metadata = {
  title: "محمدامین درخشنده | توسعه‌دهنده وب",
  description:
    "سلام . محمد امین درخشنده هستم ، توسعه دهنده وب . این رزومه آنلاین و پورتفولیوی من است . در این صفحه اطلاعاتی درباره من ، نمونه کارها و راه های ارتباط با من قرار دارد .",
  keywords: [
    "Amin Derakhshande",
    "Derakhshande",
    "developer",
    "Frontend Developer",
    "Next.js",
    "Nextjs",
    "React",
    "Typescript",
    "Javascript",
    "Web Developer",
    "Portfolio",
    "Resume",
    "Online resume",
    "محمد امین درخشنده",
    "درخشنده",
    "توسعه‌دهنده",
    "توسعه‌دهنده وب",
    "برنامه‌نویس",
    "برنامه‌نویس وب",
    "برنامه نویسی",
    "پورتفولیو",
    "رزومه آنلاین",
    "رزومه",
    "فرانت‌اند",
    "فول استک",
    "نکست جی‌اس",
    "ری‌اکت",
    "طراحی سایت",
    "برنامه نویسی سایت",
    "جاوااسکریپت",
  ],
  authors: [
    {
      name: "Mohammad Amin Derakhshande",
      url: `${baseURL}`,
    },
  ],
  openGraph: {
    title: "محمدامین درخشنده | توسعه‌دهنده وب",
    description:
      "سلام . محمد امین درخشنده هستم ، توسعه دهنده وب . این رزومه آنلاین و پورتفولیوی من است . در این صفحه اطلاعاتی درباره من ، نمونه کارها و راه های ارتباط با من قرار دارد .",
    url: `${baseURL}`,
    siteName: "Amin Derakhshande Portfolio | رزومه آنلاین محمدامین درخشنده",
    images: [
      {
        url: `${baseURL}/aminderakhshande.ir_screenshot.webp`,
        width: 1200,
        height: 630,
        alt: "Amin Derakhshande Portfolio Preview",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "محمدامین درخشنده | توسعه‌دهنده‌ وب",
    description:
      "سلام! من محمد امین درخشنده هستم ، توسعه دهنده وب . این رزومه آنلاین و پورتفولیوی من است . در این صفحه اطلاعاتی درباره من ، نمونه کارها و راه های ارتباط با من قرار دارد .",
    images: [`${baseURL}/aminderakhshande.ir_screenshot.webp`],
  },
  metadataBase: new URL(`${baseURL}`),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${baseURL}`,
  },
};

export default function Home() {
  return (
    <>
      <Header focus={false}></Header>
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "محمد امین درخشنده",
              url: `${baseURL}`,
              jobTitle: "توسعه‌دهنده وب",
              sameAs: [
                "https://www.instagram.com/mohammaddr653/?hl=fa",
                "https://telegram.me/mohammaddr653",
                "https://www.linkedin.com/in/amin-derakhshande/",
                "https://eitaa.com/mohammaddr653",
              ],
              description:
                "سلام! من محمد امین درخشنده هستم، توسعه‌دهنده وب. در این رزومه آنلاین می‌توانید نمونه کارها و مهارت‌های من را ببینید و با من در ارتباط باشید.",
              knowsAbout: [
                "Next.js",
                "React",
                "Typescript",
                "Javascript",
                "Nodejs",
                "Express",
                "Frontend Development",
                "Full Stack Development",
                "طراحی سایت",
                "برنامه نویسی وب",
              ],
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${baseURL}`,
              },
            }),
          }}
        />

        <div className="homepage-container flex flex-col gap-10 pb-20 pt-20">
          <div className="md:px-20 px-0">
            <Greetings></Greetings>
          </div>
          <div className="px-5 md:px-20">
            <TrustBar></TrustBar>
          </div>
          <div className="px-5 md:px-20 flex gap-3 [&>*]:basis-[250px] flex-wrap [&>*]:grow">
            {/* rez:750/255 */}
            <Ads
              data={adcollection1}
              width={750}
              height={255}
              sizes="(max-width: 800px) 100vw, 33vw"
              className="object-cover w-full"
            ></Ads>
          </div>
          <div className="px-5 md:px-20 mt-5">
            <NewestProductsCarousel></NewestProductsCarousel>
          </div>
          <div className="px-5 md:px-20 mt-5">
            <OffProductsCarousel></OffProductsCarousel>
          </div>
          <div className="px-5 md:px-20 flex gap-3 [&>*]:basis-[380px] flex-wrap [&>*]:grow">
            {/* rez:760/380 */}
            <Ads
              data={adcollection2}
              width={760}
              height={380}
              sizes="(max-width: 800px) 100vw, 50vw"
              className="object-cover w-full"
            ></Ads>
          </div>
        </div>
      </main>
    </>
  );
}
