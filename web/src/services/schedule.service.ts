import axios, {AxiosError} from "axios";
import {IErrorResponse,} from "../interfaces/api.interface";

export async function getSchedule(date: string) {
    try {
        const apiResult = await axios.get(`/schedule?date=${date}`);
        return apiResult.data;
    } catch (e) {
        const error = e as AxiosError<IErrorResponse>;
        console.error(error);
        throw error.response?.data;
    }
}

export async function getSlot() {
    try {
        const apiResult = await axios.get("/slot");
        return apiResult.data;
    } catch (e) {
        const error = e as AxiosError<IErrorResponse>;
        console.error(error);
        throw error.response?.data;
    }
}

export async function getServicesAndCourse(idCustomer: number, keyword: string) {
    try {
        const apiResult = await axios.get(`/service/findServiceCourse?idCustomer=${idCustomer}&keyword=${keyword}`);
        return apiResult.data;
    } catch (e) {
        const error = e as AxiosError<IErrorResponse>;
        console.error(error);
        throw error.response?.data;
    }
}

export async function getBedAndStaff(date: string, slotId: number) {
    try {
        const apiResult = await axios.get(`/bed/getStaffAndBedFree?date=${date}&slot=${slotId}`);
        return apiResult.data;
    } catch (e) {
        const error = e as AxiosError<IErrorResponse>;
        console.error(error);
        throw error.response?.data;
    }
}