const queryKeys = {
    all: ["properties"],
    lists: ["properties", "list"],
    detail: (id) => ["properties", "detail", id],
  };
  
  export { queryKeys };
  