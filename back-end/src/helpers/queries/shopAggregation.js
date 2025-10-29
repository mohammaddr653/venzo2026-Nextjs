//gets the products to show in shop page
//note: I think this query is unnessesary . cause we can do it without aggregation . I can do it like this product.find({})...

const shopAggregation = (categoryArr, filterConditions, skip, limit) => {
  const query = [
    {
      $match: {
        categoryId: { $in: categoryArr },
        ...(filterConditions.length ? { $and: filterConditions } : {}),
      },
    },
    { $sort: { updatedAt: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        //شبیه به populate
        from: "media",
        localField: "img",
        foreignField: "_id",
        as: "img",
      },
    },
    { $unwind: { path: "$img", preserveNullAndEmptyArrays: true } },
    {
      $unset: ["img.createdAt", "img.updatedAt", "img._id", "img.__v"],
    },
    {
      $addFields: {
        hasProperties: {
          $gt: [{ $size: { $ifNull: ["$properties", []] } }, 0],
        },
      },
    },
    {
      $facet: {
        withProperties: [
          { $match: { hasProperties: true } },
          {
            $unwind: {
              path: "$properties",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: "properties",
              localField: "properties.property",
              foreignField: "_id",
              as: "properties.property",
            },
          },
          {
            $unwind: {
              path: "$properties.property",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $unwind: {
              path: "$properties.values",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: "propertyvals",
              localField: "properties.values.propertyval",
              foreignField: "_id",
              as: "properties.values.propertyval",
            },
          },
          {
            $unwind: {
              path: "$properties.values.propertyval",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $group: {
              _id: {
                productId: "$_id",
                propertyId: "$properties.property._id",
              },
              root: { $first: "$$ROOT" },
              property: { $first: "$properties.property" },
              selective: { $first: "$properties.selective" },
              values: { $push: "$properties.values" },
            },
          },
          {
            $group: {
              _id: "$_id.productId",
              root: { $first: "$root" },
              properties: {
                $push: {
                  property: "$property",
                  selective: "$selective",
                  values: "$values",
                },
              },
            },
          },
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: ["$root", { properties: "$properties" }],
              },
            },
          },
        ],
        withoutProperties: [{ $match: { hasProperties: false } }],
      },
    },
    {
      $project: {
        products: {
          $sortArray: {
            input: {
              $concatArrays: ["$withProperties", "$withoutProperties"],
            },
            sortBy: { updatedAt: -1 },
          },
        },
      },
    },
  ];
  return query;
};
module.exports = shopAggregation;
