exports.getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
exports.condition = (searchKey, searchValue) => {
  var condition = searchKey
    ? { searchKey: { $regex: new RegExp(searchValue), $options: "i" } }
    : {};

  return condition;
};
