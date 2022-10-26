import { Badge, Image, Text, Tooltip } from "@mantine/core";
import styleRow from "../../../../styles/product-row.module.scss";
import { IconArrowDown } from "@tabler/icons";
import { ProductModel } from "../../../../model/product.model";
import { FC, useState } from "react";
import ProductPriceCell from "./_product-price.cell";
import dayjs from "dayjs";
import ProductDetailDialog from "../_product-detail-dialog";

type productRowProps = {
  product: ProductModel,
  no: number
  rowUpdated?: () => void
}

const ProductTableRow: FC<productRowProps> = ({ product, no, rowUpdated }) => {
  const [viewingDetail, setViewingDetail] = useState(false);

  const firstRow = (
    <tr
      onClick={() => setViewingDetail(true)}
      className={styleRow.custom_table_row}
    >
      <td className={"text-right"} rowSpan={2}>
        {no}
      </td>
      <td rowSpan={2}>
        <div
          className={"aspect-video w-24 overflow-hidden rounded-lg shadow-lg"}
        >
          <Image
            src={product.image}
            withPlaceholder
            alt={"product name"}
            fit="contain"
          />
        </div>
      </td>
      <td className="overflow-hidden text-ellipsis whitespace-nowrap !pl-0 !pr-1 !pt-2 !pb-1">
        <Tooltip
          label={
            product.name
          }
        >
          <span className={"text-lg font-semibold"}>
           {product.name}
          </span>
        </Tooltip>
      </td>

      <td rowSpan={product.salePercent !== null ? 1 : 2} className="!pb-0 !pt-1">
        <ProductPriceCell product={product} />
      </td>

      <td className={"text-center"} rowSpan={2}>
        {product.provider}
      </td>
      <td>
        <div className="flex flex-col">
          <Text size={"xs"} color={"dimmed"}>
            Import at
          </Text>
          <Text>{dayjs(product.importedDate).format("DD/MM/YYYY")}</Text>
        </div>
      </td>
    </tr>
  );

  const secondRow = (
    <tr onClick={() => setViewingDetail(true)}>
      {/*  No. col*/}
      {/*  image col*/}
      <td className="!pl-0 !pr-1 !pt-2 !pb-1">
        <div className="flex flex-col space-y-1 text-gray-600 line-clamp-2">
          <small>
            <span className={"font-semibold"}>Description: </span>{product.description}
          </small>
        </div>
      </td>

      {product.salePercent !== null && <td className="text-center">
        <Tooltip label={<div className={"flex flex-col items-start"}>
          <small className={"text-gray-500"}>From</small>
          <small>{product.discountStart ? dayjs(product.discountStart).format("DD/MM/YYYY") : "-"}</small>
          <small className={"text-gray-500"}>To</small>
          <small>{product.discountEnd ? dayjs(product.discountEnd).format("DD/MM/YYYY") : "-"}</small>
        </div>}>
          <Badge
            variant={"filled"}
            color={"red"}
            leftSection={<IconArrowDown size={14} />}
          >
            {product.salePercent}%
          </Badge>
        </Tooltip>
      </td>}
      {/*  origin col*/}
      <td>
        <div className="flex flex-col">
          <Text size={"xs"} color={"dimmed"}>
            Expired at
          </Text>
          <Text>{dayjs(product.expiredDate).format("DD/MM/YYYY")}</Text>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {firstRow}
      {secondRow}
      <ProductDetailDialog key={product.id} opened={viewingDetail} product={product} onClosed={(update) => {
        if (update) {
          rowUpdated && rowUpdated();
        }
        setViewingDetail(false);
      }} />
    </>
  );
};

export default ProductTableRow;
