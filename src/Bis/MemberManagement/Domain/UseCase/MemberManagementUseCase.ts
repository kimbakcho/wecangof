import axios, {AxiosResponse} from "axios";
import {MemberManagementSimpleResDto} from "@/Bis/MemberManagement/Dto/MemberManagementSimpleResDto";

export default class MemberManagementUseCase {

    async changeProfileImage(imageUrl: string): Promise<MemberManagementSimpleResDto>{
        const { data } = await axios.post<any,AxiosResponse>("/MemberManagement/changeProfileImage",null,{
            params:{
                "imageUrl":imageUrl
            }
        });
        return data
    }
}
