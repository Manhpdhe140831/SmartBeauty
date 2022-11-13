import { useQuery } from "@tanstack/react-query";
import mockStaff from "../../mock/staff";
import { StaffModel } from "../../model/staff.model";
import { getCustomerById } from "../../services/customer.service";

export const useCustomerDetailQuery = (customerId?: number) =>
  useQuery(["customer-detail", customerId], () => {
    if (customerId === undefined) {
      return null;
    }
    return getCustomerById(customerId);
  });

export const useStaffDetailQuery = (staffId?: number) =>
  useQuery(["staff-detail", staffId], async () => {
    if (staffId === undefined) {
      return null;
    }

    const ms = await mockStaff();
    return ms.find((s) => s.id === staffId) as StaffModel;
  });
