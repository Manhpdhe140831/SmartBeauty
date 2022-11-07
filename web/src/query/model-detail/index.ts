import { useQuery } from "@tanstack/react-query";
import mockCustomer from "../../mock/customer";
import { CustomerModel } from "../../model/customer.model";
import mockStaff from "../../mock/staff";
import { StaffModel } from "../../model/staff.model";

export const useCustomerDetailQuery = (customerId?: number) =>
  useQuery(["customer-detail", customerId], async () => {
    console.log("trigger when: ", customerId);
    if (customerId === undefined) {
      return null;
    }
    const mc = await mockCustomer();
    return mc.find((c) => c.id === customerId) as CustomerModel;
  });

export const useStaffDetailQuery = (staffId?: number) =>
  useQuery(["staff-detail", staffId], async () => {
    if (staffId === undefined) {
      return null;
    }

    const ms = await mockStaff();
    return ms.find((s) => s.id === staffId) as StaffModel;
  });
