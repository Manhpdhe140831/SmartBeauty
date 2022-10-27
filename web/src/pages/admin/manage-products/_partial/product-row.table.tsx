import { Badge, Image, Text, Tooltip } from "@mantine/core";
import styleRow from "../../../../styles/product-row.module.scss";
import { IconArrowDown } from "@tabler/icons";
import { ProductModel } from "../../../../model/product.model";
import { FC, useState } from "react";
import ProductPriceCell from "./_product-price.cell";
import dayjs from "dayjs";
import ProductDetailDialog from "../_product-detail-dialog";

type productRowProps = {
  data: ProductModel;
  rowUpdated?: () => void;
  no: number;
};

const ProductRowTable: FC<productRowProps> = ({ data, no, rowUpdated }) => {
  const [viewingDetail, setViewingDetail] = useState(false);

  const firstRow = (
    <tr
      onClick={() => setViewingDetail(true)}
      className={styleRow.custom_table_row}
    >
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
        <ProductPriceCell product={data} />
      </td>

      <td className={"text-center"} rowSpan={2}>
        {data.supplier}
      </td>
      <td>
        <div className="flex flex-col">
          <Text size={"xs"} color={"dimmed"}>
            Import at
          </Text>
          <Text>{dayjs(data.importedDate).format("DD/MM/YYYY")}</Text>
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
        <div className="flex flex-col">
          <Text size={"xs"} color={"dimmed"}>
            Expired at
          </Text>
          <Text>{dayjs(data.expiredDate).format("DD/MM/YYYY")}</Text>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {firstRow}
      {secondRow}
      <ProductDetailDialog
        mode={"view"}
        key={data.id}
        data={data}
        opened={viewingDetail}
        onClosed={(update) => {
          if (update) {
            rowUpdated && rowUpdated();
          }
          setViewingDetail(false);
        }}
      />
    </>
  );
};

export default ProductRowTable;
