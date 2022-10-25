import { ProductModel } from "../../../model/product.model";
import { FC } from "react";
import { Modal } from "@mantine/core";

type DialogProps = {
  product: ProductModel,
  opened: boolean;
  onClosed?: (withUpdate?: ProductModel) => void;
}

const ProductDetailDialog: FC<DialogProps> = ({ product, opened, onClosed }) => {
  return <Modal title={<h2 className={"font-semibold text-xl"}>{product.name}</h2>}
                onClose={() => onClosed && onClosed()}
                opened={opened} closeOnClickOutside={false}>
    <form className="w-[500px]">
      a
    </form>
  </Modal>;
};

export default ProductDetailDialog;
