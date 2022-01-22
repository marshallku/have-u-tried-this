export default async function setPagination(
  Collection: any,
  condition: object,
  page: number,
  perPage: number,
): Promise<object> {
  const total = await Collection.find(condition).countDocuments();
  const totalPage = Math.ceil(total / perPage);

  return {
    page,
    nextPage: page < totalPage,
  };
}
