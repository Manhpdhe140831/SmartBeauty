const TableHeader = () => {
  return (
    <thead className="bg-blue-600 text-sm">
      <tr>
        <th className="!py-2 !text-center !text-white">No.</th>
        <th className="!py-2 !text-center !text-white">Name</th>
        <th className="!py-2 !text-center !text-white">Mobile</th>
        <th className="!py-2 !text-center !text-white">Email</th>
        <th className="!py-2 !text-center !text-white">Address</th>
        <th className="!py-2 !text-center !text-white"></th>
      </tr>
    </thead>
  );
};

export default TableHeader;
