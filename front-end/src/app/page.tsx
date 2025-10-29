import About from "@/components/common/about";
import Greetings from "@/components/common/greetings";
import Projects from "@/components/common/projects";
import Skills from "@/components/common/skills";
import { Metadata } from "next";
import Contact from "@/components/common/contact";

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

      <div className="homepage-container flex flex-col gap-20 pb-20">
        <Greetings></Greetings>
        <About></About>
        <Skills></Skills>
        <Projects></Projects>
        <Contact></Contact>
      </div>
    </main>
  );
}
