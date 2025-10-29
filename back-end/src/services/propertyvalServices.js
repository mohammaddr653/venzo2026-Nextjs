const _ = require("lodash");
const Property = require("../models/property");
const Propertyval = require("../models/propertyval");
const { default: mongoose } = require("mongoose");
const Product = require("../models/product");
const withTransaction = require("../helpers/withTransaction");
const serviceResponse = require("../helpers/serviceResponse");

class PropertyvalServices {
  async getAllPropertyvals() {
    //reading all propertyvals
    const findOp = await Propertyval.find({});
    return serviceResponse(200, findOp);
  }

  async getPropertyvalsById(req) {
    //reading all propertyvals by id
    const findOp = await Propertyval.find({
      propertyId: req.params.propertyId,
    });
    return serviceResponse(200, findOp);
  }

  async seeOnePropertyval(req, res) {
    // reading one propertyval from database
    const findOp = await Propertyval.findById(req.params.propertyvalId);
    return serviceResponse(200, findOp);
  }

  async createPropertyval(req, res) {
    // create propertyval
    const repeatedValue = await Propertyval.findOne({
      propertyId: req.body.propertyId,
      value: req.body.value,
    });
    if (repeatedValue) return serviceResponse(409, {});

    const propertyval = new Propertyval({
      value: req.body.value,
    });
    const exist = await Property.findById(req.body.propertyId);
    if (!exist) return serviceResponse(400, {});
    if (exist.type === "color") {
      if (!req.body.hex) return serviceResponse(400, {});
      propertyval.hex = req.body.hex;
    }
    propertyval.propertyId = new mongoose.Types.ObjectId(req.body.propertyId);
    const saveOp = await propertyval.save();
    return serviceResponse(200, {});
  }

  async updatePropertyval(req, res) {
    const { data: propertyval } = await this.seeOnePropertyval(req, res);
    let repeatedPropertyval = await Propertyval.findOne({
      propertyId: propertyval.propertyId,
      value: req.body.value,
    });
    if (repeatedPropertyval && propertyval.value !== req.body.value) {
      return serviceResponse(400, {});
    }
    propertyval.value = req.body.value;
    //note:I think we can do this without transactions
    const transactionResult = await withTransaction(async (session) => {
      const updateOp = await propertyval.save({ session });
      return serviceResponse(200, {});
    });
    return transactionResult;
  }

  //checks if this propertyval is not used in any product then allow it to delete
  async deletePropertyval(req, res) {
    const { data: propertyval } = await this.seeOnePropertyval(req, res);
    let productsInUse = await Product.find(
      {
        properties: {
          $elemMatch: {
            name: propertyval.propertyId,
            values: { $elemMatch: { value: propertyval._id } },
          },
        },
      },
      { name: 1, _id: 0 }
    );
    if (productsInUse && productsInUse.length) {
      productsInUse = await Promise.all(
        productsInUse.map((item) => {
          return item.name;
        })
      );
      return serviceResponse(403, productsInUse);
    }
    const deleteOp = await Propertyval.deleteOne({
      _id: req.params.propertyvalId,
    });

    if (deleteOp.deletedCount > 0) {
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }
}
module.exports = new PropertyvalServices();
