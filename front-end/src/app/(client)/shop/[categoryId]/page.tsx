import Header from "@/features/header/components/header";
import { Metadata } from "next";
import { SERVER_API } from "../../../../../config";
import BreadCrumb from "@/components/breadCrumb";
import ChildCategories from "@/components/childCategories";
import FiltersForm from "@/features/shop-filters/components/filtersForm";
import ProductResponsiveCard from "@/features/products/components/product-responsive-card";
import Pagination from "@/components/pagination";
import MobFiltersForm from "@/features/shop-filters/components/mobFiltersForm";
import CountPerPage from "@/components/countPerPage";
import MobFiltersButton from "@/features/shop-filters/components/mobFiltersButton";
import MobFiltersCloseButton from "@/features/shop-filters/components/mobFiltersCloseButton";

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

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: { categoryId: string };
  searchParams: { [key: string]: string };
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const limit = parseInt(resolvedSearchParams.limit) || 2;
  const query = new URLSearchParams();
  for (let [key, val] of Object.entries(resolvedSearchParams)) {
    //اینجا داریم ساختار کوئری هامون رو جوری میسازیم که در سرور انتظارش رو میکشیم
    if (Array.isArray(val)) {
      for (let value of val) {
        query.append(key, value);
      }
    } else {
      for (let value of val.split(",")) {
        query.append(key, value);
      }
    }
  }
  const queryString = query.toString();

  const { categoryId } = resolvedParams;
  const response = (await (
    await fetch(`${SERVER_API}/shop/${categoryId}?${queryString}`, {
      cache: "no-store",
    })
  ).json()) as any;

  const products = [...response?.data?.products];
  const totalPagesCount = Math.ceil(response?.data?.totalCount / limit);
  const childCats = [...response?.data?.childCategories.slice(1)];
  const motherCats = [...response?.data?.motherCategories.reverse()];

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
        <div className="shopPage-container flex flex-col gap-10 pb-20 pt-20">
          <div className="flex flex-col gap-5">
            {motherCats?.length > 0 && (
              <BreadCrumb motherCats={motherCats}></BreadCrumb>
            )}
            {childCats?.length > 0 && (
              <ChildCategories
                childCats={childCats}
                categoryId={categoryId}
              ></ChildCategories>
            )}
          </div>
          <div className="flex flex-row justify-between items-start px-5 md:px-20 gap-5">
            <div className="hidden lg:flex flex-[1] flex-col gap-2 sticky top-[60px]">
              <FiltersForm categoryId={categoryId} query={query}></FiltersForm>
            </div>
            <div className=" flex flex-[4] flex-col justify-between gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex justify-start items-center rounded-md mt-auto">
                  <MobFiltersButton></MobFiltersButton>
                  <CountPerPage query={query} initialVal={limit}></CountPerPage>
                </div>
                {products?.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products?.map((item: any, index: any) => {
                      return (
                        //very similar to ProductCard...for now at least
                        <ProductResponsiveCard
                          key={index}
                          product={item}
                        ></ProductResponsiveCard>
                      );
                    })}
                  </div>
                ) : (
                  <p>محتوایی یافت نشد</p>
                )}
              </div>
              <div>
                <Pagination
                  totalPagesCount={totalPagesCount}
                  searchParams={resolvedSearchParams}
                ></Pagination>
              </div>
            </div>
          </div>
          <div className="hidden mobfilters-open:flex bg-white py-2 fixed lg:hidden top-0 flex-col left-0 w-[100vw] h-[100vh] z-50">
            <div className="flex justify-end">
              <MobFiltersCloseButton></MobFiltersCloseButton>
            </div>
            <MobFiltersForm
              categoryId={categoryId}
              query={query}
            ></MobFiltersForm>
          </div>
        </div>
      </main>
    </>
  );
}
