import {NationControlReqDto} from "@/Bis/NationControl/Dto/NationControlReqDto";
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import axios from "axios";

export default class NationControlUseCase {

    async getFilter(reqDto: NationControlReqDto): Promise<NationControlResDto[]>  {
        const { data } = await axios.get("/NationControl/filter",{
            params: reqDto
        });
        return data;
    }

}
