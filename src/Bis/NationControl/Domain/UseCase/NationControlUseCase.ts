import {NationControlReqDto} from "@/Bis/NationControl/Dto/NationControlReqDto";
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import axios, {AxiosResponse} from "axios";

export default class NationControlUseCase {

    async getFilter(reqDto: NationControlReqDto): Promise<NationControlResDto[]>  {
        const { data } = await axios.post<NationControlReqDto,AxiosResponse<NationControlResDto[]>>("/NationControl/filter",reqDto);
        return data;
    }

    async setDisplayFlag(id: number,flag: boolean){
        await axios.post("/NationControl/displayFlag",null,{
            params:{
                id: id,
                flag: flag
            }
        })
    }



}
