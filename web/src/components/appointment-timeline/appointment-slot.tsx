import { PropsWithChildren } from "react";

type SlotProps = PropsWithChildren & {
  className?: string;
  children?: JSX.Element
};

const AppointmentSlot = ({ children, className }: SlotProps) => {
  return <div className={`h-24 p-4 ${className ?? ''}`}>{children}</div>;
};

export default AppointmentSlot;
