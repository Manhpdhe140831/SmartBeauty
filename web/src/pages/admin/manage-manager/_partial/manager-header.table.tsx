const ManagerHeaderTable = () => {
  return (
    <>
      <colgroup>
        <col className="w-14" />
        <col className="w-44" />
        <col className="w-32" />
        <col className="w-44" />
        <col />
        <col className="w-[104px]" />
      </colgroup>
      <thead className="bg-blue-600 text-sm">
        <tr>
          <th className="!py-2 !text-center !text-white">No.</th>
          <th className="!py-2 !text-center !text-white">Name</th>
          <th className="!py-2 !text-center !text-white">Phone Number</th>
          <th className="!py-2 !text-center !text-white">Email</th>
          <th className="!py-2 !text-center !text-white">Address</th>
          <th className="!py-2 !text-center !text-white"></th>
        </tr>
      </thead>
    </>
  );
};

export default ManagerHeaderTable;
