import { ProductModel } from "../../../../model/product.model";
import { FC, useEffect, useState } from "react";
import { Text } from "@mantine/core";

type cellProps = {
  product: ProductModel
}

type displayPriceType = {
  actualPrice: string;
  discountedFrom?: string;
  percentage?: number;
}

function formatPrice(price: number) {
  // 123456 -> 123.456
  return new Intl.NumberFormat("vi-VN").format(price);
}

const ProductPriceCell: FC<cellProps> = ({ product }) => {
  const [displayPrice, setDisplayPrice] = useState<displayPriceType>({
    actualPrice: formatPrice(product.price)
  });

  useEffect(() => {
    if (product.salePercent === null) {
      // skip the process. The sale context is invalid
      // -> display price as not sale.
      setDisplayPrice({
        actualPrice: formatPrice(product.price)
      });
      return;
    }

    setDisplayPrice({
      discountedFrom: formatPrice(product.price),
      actualPrice: formatPrice(Math.round((product.price / 100) * (100 - product.salePercent))),
      percentage: product.salePercent
    });
  }, [product]);

  return <div className="flex flex-col items-center justify-center space-y-1">
    {
      displayPrice.percentage ? (
        <>
          <Text
            className={"leading-tight"}
            color={"dimmed"}
            strikethrough
            size={"xs"}
          >
            {displayPrice.discountedFrom}
          </Text>
          <Text>{displayPrice.actualPrice}</Text>
        </>
      ) : <Text>{displayPrice.actualPrice}</Text>
    }
  </div>;
};

export default ProductPriceCell;
