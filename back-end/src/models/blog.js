//this model need to be modified , maybe after setup the React for front-end , I want to save the html codes for articles

const mongoose = require("mongoose");
// const domPurifier = require("dompurify");
// const { JSDOM } = require("jsdom");
// const htmlPurify = domPurifier(new JSDOM().window);
const timestamp = require("mongoose-timestamp");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  }, //دسته بندی میتواند خالی باشد ولی مقاله هیچ جا نمایش داده نمی شود
  description: { type: String },
  img: { type: String, default: "" },
});
blogSchema.plugin(timestamp);

// blogSchema.pre("validate", function (next) {
//   if (this.description) {
//     this.description = htmlPurify.sanitize(this.description);
//   }
//   next();
// });

module.exports = mongoose.model("Blog", blogSchema);
