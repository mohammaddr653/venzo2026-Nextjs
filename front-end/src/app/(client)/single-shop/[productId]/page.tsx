import Header from "@/features/header/components/header";
import { SERVER_API } from "../../../../../config";
import BreadCrumb from "@/components/breadCrumb";
import TitleRight from "@/components/title-right";
import SingleShopGallery from "@/features/single-shop-gallery/components/singleShop-gallery";
import NonSelectivePropertiesGrid from "@/features/products/components/non-selective-properties-grid";
import PropertiesTable from "@/features/products/components/propertiesTable";
import SingleShopPrice from "@/features/products/components/single-shop-price";

const SingleShopPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const resolvedParams = await params;
  const { productId } = resolvedParams;

  const response = (await (
    await fetch(SERVER_API + `/single-shop/withProperties/${productId}`, {
      cache: "no-store",
    })
  ).json()) as any;

  const product = response.data.product;
  const motherCats = [...response?.data.motherCategories.reverse()];

  return (
    <>
      <Header focus={true}></Header>
      <main>
        <div className="singleShopPage-container flex flex-col gap-5 pt-20 pb-20">
          {motherCats?.length ? (
            <BreadCrumb motherCats={motherCats}></BreadCrumb>
          ) : null}
          <div className="flex flex-col md:flex-row gap-10 px-5 md:px-20">
            <div className="flex flex-col items-end md:items-start md:flex-row gap-4 flex-6">
              <SingleShopGallery product={product}></SingleShopGallery>
            </div>
            <div className=" flex-11 w-full flex flex-col gap-10">
              <div>
                <TitleRight title={product?.name}></TitleRight>
              </div>
              <NonSelectivePropertiesGrid
                product={product}
              ></NonSelectivePropertiesGrid>
              <SingleShopPrice product={product}></SingleShopPrice>
            </div>
          </div>
          {product?.description === "" ? null : (
            <div className=" px-5 md:px-20 mt-0 md:mt-10 flex flex-col gap-4">
              <h4 className="font-weight300 text-neutral-800">بررسی محصول</h4>
              <div
                className="text-justify border border-neutral-300 p-5 rounded-md text-neutral-700 leading-loose text-size16"
                dangerouslySetInnerHTML={{ __html: product?.description }}
              ></div>
            </div>
          )}
          <PropertiesTable product={product}></PropertiesTable>
        </div>
      </main>
    </>
  );
};
export default SingleShopPage;
