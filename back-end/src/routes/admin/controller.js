//controller
const debug = require("debug")("app");
const blogServices = require("../../services/blogServices");
const categoriesServices = require("../../services/categoriesServices");
const editorServices = require("../../services/editorServices");
const mediaServices = require("../../services/mediaServices");
const orderServices = require("../../services/orderServices");
const productServices = require("../../services/productServices");
const propertyServices = require("../../services/propertyServices");
const propertyvalServices = require("../../services/propertyvalServices");
const userServices = require("../../services/userServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getUsers(req, res) {
    const result = await userServices.getAllUsers(req);
    return this.response({
      res,
      message: "this is all users",
      data: result.data,
    });
  }

  async seeOneUser(req, res) {
    const result = await userServices.seeOneUser(req, res);
    return this.response({
      res,
      message: "this is user",
      data: result.data,
    });
  }

  async createUser(req, res) {
    const result = await userServices.registerUser(req, res);

    if (result.status === 400)
      return this.response({
        res,
        message: "کاربری با این ایمیل قبلا ثبت نام کرده است",
        code: result.status,
      });

    if (result.status === 200)
      return this.response({
        res,
        message: "کاربر با موفقیت ثبت نام شد",
        data: result.data,
      });

    throw new Error("something went wrong");
  }

  async updateUser(req, res) {
    const result = await userServices.updateUser(req, res);

    if (result.status === 200)
      return this.response({
        res,
        message: "کاربر با موفقیت بروزرسانی شد",
      });

    if (result.status === 400)
      return this.response({
        res,
        message: "کاربری با این ایمیل قبلا ثبت نام کرده است",
        code: result.status,
      });

    throw new Error("something went wrong");
  }

  async deleteUser(req, res) {
    const result = await userServices.deleteUser(req, res);

    if (result.status === 200)
      return this.response({
        res,
        message: "کاربر با موفقیت حذف شد",
      });

    if (result.status === 400)
      return this.response({
        res,
        message: "شما نمیتوانید خود را حذف کنید",
        code: result.status,
      });

    if (result.status === 404)
      return this.response({
        res,
        message: "حذف کاربر ناموفق بود",
        code: result.status,
      });

    throw new Error("something went wrong");
  }

  async createCategory(req, res) {
    const result = await categoriesServices.createCategory(req, res);
    if (result.status === 200)
      return this.response({
        res,
        message: "دسته بندی با موفقیت ساخته شد",
        data: result.data,
      });
    if (result.status === 404)
      return this.response({
        res,
        message: "ساخت دسته بندی ناموفق بود",
        code: result.status,
      });
    throw new Error("something went wrong");
  }

  async seeOneCategory(req, res) {
    const result = await categoriesServices.seeOneCategory(req, res);
    return this.response({
      res,
      message: "نمایش یک دسته بندی",
      data: result.data,
    });
  }

  async updateCategory(req, res) {
    const result = await categoriesServices.updateCategory(req, res);
    if (result.status === 200)
      return this.response({
        res,
        message: "دسته بندی با موفقیت بروزرسانی شد",
      });

    if (result.status === 404)
      return this.response({
        res,
        message: "بروزرسانی دسته بندی ناموفق بود",
        code: result.status,
      });
    throw new Error("something went wrong");
  }

  async deleteCategory(req, res) {
    const parentCategoryId = await categoriesServices.deleteCategory(req, res); //آیدی کتگوری انتخاب شده را حذف میکنه و آیدی کتگوری بالاتر را برمیگردونه تا محصولات کتگوری حذف شده رو بهش منتقل کنیم
    if (parentCategoryId.status === 200) {
      const sendProductsToParent = await productServices.sendToParentCategory(
        parentCategoryId.data,
        req,
        res
      );
      const sendBlogsToParent = await blogServices.sendToParentCategory(
        parentCategoryId.data,
        req,
        res
      );
      return this.response({
        res,
        message: "دسته بندی با موفقیت حذف شد",
      });
    }
    throw new Error("something went wrong");
  }

  //note:think about deleting this controller because I think its repeated in another controller too .
  async seeOneProduct(req, res) {
    const result = await productServices.getSingleShopWithProperties(req, res);
    return this.response({
      res,
      message: "نمایش یک محصول",
      data: result.data,
    });
  }

  async createProduct(req, res) {
    const result = await productServices.createProduct(req, res);
    return this.response({
      res,
      message: "محصول با موفقیت ساخته شد",
      data: result.data,
    });
  }

  async updateProduct(req, res) {
    const result = await productServices.updateProduct(req, res);
    return this.response({
      res,
      message: "محصول با موفقیت بروزرسانی شد",
    });
  }

  async deleteProduct(req, res) {
    const result = await productServices.deleteProduct(req, res);
    if (result.status === 200)
      return this.response({
        res,
        message: "محصول با موفقیت حذف شد",
      });
    if (result.status === 404)
      return this.response({
        res,
        message: "حذف محصول ناموفق بود",
        code: result.status,
      });
    throw new Error("something went wrong");
  }

  async getBlogs(req, res) {
    const result = await blogServices.getAllBlogs(req, res);
    return this.response({
      res,
      message: "لیست مقالات",
      data: result.data,
    });
  }

  async seeOneBlog(req, res) {
    const result = await blogServices.seeOneBlog(req, res);
    return this.response({
      res,
      message: "نمایش یک مقاله",
      data: result.data,
    });
  }

  async createBlog(req, res) {
    const result = await blogServices.createBlog(req, res);
    return this.response({
      res,
      message: "مقاله با موفقیت ساخته شد",
      data: result.data,
    });
  }

  async updateBlog(req, res) {
    const result = await blogServices.updateBlog(req, res);
    if (result.status === 200)
      return this.response({
        res,
        message: "مقاله با موفقیت بروزرسانی شد",
      });

    if (result.status === 404)
      return this.response({
        res,
        message: "خطا در بروزرسانی مقاله",
        code: result.status,
      });

    throw new Error("something went wrong");
  }

  async deleteBlog(req, res) {
    const result = await blogServices.deleteBlog(req, res);
    if (result.status === 200)
      return this.response({
        res,
        message: "مقاله با موفقیت حذف شد",
      });

    if (result.status === 404)
      return this.response({
        res,
        message: "حذف مقاله ناموفق بود",
        code: result.status,
      });

    throw new Error("something went wrong");
  }

  async getProperties(req, res) {
    const result = await propertyServices.getAllProperties(req);
    return this.response({
      res,
      message: "this is all properties",
      data: result.data,
    });
  }

  async getPropertiesWithVals(req, res) {
    const result = await propertyServices.getPropertiesWithVals(req);
    return this.response({
      res,
      message: "this is all properties with vals",
      data: result.data,
    });
  }

  async seeOneProperty(req, res) {
    const result = await propertyServices.seeOneProperty(req, res);
    return this.response({
      res,
      message: "this is property",
      data: result.data,
    });
  }

  async createProperty(req, res) {
    const result = await propertyServices.createProperty(req, res);
    if (result.status === 400)
      return this.response({
        res,
        message: "یک ویژگی با این نام قبلا ساخته شده است",
        code: result.status,
      });

    return this.response({
      res,
      message: "ویژگی ساخته شد",
    });
  }

  async updateProperty(req, res) {
    const result = await propertyServices.updateProperty(req, res);
    if (result.status === 200)
      return this.response({
        res,
        message: "ویژگی با موفقیت بروزرسانی شد",
      });
    if (result.status === 400)
      return this.response({
        res,
        message: "نام ویژگی تکراری است",
        code: result.status,
      });

    throw new Error("something went wrong");
  }

  async deleteProperty(req, res) {
    const result = await propertyServices.deleteProperty(req, res);
    if (result.status === 403)
      return this.response({
        res,
        message: `این ویژگی در محصولات زیر استفاده می شود ${result.data}`,
        code: result.status,
      });
    if (result.status === 200)
      return this.response({
        res,
        message: "ویژگی با موفقیت حذف شد",
      });
    if (result.status === 404)
      return this.response({
        res,
        message: "حذف ویژگی ناموفق بود",
        code: result.status,
      });
    throw new Error("something went wrong");
  }

  async getPropertyvals(req, res) {
    const result = await propertyvalServices.getAllPropertyvals();
    return this.response({
      res,
      message: "this is all propertyvals",
      data: result.data,
    });
  }

  async getPropertyvalsById(req, res) {
    const result = await propertyvalServices.getPropertyvalsById(req);
    return this.response({
      res,
      message: "this is all propertyvals by id",
      data: result.data,
    });
  }

  async seeOnePropertyval(req, res) {
    const result = await propertyvalServices.seeOnePropertyval(req, res);
    return this.response({
      res,
      message: "this is propertyval",
      data: result.data,
    });
  }

  async createPropertyval(req, res) {
    const result = await propertyvalServices.createPropertyval(req, res);
    if (result.status === 409)
      return this.response({
        res,
        message: "این مقدار ویژگی تکراری است",
        code: result.status,
      });

    if (result.status === 400)
      return this.response({
        res,
        message: "ساخت مقدار ویژگی ناموفق بود",
        code: result.status,
      });

    if (result.status === 200)
      return this.response({
        res,
        message: "مقدار ویژگی ساخته شد",
      });

    throw new Error("something went wrong");
  }

  async updatePropertyval(req, res) {
    const result = await propertyvalServices.updatePropertyval(req, res);

    if (result.status === 200)
      return this.response({
        res,
        message: "مقدار ویژگی با موفقیت بروزرسانی شد",
      });

    if (result.status === 400)
      return this.response({
        res,
        message: "این مقدار ویژگی تکراری است",
        code: result.status,
      });

    throw new Error("something went wrong");
  }

  async deletePropertyval(req, res) {
    const result = await propertyvalServices.deletePropertyval(req, res);

    if (result.status === 403)
      return this.response({
        res,
        message: `این مقدار ویژگی در محصولات زیر استفاده می شود ${result.data}`,
        code: result.status,
      });

    if (result.status === 200)
      return this.response({
        res,
        message: "مقدار ویژگی با موفقیت حذف شد",
      });

    if (result.status === 403)
      return this.response({
        res,
        message: "حذف مقدار ویژگی ناموفق بود",
        code: result.status,
      });

    throw new Error("something went wrong");
  }

  async getMedias(req, res) {
    const result = await mediaServices.getAllMedias(req, res);
    return this.response({
      res,
      message: "لیست تمام رسانه ها",
      data: result.data,
    });
  }

  async seeOneMedia(req, res) {
    const result = await mediaServices.seeOneMedia(req, res);
    return this.response({
      res,
      message: "this is media",
      data: result.data,
    });
  }

  async createMedia(req, res) {
    const result = await mediaServices.createMedia(req, res);
    return this.response({
      res,
      message: "رسانه با موفقیت اضافه شد",
      data: result.data,
    });
  }

  async updateMedia(req, res) {
    const result = await mediaServices.updateMedia(req, res);
    if (result.status === 200)
      return this.response({
        res,
        message: "رسانه با موفقیت بروزرسانی شد",
      });

    if (result.status === 404)
      return this.response({
        res,
        message: "رسانه یافت نشد",
        code: result.status,
      });
  }

  async deleteMedia(req, res) {
    const result = await mediaServices.deleteMedia(req, res);

    if (result.status === 200)
      return this.response({
        res,
        message: "رسانه با موفقیت حذف شد",
      });

    if (result.status === 404)
      return this.response({
        res,
        message: "حذف رسانه ناموفق بود",
        code: result.status,
      });

    throw new Error("something went wrong");
  }

  async createEditorUpload(req, res) {
    const result = await editorServices.createUpload(req, res);
    return this.response({
      res,
      message: "فایل با موفقیت آپلود شد",
      data: result.data,
    });
  }

  async getAllOrders(req, res) {
    const result = await orderServices.seeAllOrders(req, res);
    return this.response({
      res,
      message: "لیست تمام سفارشات فروشگاه",
      data: result.data,
    });
  }

  async exOrder(req, res) {
    const result = await orderServices.expireOrder(req, res);
    if (result.status === 200)
      return this.response({
        res,
        message: "سفارش با موفقیت منقضی شد",
      });

    if (result.status === 409)
      return this.response({
        res,
        message: "منقضی کردن سفارشات تکمیل شده یا در حال پرداخت غیر ممکن است",
        code: result.status,
      });

    throw new Error("something went wrong");
  }
})();
