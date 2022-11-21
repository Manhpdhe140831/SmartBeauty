import BookingSchedule from "../../../_shared/work-appointment/booking-schedule";
import {getAllCustomers} from "../../../../services/customer.service";
import {AutoCompleteItemProp} from "../../../../components/auto-complete-item";
import {rawToAutoItem} from "../../../../utilities/fn.helper";
import {CustomerModel} from "../../../../model/customer.model";

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
        return paginateProducts.data.map((i) =>
            rawToAutoItem({...i}, fnHelper)
        );
    }

    return <BookingSchedule searchCustomer={searchCustomer}/>;
};

export default ManageBooking;
