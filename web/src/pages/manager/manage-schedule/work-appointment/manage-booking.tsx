import BookingSchedule from "../../../_shared/work-appointment/booking-schedule";
import {getAllCustomers} from "../../../../services/customer.service";
import {AutoCompleteItemProp} from "../../../../components/auto-complete-item";
import {rawToAutoItem} from "../../../../utilities/fn.helper";
import {CustomerModel} from "../../../../model/customer.model";
import {Customers} from "../../../../mock/customer";
import {slotModal} from "../../../../model/slot.model";
import {useEffect, useState} from "react";
import {getSlot} from "../../../../services/schedule.service";

const ManageBooking = () => {
    const [slotList, setSlotList] = useState<slotModal[] | []>([])
    const [customerList, setCustomerList] = useState<any>([])

    const fnHelper = (s: CustomerModel) => ({
        id: s.id,
        name: s.name,
        description: s.email
    });

    const searchCustomer = async (searchCustomerName: string): Promise<AutoCompleteItemProp<CustomerModel>[]> => {
        const paginateCustomers = await getAllCustomers(1, 50, {
            name: searchCustomerName,
        });
        setCustomerList(paginateCustomers.data)
        return paginateCustomers.data.map((i) =>
            rawToAutoItem({...i}, fnHelper)
        );
    }

    const getSlotList = async () => {
        const slotData = await getSlot()
        setSlotList(slotData)
    }

    useEffect(() => {
        void getSlotList()
    }, [])

    return <BookingSchedule searchCustomer={searchCustomer}
                            customerList={customerList}
                            slotList={slotList}/>;
};

export default ManageBooking;
