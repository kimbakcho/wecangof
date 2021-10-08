import {NationControlReqDto} from "@/Bis/NationControl/Dto/NationControlReqDto";
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import axios, {AxiosResponse} from "axios";
import {ImmigrationStatusDetailResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusDetailResDto";
import {ImmigrationStatusSimpleResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusSimpleResDto";
import ImmigrationStatusUpdateReqDto from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusUpdateReqDto";

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

    async allInfo(): Promise<ImmigrationStatusSimpleResDto[]> {
        const { data } = await axios.get("/ImmigrationStatus/allInfo");
        return data;
    }

    async update(updateReqDto: ImmigrationStatusUpdateReqDto): Promise<ImmigrationStatusDetailResDto>{
        const { data } = await axios.post<any,AxiosResponse<ImmigrationStatusDetailResDto>>("/ImmigrationStatus/update",updateReqDto)
        return data;
    }
}
