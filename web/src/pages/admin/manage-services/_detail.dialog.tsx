import { getServiceModelSchema } from "../../../validation/service-model.schema";
import dayjs from "dayjs";
import { FC } from "react";
import { DialogProps } from "../../../interfaces/dialog-detail-props.interface";
import {
  ServiceCreateEntity,
  ServiceModel,
  ServiceUpdateEntity,
} from "../../../model/service.model";
import { Modal } from "@mantine/core";
import ServiceDetailDialog from "../../_shared/services/service-detail.dialog";

const AdminServiceDetailDialog: FC<
  DialogProps<ServiceModel, ServiceUpdateEntity, ServiceCreateEntity>
> = ({ data, opened, onClosed, mode }) => {
  const validateSchema = getServiceModelSchema(mode);

  return (
    <Modal
      onClose={() => onClosed && onClosed()}
      opened={opened}
      closeOnClickOutside={false}
      withCloseButton={false}
      size={"auto"}
      padding={0}
    >
      <ServiceDetailDialog
        validateSchema={validateSchema}
        title={mode === "view" ? "Service Detail" : "Service Product"}
        mode={mode}
        onFormReset={onClosed}
        onFormSubmit={onClosed as never}
        defaultValue={
          mode === "view" && data
            ? {
                ...data,
                discountStart: data.discountStart
                  ? dayjs(data.discountStart).toDate()
                  : null,
                discountEnd: data.discountEnd
                  ? dayjs(data.discountEnd).toDate()
                  : null,
                discountPercent: data.discountPercent ?? null,
                products: data.products.map((p) => ({
                  productId: p.product.id,
                  usage: p.usage,
                })),
              }
            : undefined
        }
      />
    </Modal>
  );
};

export default AdminServiceDetailDialog;
