import { Badge, Image, Tooltip } from "@mantine/core";
import styleRow from "../../../../styles/product-row.module.scss";
import { IconArrowDown } from "@tabler/icons";
import { ProductModel } from "../../../../model/product.model";
import { FC } from "react";
import SalePriceTableCell from "../../../../components/cell-sale-price.table";
import dayjs from "dayjs";
import { DataRowProps } from "../../../../interfaces/data-table-row.interface";

const ProductRowTable: FC<DataRowProps<ProductModel>> = ({
  data,
  no,
  onClick,
}) => {
  const firstRow = (
    <tr onClick={() => onClick(data)} className={styleRow.custom_table_row}>
      <td className={"text-center"} rowSpan={2}>
        {no}
      </td>
      <td rowSpan={2}>
        <div
          className={"aspect-video w-24 overflow-hidden rounded-lg shadow-lg"}
        >
          <Image
            src={data.image}
            withPlaceholder
            alt={"product name"}
            fit="contain"
          />
        </div>
      </td>
      <td className="overflow-hidden text-ellipsis whitespace-nowrap !pl-0 !pr-1 !pt-2 !pb-1">
        <Tooltip label={data.name}>
          <span className={"text-lg font-semibold"}>{data.name}</span>
        </Tooltip>
      </td>

      <td
        rowSpan={data.discountPercent !== null ? 1 : 2}
        className="!pb-0 !pt-1"
      >
        <SalePriceTableCell priceModel={data} />
      </td>

      <td className={"text-center"} rowSpan={2}>
        {data.supplier}
      </td>
      <td>
        <div className="flex flex-col">TBD</div>
      </td>
    </tr>
  );

  const secondRow = (
    <tr onClick={() => onClick(data)}>
      {/*  No. col*/}
      {/*  image col*/}
      <td className="!pl-0 !pr-1 !pt-2 !pb-1">
        <div className="flex flex-col space-y-1 text-gray-600 line-clamp-2">
          <small>
            <span className={"font-semibold"}>Description: </span>
            {data.description}
          </small>
        </div>
      </td>

      {data.discountPercent !== null && (
        <td className="text-center">
          <Tooltip
            label={
              <div className={"flex flex-col items-start"}>
                <small className={"text-gray-500"}>From</small>
                <small>
                  {data.discountStart
                    ? dayjs(data.discountStart).format("DD/MM/YYYY")
                    : "-"}
                </small>
                <small className={"text-gray-500"}>To</small>
                <small>
                  {data.discountEnd
                    ? dayjs(data.discountEnd).format("DD/MM/YYYY")
                    : "-"}
                </small>
              </div>
            }
          >
            <Badge
              variant={"filled"}
              color={"red"}
              leftSection={<IconArrowDown size={14} />}
            >
              {data.discountPercent}%
            </Badge>
          </Tooltip>
        </td>
      )}
      {/*  origin col*/}
      <td>
        <div className="flex flex-col">TBD</div>
      </td>
    </tr>
  );

  return (
    <>
      {firstRow}
      {secondRow}
    </>
  );
};

export default ProductRowTable;