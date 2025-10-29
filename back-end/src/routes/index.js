//managing all routes
const express = require("express");
const router = express.Router();
const homeRouter = require("./home");
const authRouter = require("./auth");
const userRouter = require("./user");
const adminRouter = require("./admin");
const archiveRouter = require("./archive");
const singleArchiveRouter = require("./singleArchive");
const pageRouter = require("./page");
const shopRouter = require("./shop");
const singleShopRouter = require("./singleShop");
const categoriesRouter = require("./categories");
const cartRouter = require("./cart");
const ordersRouter = require("./orders");
const payRouter = require("./pay");
const tokenRouter = require("./token");
const verify = require("./verify");
const passRestore = require("./pass-restore");

const {
  isLoggedIn,
  isAdmin,
  notLoggedIn,
  setReqUser,
  notVerified,
  verified,
} = require("./../middlewares/auth");
const error = require("./../middlewares/error");

router.use(setReqUser); //if invalid token exists in request header set the req.user value
router.use("/", homeRouter);
router.use("/token", tokenRouter);
router.use("/auth", notLoggedIn, authRouter);
router.use("/pass-restore", passRestore);
router.use("/user", isLoggedIn, verified, userRouter);
router.use("/admin", isLoggedIn, isAdmin, verified, adminRouter);
router.use("/archive", archiveRouter);
router.use("/single-archive", singleArchiveRouter);
router.use("/categories", categoriesRouter);
router.use("/page", pageRouter);
router.use("/shop", shopRouter);
router.use("/single-shop", singleShopRouter);
router.use("/cart", isLoggedIn, verified, cartRouter);
router.use("/orders", isLoggedIn, verified, ordersRouter);
router.use("/pay", payRouter);
router.use("/verify", isLoggedIn, notVerified, verify);

router.use(error);

module.exports = router;
