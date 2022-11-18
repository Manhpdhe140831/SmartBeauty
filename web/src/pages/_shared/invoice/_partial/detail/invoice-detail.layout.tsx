import { FC, ReactNode } from "react";
import { InvoiceModel } from "../../../../../model/invoice.model";

type InvoiceDetailProps = {
  invoice?: InvoiceModel;
  context: (invoice?: InvoiceModel) => ReactNode | JSX.Element;
  action: (invoice?: InvoiceModel) => ReactNode | JSX.Element;
};

const InvoiceDetailLayout: FC<InvoiceDetailProps> = ({
  invoice,
  context,
  action,
}) => {
  return (
    <div className="flex items-start space-x-6">
      <div className="flex flex-1 flex-col space-y-6 rounded-lg bg-white p-4 shadow">
        {context(invoice)}
      </div>

      <div className="flex w-72 flex-col space-y-6">{action(invoice)}</div>
    </div>
  );
};

export default InvoiceDetailLayout;
