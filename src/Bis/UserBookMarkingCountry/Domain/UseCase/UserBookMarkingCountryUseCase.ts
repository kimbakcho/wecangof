import {UserBookMarkingCountryResDto} from "@/Bis/UserBookMarkingCountry/Dto/UserBookMarkingCountryResDto";
import axios, {AxiosResponse} from "axios";

export default class UserBookMarkingCountryUseCase {

    async isBookMarking(nationId: number): Promise<UserBookMarkingCountryResDto | string> {
        const {data} = await axios.get("/UserBookMarkingCountry/isBookMarking", {
            params: {
                nationId: nationId
            }
        });
        return data;
    }

    async bookMarking(nationId: number): Promise<UserBookMarkingCountryResDto> {
        const axiosResponse = await axios.post<null, UserBookMarkingCountryResDto>("/UserBookMarkingCountry/bookMarking", null, {
            params: {
                nationId: nationId
            }
        });
        console.log(axiosResponse)
        return axiosResponse
    }

    async bookUnMarking(nationId: number): Promise<void> {
        await axios.delete("/UserBookMarkingCountry/bookUnMarking", {
            params: {
                nationId: nationId
            }
        });
    }

    async changeOrderIdx(oldIndex: number, newIndex: number) {
        await axios.post("/UserBookMarkingCountry/changeOrderIdx",
            null, {
                params: {
                    oldIndex: oldIndex,
                    newIndex: newIndex
                }

            }
        );
    }
}
