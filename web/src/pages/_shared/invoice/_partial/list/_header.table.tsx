const HeaderTable = () => {
  return (
    <>
      <colgroup>
        <col className="w-14" />
        <col />
        <col className="w-40" />
        <col className="w-28" />
        <col className="w-32" />
        <col className="w-32" />
      </colgroup>
      <thead className="bg-blue-600 text-sm">
        <tr>
          <th className="!py-2 !text-center !text-white">No.</th>
          <th className="!py-2 !text-center !text-white">Customer</th>
          <th className="!py-2 !text-center !text-white">Staff In-charge</th>
          <th className="!py-2 !text-center !text-white">Status</th>
          <th className="!py-2 !text-center !text-white">Time</th>
          <th className="!py-2 !text-center !text-white">Price</th>
        </tr>
      </thead>
    </>
  );
};

export default HeaderTable;
