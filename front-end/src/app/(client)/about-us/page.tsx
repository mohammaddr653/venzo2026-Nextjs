import Header from "@/features/header/components/header";
import { Metadata } from "next";
import Image from "next/image";
import { BREAK_POINTS } from "../../../../config";

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

export default function AboutUsPage() {
  return (
    <>
      <Header focus={true}></Header>
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

        <div className="aboutuspage-container flex flex-col md:flex-row justify-between items-center px-5 md:px-20 py-20">
          <div className=" w-full flex flex-col gap-5">
            <h2 className="text-size24 font-weight300">درباره اگزو</h2>
            <p className="text-justify">
              فروشگاه آنلاین اگزو، یک فروشگاه تخصصی در حوزه تجهیزات و کالاهای
              گیمینگ است که از سال ۹۵ کار خود را با هدف ارائه‌ی خدمات اعم از
              فروش و مشاوره تخصصی کالاهای سخت افزاری، گیمینگ و شبکه آغاز کرد.
              شما می‌توانید در این فروشگاه بهترین کالاهای گیمینگ از برندهای
              معتبر را با بهترین کیفیت دریافت کنید و یا از طریق تماس با
              کارشناسان فروشگاه اگزو، که خود نفرات فنی توانمند کشور در حوزه
              کامپیوتر و گیم هستند، سوالات و مشکلات خود در میان بگذارید. فروشگاه
              اگزو به عنوان نماینده‌ی فروش بسیاری از برندهای معتبر گیمینگ از
              قبیل ریزر٬ رپو٬ ام‌اس‌آی، ایسوس٬ لاجیتک و ... این تضمین را به شما
              می‌دهد که کالای اصیل مد نظر شما در اسرع وقت و با بهترین بسته بندی
              در اختیار شما قرار می‌گیرد. شما عزیزان می‌توانید از طریق شبکه‌های
              اجتماعی فروشگاه اگزو از قبیل کانال تلگرام٬ صفحه‌ی اینستاگرام،
              یوتیوب و آپارات از آخرین اخبار دنیای بازی، تخفیفات، کالاها و
              پشنهادهای ویژه ما آگاه شوید. همچنین می‌توانید از طریق شماره تلفن
              02191007083 و یا از طریق صفحه درخواست جهت مشاوره و یا طرح سوالات
              خود با کارشناسان فروشگاه در ارتباط باشید.
            </p>
            <h6>لذت گیم با اگزو گیم ؛ عرضه کننده تخصصی کالاهای گیمینگ</h6>
          </div>
          <div className="bg-green-300 w-full">
            {/* rez:730/730 */}
            <Image
              src={"/image_2023-06-10_12-39-02.png"}
              alt="box-image"
              width={730}
              height={730}
              sizes={`
                (max-width: ${BREAK_POINTS.sm}px) 596px,
                (max-width: ${BREAK_POINTS.md}px) 727px,
                (max-width: ${BREAK_POINTS.lg}px) 432px,
                728px
              `}
            ></Image>
          </div>
        </div>
      </main>
    </>
  );
}
