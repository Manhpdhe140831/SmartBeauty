const ProductHeaderTable = () => {
  return (
    <>
      <colgroup>
        <col className="w-14" />
        <col className="w-32" />
        <col />
        <col className="w-28" />
        <col className="w-28" />
        <col className="w-32" />
      </colgroup>

      <thead className="font-semibold">
        <tr>
          <th className={"p-2 !text-center"}>No.</th>
          <th className={"p-2 !text-center"}>Image</th>
          <th className={"py-2 pr-2"}>Name</th>
          <th className={"p-2 !text-center"}>Price</th>
          <th className={"p-2 !text-center"}>Supplier</th>
          <th className={"p-2"}>Import/Expire</th>
        </tr>
      </thead>
    </>
  );
};

export default ProductHeaderTable;
