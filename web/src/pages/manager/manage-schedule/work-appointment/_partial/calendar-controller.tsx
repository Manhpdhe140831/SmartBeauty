import { DatePicker } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import AutoCompleteItem from "../../../../../components/auto-complete-item";
import { rawToAutoItem } from "../../../../../utilities/fn.helper";
import mockStaff from "../../../../../mock/staff";
import { StaffModel } from "../../../../../model/staff.model";
import { ActionIcon, Divider, Select } from "@mantine/core";
import { useState } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";

const CalendarController = () => {
  const [staffId, setStaffId] = useState<number | null>(null);
  const [viewDate, setViewDate] = useState<Date | null>(null);

  const fnHelper = (s: StaffModel) => ({
    id: s.id,
    name: s.name,
    description: s.phone,
  });

  const { isLoading: staffLoading, data: listStaff } = useQuery(
    ["list-employee"],
    async () => {
      const listStaff = await mockStaff();
      return listStaff.map((s) => rawToAutoItem(s, fnHelper));
    }
  );

  const fnOnChange = (id: string | null) => {
    if (id === null) {
      setStaffId(null);
      return;
    }

    setStaffId(Number(id));
  };

  return (
    <div className={"flex flex-col"}>
      <div className="flex">
        <Select
          label={"Viewing Staff"}
          data={staffLoading || !listStaff ? [] : listStaff}
          placeholder={"select the staff"}
          searchable
          itemComponent={AutoCompleteItem}
          nothingFound={staffLoading ? "loading..." : "No result found"}
          maxDropdownHeight={200}
          required={true}
          defaultValue={staffId !== null ? String(staffId) : null}
          onChange={fnOnChange}
        />

        <Divider orientation={"vertical"} className={"mx-4"} />

        <DatePicker
          placeholder="Pick date"
          label="Schedule at date"
          withAsterisk
        />
        <ActionIcon mt={28} ml={4} variant="filled">
          <IconArrowLeft size={12} />
        </ActionIcon>

        <ActionIcon mt={28} ml={2} variant="filled">
          <IconArrowRight size={12} />
        </ActionIcon>
      </div>
    </div>
  );
};

export default CalendarController;
