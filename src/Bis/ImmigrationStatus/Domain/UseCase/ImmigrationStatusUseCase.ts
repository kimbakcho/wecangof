import {NationControlReqDto} from "@/Bis/NationControl/Dto/NationControlReqDto";
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import axios from "axios";
import {ImmigrationStatusDetailResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusDetailResDto";
import {ImmigrationStatusSimpleResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusSimpleResDto";

export default class ImmigrationStatusUseCase {

    async getNationInfo(id: number): Promise<ImmigrationStatusDetailResDto>  {
        const { data } = await axios.get("/ImmigrationStatus/nation",{
            params: {
                id: id
            }
        });
        return data;
    }

    async getAdminMainRecommend(): Promise<ImmigrationStatusSimpleResDto[]> {
        const { data } = await axios.get("/ImmigrationStatus/adminMainRecommend");
        return data;
    }
}
