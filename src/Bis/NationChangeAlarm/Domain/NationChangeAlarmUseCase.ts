import {NationChangeAlarmResDto} from "@/Bis/NationChangeAlarm/Dto/NationChangeAlarmResDto";
import axios, {AxiosResponse} from "axios";

export default class NationChangeAlarmUseCase {
    async save(nationId: number): Promise<NationChangeAlarmResDto>{
        const { data } = await axios.post<any,AxiosResponse>("/NationChangeAlarm/save",null,{
            params:{
                "nationId": nationId
            }
        })
        return data;
    }
}
