import { DatePicker } from "@mantine/dates";
import { Button } from "@mantine/core";
import dayjs from "dayjs";

type calendarProps = {
  dateData?: Date;
  onChange?: (selectedDate: Date) => void;
};

const CalendarController = ({ dateData, onChange }: calendarProps) => {
  const maxDate = dayjs().add(7, "days").toDate();
  // const minDate = dayjs().subtract(14, "days").toDate();

  return (
    <div className="flex items-center gap-4">
      <DatePicker
        locale={"vi"}
        placeholder="Pick date"
        label="Lịch hẹn tại ngày"
        maxDate={maxDate}
        // minDate={minDate}
        value={dateData}
        onChange={onChange}
        clearable={false}
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
