//gets all the filters that used in a category

const filtersAggregation = (categoryArr) => {
  const query = [
    { $match: { categoryId: { $in: categoryArr } } },
    { $unwind: "$properties" },
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
    { $unwind: "$properties.values" },
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
      },
    },
    {
      $group: {
        _id: "$properties.property",
        values: {
          $addToSet: {
            propertyval: "$properties.values.propertyval",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        values: {
          $sortArray: {
            input: "$values",
            sortBy: { propertyval: 1 },
          },
        },
        property: "$_id",
      },
    },
    { $sort: { property: 1 } },
  ];
  return query;
};
module.exports = filtersAggregation;
