//creates query for filter the products by url queries

const mongoose = require("mongoose");

const filterConditionsQuery = (req) => {
  const rawAttributes = req.query?.attributes ?? {};
  const query = Object.entries(rawAttributes).map(
    ([property, propertyvals]) => {
      const propertyId = new mongoose.Types.ObjectId(property);
      let vals = Array.isArray(propertyvals) ? propertyvals : [propertyvals];
      vals = vals.map(
        (propertyval) => new mongoose.Types.ObjectId(propertyval)
      );
      return {
        properties: {
          $elemMatch: {
            property: propertyId,
            values: {
              $elemMatch: {
                propertyval: { $in: vals },
              },
            },
          },
        },
      };
    }
  );
  return query;
};
module.exports = filterConditionsQuery;
