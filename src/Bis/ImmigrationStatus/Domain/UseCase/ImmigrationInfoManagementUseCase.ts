import {ImmigrationStatusDetailResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusDetailResDto";
import axios, {AxiosResponse} from "axios";
import {ImmigrationInfoManagementResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationInfoManagementResDto";
import ImmigrationStatusUpdateReqDto from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusUpdateReqDto";
import {ImmigrationInfoManagementUpdateReqDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationInfoManagementUpdateReqDto";

export default class ImmigrationInfoManagementUseCase {
    async getDoc(id: number): Promise<ImmigrationInfoManagementResDto>  {
        const { data } = await axios.get("/ImmigrationInfoManagement",{
            params: {
                id: id
            }
        });
        return data;
    }

    async update(reqDto: ImmigrationInfoManagementUpdateReqDto) {
        const { data } = await axios.post<ImmigrationInfoManagementUpdateReqDto,AxiosResponse<ImmigrationInfoManagementResDto>>(
            "/ImmigrationInfoManagement/update",reqDto)
        return data;
    }

}
