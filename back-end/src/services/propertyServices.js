const User = require("../models/user");
const _ = require("lodash");
const Property = require("../models/property");
const Propertyval = require("../models/propertyval");
const Product = require("../models/product");
const withTransaction = require("../helpers/withTransaction");
const serviceResponse = require("../helpers/serviceResponse");

class PropertyServices {
  async getAllProperties(req) {
    //reading all properties
    const findOp = await Property.find({});
    return serviceResponse(200, findOp);
  }

  //note:maybe I can do this with aggregation
  async getPropertiesWithVals(req) {
    //reading all properties with values
    const result = [];
    const properties = await Property.find({});
    for (const property of properties) {
      const data = {
        _id: property._id,
        name: property.name,
        specifiedVals: property.specifiedVals,
        type: property.type,
        values: [],
      };
      data.values = await Propertyval.find(
        { propertyId: property._id },
        { _id: 1, value: 1, hex: 1 }
      );
      result.push(data);
    }
    return serviceResponse(200, result);
  }

  async seeOneProperty(req, res) {
    // reading one property from database
    const findOp = await Property.findById(req.params.propertyId);
    return serviceResponse(200, findOp);
  }

  async createProperty(req, res) {
    // create property
    let property = await Property.findOne({ name: req.body.name });
    if (property) {
      return serviceResponse(400, {});
    }
    property = new Property(
      _.pick(req.body, ["name", "specifiedVals", "type"])
    );
    const saveOp = await property.save();
    return serviceResponse(200, {});
  }

  async updateProperty(req, res) {
    //if you changed the name field , it checks if its exists or not , then it updates the property
    const { data: property } = await this.seeOneProperty(req, res);
    let repeatedProperty = await Property.findOne({ name: req.body.name });
    if (repeatedProperty && property.name !== req.body.name) {
      return serviceResponse(400, {});
    }
    property.name = req.body.name;

    const transactionResult = await withTransaction(async (session) => {
      const updateOp = await property.save({ session });
      return serviceResponse(200, {});
    });
    return transactionResult;
  }

  //checks if this property is not used in any product then allow it to delete
  async deleteProperty(req, res) {
    const { data: property } = await this.seeOneProperty(req, res);
    let productsInUse = await Product.find(
      {
        properties: { $elemMatch: { name: property._id } },
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

    const transactionResult = await withTransaction(async (session) => {
      const deleteOp = await Property.deleteOne(
        { _id: req.params.propertyId },
        { session }
      );
      if (deleteOp.deletedCount > 0) {
        await Propertyval.deleteMany(
          { propertyId: req.params.propertyId },
          { session }
        );
        return serviceResponse(200, {});
      }
      return serviceResponse(404, {});
    });
    return transactionResult;
  }
}
module.exports = new PropertyServices();
