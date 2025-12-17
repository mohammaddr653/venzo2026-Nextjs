//creates query for filter the products by url queries

import mongoose from 'mongoose';

const filterConditionsQuery = (attributes: any) => {
  const rawAttributes = attributes ?? {};
  const query = Object.entries(rawAttributes).map(([property, propertyvals]) => {
    const propertyId = new mongoose.Types.ObjectId(property);
    let vals = Array.isArray(propertyvals) ? propertyvals : [propertyvals];
    vals = vals.map((propertyval) => new mongoose.Types.ObjectId(propertyval));
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
  });
  return query;
};
export default filterConditionsQuery;
