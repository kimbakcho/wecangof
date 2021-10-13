import {UserAlarmReqDto} from "@/Bis/UserAlarm/Dto/UserAlarmReqDto";
import axios from "axios";

export default class UserAlarmUseCase {
    async sendAlarm(reqDto: UserAlarmReqDto){
        await axios.post("/UserAlarm/sendAlarm",reqDto);
    }
    async myAlarms(): Promise<UserAlarmReqDto[]>{
        const { data } = await axios.get("/UserAlarm/myAlarms");
        return data
    }

    async unReadCount(): Promise<number> {
        const { data } = await axios.get("/UserAlarm/unReadCount");
        return data
    }

    readAlarm() {
        axios.post("/UserAlarm/readAlarm");
    }
}
