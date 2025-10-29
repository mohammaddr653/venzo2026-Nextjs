module.exports = function (app, express, path) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "..", "client")));
  app.use("/public", express.static(path.join(__dirname, "..", "public"))); //چون dirname مسیر همین فایل رو نشون میده پس باید اول یک پوشه به عقب بره تا برسه به public
  app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
};
