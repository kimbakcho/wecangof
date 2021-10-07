import {AlarmTravelFlagResDto} from "@/Bis/AlarmTravelFlag/Dto/AlarmTravelFlagResDto";
import axios, {AxiosResponse} from "axios";

export default class AlarmTravelFlagUseCase {

    async hasTravelFlag(nationId: number): Promise<AlarmTravelFlagResDto | null> {
        const { data } = await axios.get<any,AxiosResponse>("/AlarmTravelFlag/hasFlag",{
            params:{
                "nationId": nationId
            }
        });
        return data;
    }

    async saveTravelFlag(nationId: number): Promise<void>{
        await axios.post<any,AxiosResponse>("/AlarmTravelFlag/saveTravelFlag",null,{
            params:{
                "nationId": nationId
            }
        });
    }

    async deleteTravelFlag(nationId: number): Promise<void>{
        await axios.delete<any,AxiosResponse>("/AlarmTravelFlag/deleteTravelFlag",{
            params:{
                "nationId": nationId
            }
        });
    }

}
