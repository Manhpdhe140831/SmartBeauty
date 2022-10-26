const ProductTableHeader = () => {
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
          <td className={"p-2 text-center"}>No.</td>
          <td className={"p-2 text-center"}>Image</td>
          <td className={"py-2 pr-2"}>Name</td>
          <td className={"p-2 text-center"}>Price</td>
          <td className={"p-2 text-center"}>Supplier</td>
          <td className={"p-2"}>Import/Expire</td>
        </tr>
      </thead>
    </>
  );
};

export default ProductTableHeader;
