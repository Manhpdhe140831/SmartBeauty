import { useQuery } from "@tanstack/react-query";
import mockStaff from "../../mock/staff";
import { StaffModel } from "../../model/staff.model";
import { getCustomerById } from "../../services/customer.service";
import mockCourse from "../../mock/course";
import { CourseModel } from "../../model/course.model";
import mockService from "../../mock/service";
import { ServiceModel } from "../../model/service.model";

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

export const useCourseDetailQuery = (courseId?: number) =>
  useQuery(["course-detail", courseId], async () => {
    if (courseId === undefined) {
      return null;
    }

    const ms = await mockCourse();
    return ms.find((s) => s.id === courseId) as CourseModel;
  });

export const useServiceDetailQuery = (serviceId?: number) =>
  useQuery(["service-detail", serviceId], async () => {
    if (serviceId === undefined) {
      return null;
    }

    const ms = await mockService();
    return ms.find((s) => s.id === serviceId) as ServiceModel;
  });
