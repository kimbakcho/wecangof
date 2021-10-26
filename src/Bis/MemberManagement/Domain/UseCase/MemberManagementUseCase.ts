import axios, {AxiosResponse} from "axios";
import {MemberManagementSimpleResDto} from "@/Bis/MemberManagement/Dto/MemberManagementSimpleResDto";
import {MemberSearchReqDto} from "@/Bis/MemberManagement/Dto/MemberSearchReqDto";
import {PageWrap} from "@/Bis/Common/PageWrap";
import {MemberManagementResDto} from "@/Bis/MemberManagement/Dto/MemberManagementResDto";

export default class MemberManagementUseCase {

    async changeProfileImage(imageUrl: string): Promise<MemberManagementSimpleResDto>{
        const { data } = await axios.post<any,AxiosResponse>("/MemberManagement/changeProfileImage",null,{
            params:{
                "imageUrl":imageUrl
            }
        });
        return data
    }

    async getMemberList(memberFilter: MemberSearchReqDto): Promise<PageWrap<MemberManagementResDto>>{
        const { data } = await axios.post<MemberSearchReqDto, AxiosResponse<PageWrap<MemberManagementResDto>>>("/MemberManagement/users/",memberFilter);
        return data;
    }


    async deleteMember(uid: string): Promise<void> {
        await axios.delete("/MemberManagement/user",{
            params:{
                uid: uid
            }
        });
    }
}
