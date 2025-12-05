//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");
const uploadHandler = require("../../helpers/uploadHandler");
const pageRouter = require("./page");
const fileToReqBodyHandler = require("../../middlewares/fileToReqBody");
const compressor = require("../../middlewares/compressor");

//users

router.get("/dashboard/users", controller.getUsers.bind(controller));
router.get("/dashboard/users/:userId", controller.seeOneUser.bind(controller));
router.post(
  "/dashboard/users",
  validator.createCheck(),
  controller.validate.bind(controller),
  controller.createUser.bind(controller)
);
router.put(
  "/dashboard/users/:userId",
  validator.updateCheck(),
  controller.validate.bind(controller),
  controller.updateUser.bind(controller)
);
router.delete(
  "/dashboard/users/:userId",
  controller.deleteUser.bind(controller)
);

//categories

router.post(
  "/dashboard/categories",
  validator.categoryValidator(),
  controller.validate.bind(controller),
  controller.createCategory.bind(controller)
);

//list of all categories is in /categories

router.get(
  "/dashboard/categories/:categoryId",
  controller.seeOneCategory.bind(controller)
);
router.put(
  "/dashboard/categories/:categoryId",
  validator.categoryUpdateCheck(),
  controller.validate.bind(controller),
  controller.updateCategory.bind(controller)
);
router.delete(
  "/dashboard/categories/:categoryId",
  controller.deleteCategory.bind(controller)
);

//products

//get all products is in /shop

router.get(
  "/dashboard/products/:productId",
  controller.seeOneProduct.bind(controller)
);

router.post(
  "/dashboard/products",
  validator.productValidator(),
  controller.validate.bind(controller),
  controller.createProduct.bind(controller)
);

router.put(
  "/dashboard/products/:productId",
  validator.updateProductValidator(),
  controller.validate.bind(controller),
  controller.updateProduct.bind(controller)
);

router.delete(
  "/dashboard/products/:productId",
  controller.deleteProduct.bind(controller)
);

//properties

router.get("/dashboard/properties", controller.getProperties.bind(controller));

router.get(
  "/dashboard/properties/withvals",
  controller.getPropertiesWithVals.bind(controller)
);

router.get(
  "/dashboard/properties/:propertyId",
  controller.seeOneProperty.bind(controller)
);

router.post(
  "/dashboard/properties",
  validator.propertyValidator(),
  controller.validate.bind(controller),
  controller.createProperty.bind(controller)
);

router.put(
  "/dashboard/properties/:propertyId",
  validator.updatePropertyValidator(),
  controller.validate.bind(controller),
  controller.updateProperty.bind(controller)
);

router.delete(
  "/dashboard/properties/:propertyId",
  controller.deleteProperty.bind(controller)
);

//propertyvals

router.get(
  "/dashboard/propertyvals",
  controller.getPropertyvals.bind(controller)
);

router.get(
  "/dashboard/propertyvals/filter/:propertyId",
  controller.getPropertyvalsById.bind(controller)
);

router.get(
  "/dashboard/propertyvals/:propertyvalId",
  controller.seeOnePropertyval.bind(controller)
);

router.post(
  "/dashboard/propertyvals",
  validator.propertyvalValidator(),
  controller.validate.bind(controller),
  controller.createPropertyval.bind(controller)
);

router.put(
  "/dashboard/propertyvals/:propertyvalId",
  validator.updatePropertyvalValidator(),
  controller.validate.bind(controller),
  controller.updatePropertyval.bind(controller)
);

router.delete(
  "/dashboard/propertyvals/:propertyvalId",
  controller.deletePropertyval.bind(controller)
);

//blogs

router.get("/dashboard/blogs", controller.getBlogs.bind(controller));

router.get("/dashboard/blogs/:blogId", controller.seeOneBlog.bind(controller));

router.post(
  "/dashboard/blogs",
  validator.blogValidator(),
  controller.validate.bind(controller),
  controller.createBlog.bind(controller)
);

router.put(
  "/dashboard/blogs/:blogId",
  validator.updateBlogValidator(),
  controller.validate.bind(controller),
  controller.updateBlog.bind(controller)
);

router.delete(
  "/dashboard/blogs/:blogId",
  controller.deleteBlog.bind(controller)
);

//page

router.use("/dashboard/page", pageRouter);

//medias

router.get("/dashboard/medias", controller.getMedias.bind(controller));
router.get(
  "/dashboard/medias/:mediaId",
  controller.seeOneMedia.bind(controller)
);
router.post(
  "/dashboard/medias",
  uploadHandler("media", /jpeg|jpg|png|webp/, true, 1000),
  compressor("./uploads/medias",true),
  fileToReqBodyHandler("media", true),
  validator.mediaValidator(),
  controller.validate.bind(controller),
  controller.createMedia.bind(controller)
);
router.put(
  "/dashboard/medias/:mediaId",
  uploadHandler("media", /jpeg|jpg|png|webp/, false, 1000),
  compressor("./uploads/medias",true),
  fileToReqBodyHandler("media"),
  controller.updateMedia.bind(controller)
);

router.delete(
  "/dashboard/medias/:mediaId",
  controller.deleteMedia.bind(controller)
);

//tinymce uploads

router.post(
  "/dashboard/editor-uploads",
  uploadHandler("file", /jpeg|jpg|png|webp/, true, 1000),
  compressor("./uploads/editor-uploads",false),
  fileToReqBodyHandler("file", true),
  validator.fileValidator(),
  controller.validate.bind(controller),
  controller.createEditorUpload.bind(controller)
);


//orders

router.get("/dashboard/orders", controller.getAllOrders.bind(controller));
router.delete(
  "/dashboard/orders/:orderId",
  controller.exOrder.bind(controller)
);

module.exports = router;
