import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

export const ShowFailedUpdate = () =>
  showNotification({
    title: "Thất Bại!",
    message: "Không thể cập nhật thông tin, xin hãy thử lại",
    color: "red",
    icon: <IconX />,
  });

export const ShowSuccessUpdate = () =>
  showNotification({
    title: "Thành Công!",
    message: "Cập nhật thông tin cho dữ liệu thành công",
    color: "teal",
    icon: <IconCheck />,
  });

export const ShowFailedDelete = () =>
  showNotification({
    title: "Thất Bại!",
    message: "Không thể xoá thông tin, xin hãy thử lại",
    color: "red",
    icon: <IconX />,
  });

export const ShowSuccessDelete = () =>
  showNotification({
    title: "Thành Công!",
    message: "Xoá thông tin thành công",
    color: "teal",
    icon: <IconCheck />,
  });

export const ShowFailedCreate = (message?: string) =>
  showNotification({
    title: "Thất Bại!",
    message: message ?? "Không thể tạo mới thông tin, xin hãy thử lại",
    color: "red",
    icon: <IconX />,
  });

export const ShowSuccessCreate = () =>
  showNotification({
    title: "Thành Công!",
    message: "Tạo mới thông tin thành công",
    color: "teal",
    icon: <IconCheck />,
  });
