

export const Connection = {
  pageInfo: (connection) => connection.pageInfo,
  edges: (connection) => connection.edges,
};

export const Edge = {
  cursor: (edge) => edge.cursor,
  node: (edge) => edge.node,
};


export default async function paginate(records) {
  // const { first, after, last, before } = args; // TODO: pagination

  if( records instanceof Promise ) {
    records = await records;
  }

  return {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: records[0]?.id,
      endCursor: records[records.length - 1]?.id,
    },
    edges: records.map((record) => ({
      cursor: record.id,
      node: record,
    })),
  };
}
