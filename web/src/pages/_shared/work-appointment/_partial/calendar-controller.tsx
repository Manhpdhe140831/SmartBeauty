import { DatePicker } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import { Button, Divider, Select } from "@mantine/core";
import { useState } from "react";
import { rawToAutoItem } from "../../../../utilities/fn.helper";
import { StaffModel } from "../../../../model/staff.model";
import mockStaff from "../../../../mock/staff";
import AutoCompleteItem from "../../../../components/auto-complete-item";

type calendarProps = {
  dateData?: Date;
  onChange?: (selectedDate: Date) => void;
};

const CalendarController = ({ dateData, onChange }: calendarProps) => {
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
    <div className="flex items-center gap-4">
      {/*<Select*/}
      {/*  label={"Viewing Staff"}*/}
      {/*  data={staffLoading || !listStaff ? [] : listStaff}*/}
      {/*  placeholder={"select the staff"}*/}
      {/*  searchable*/}
      {/*  itemComponent={AutoCompleteItem}*/}
      {/*  nothingFound={staffLoading ? "loading..." : "No result found"}*/}
      {/*  maxDropdownHeight={200}*/}
      {/*  required={true}*/}
      {/*  defaultValue={staffId !== null ? String(staffId) : null}*/}
      {/*  onChange={fnOnChange}*/}
      {/*/>*/}

      {/*<Divider orientation={"vertical"} />*/}

      <DatePicker
        placeholder="Pick date"
        label="Schedule at date"
        value={dateData}
        onChange={onChange}
        withAsterisk
      />
      <Button
        className={"mt-6"}
        onClick={() => onChange && onChange(new Date())}
      >
        Hôm nay
      </Button>
    </div>
  );
};

export default CalendarController;
