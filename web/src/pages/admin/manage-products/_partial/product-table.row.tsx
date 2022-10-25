import Image from "next/image";
import { Badge, Text, Tooltip } from "@mantine/core";
import styleRow from "../../../../styles/product-row.module.scss";
import { IconArrowDown } from "@tabler/icons";

const ProductTableRow = () => {
  const viewProductDetail = () => {
    console.log("ProductDetail");
  };

  const firstRow = (
    <tr onClick={() => viewProductDetail()} className={styleRow.custom_table_row}>
      <td className={"text-right"} rowSpan={2}>
        1
      </td>
      <td rowSpan={2}>
        <div
          className={"aspect-video w-24 overflow-hidden rounded-lg shadow-lg"}
        >
          <Image
            objectFit={"cover"}
            objectPosition={"center"}
            src={"http://dummyimage.com/230x100.png/5fa2dd/ffffff"}
            width={"100%"}
            height={"100%"}
          />
        </div>
      </td>
      <td className="overflow-hidden text-ellipsis whitespace-nowrap !pl-0 !pr-1 !pt-2 !pb-1">
        <Tooltip
          label={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, ullam."
          }
        >
          <span className={"text-lg font-semibold"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, ullam.
          </span>
        </Tooltip>
      </td>

      <td className="!pb-0 !pt-1">
        <div className="flex flex-col items-center justify-center space-y-1">
          <Text color={"dimmed"} strikethrough size={"xs"}>
            19.000.000
          </Text>
          <Text>16.150.000</Text>
        </div>
      </td>

      <td className={"text-center"} rowSpan={2}>
        Vietnam
      </td>
      <td>
        <div className="flex flex-col">
          <Text size={"xs"} color={"dimmed"}>
            Import at
          </Text>
          <Text>20/11/2022</Text>
        </div>
      </td>
    </tr>
  );

  const secondRow = (
    <tr onClick={() => viewProductDetail()}>
      {/*  No. col*/}
      {/*  image col*/}
      <td className="!pl-0 !pr-1 !pt-2 !pb-1">
        <div className="flex flex-col space-y-1 text-gray-600 line-clamp-2">
          <small>
            <span className={"font-semibold"}>Description: </span>Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Ad cumque eligendi
            iste minus, numquam quas velit? Consequatur ea error quidem.
          </small>
        </div>
      </td>

      <td className="text-center">
        <Tooltip position={"bottom"} label={"Till 22/12/2022"}>
          <Badge
            variant={"filled"}
            color={"red"}
            leftSection={<IconArrowDown size={8} />}
          >
            15%
          </Badge>
        </Tooltip>
      </td>
      {/*  origin col*/}
      <td>
        <div className="flex flex-col">
          <Text size={"xs"} color={"dimmed"}>
            Expired at
          </Text>
          <Text>01/11/2025</Text>
        </div>
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

export default ProductTableRow;
