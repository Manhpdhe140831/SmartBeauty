export default function TableHeader() {
  return (
    <thead className="bg-blue-600 text-sm">
      <tr>
        <th className="!py-2 !text-center !text-white">No.</th>
        <th className="!py-2 !text-center !text-white">Mã hóa đơn</th>
        <th className="!py-2 !text-center !text-white">ngày hóa đơn</th>
        <th className="!py-2 !text-center !text-white">Nhà cung cấp</th>
        <th className="!py-2 !text-center !text-white">Tiền cần trả</th>
        <th className="!py-2 !text-center !text-white"></th>
      </tr>
    </thead>
  );
}
