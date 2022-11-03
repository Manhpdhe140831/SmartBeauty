import { PropsWithChildren } from "react";

type SlotProps = PropsWithChildren & {
  className?: string;
};

const AppointmentSlot = ({ children, className }: SlotProps) => {
  return <div className={`h-32 ${className ?? ''}`}>{children}</div>;
};

export default AppointmentSlot;
