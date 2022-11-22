import BookingSchedule from "../../../_shared/work-appointment/booking-schedule";
import {getAllCustomers} from "../../../../services/customer.service";
import {AutoCompleteItemProp} from "../../../../components/auto-complete-item";
import {rawToAutoItem} from "../../../../utilities/fn.helper";
import {CustomerModel} from "../../../../model/customer.model";
import {Customers} from "../../../../mock/customer";
import {slotWork} from "../../../../mock/slot-work.const";
import {slotModal} from "../../../../model/slot.model";

const ManageBooking = () => {
    const fnHelper = (s: CustomerModel) => ({
        id: s.id,
        name: s.name,
        description: s.email
    });

    const searchCustomer = async (searchCustomerName: string): Promise<AutoCompleteItemProp<CustomerModel>[]> => {
        const paginateProducts = await getAllCustomers(1, 50, {
            name: searchCustomerName,
        });
        // return paginateProducts.data.map((i) =>
        //     rawToAutoItem({...i}, fnHelper)
        // );
        return Customers.map((i) =>
            rawToAutoItem({...i}, fnHelper)
        );
    }

    const getSlot = (): slotModal[] => {
        return slotWork
    }
    return <BookingSchedule searchCustomer={searchCustomer} getSlot={getSlot()}/>;
};

export default ManageBooking;
