import axios, {AxiosResponse} from "axios";
import {MemberManagementSimpleResDto} from "@/Bis/MemberManagement/Dto/MemberManagementSimpleResDto";
import {MemberSearchReqDto} from "@/Bis/MemberManagement/Dto/MemberSearchReqDto";
import {PageWrap} from "@/Bis/Common/PageWrap";
import {MemberManagementResDto} from "@/Bis/MemberManagement/Dto/MemberManagementResDto";
import {FcmTokenUpdateReqDto} from "@/Bis/MemberManagement/Dto/FcmTokenUpdateReqDto";
import MemberJoinReqDto from "@/Bis/MemberManagement/Dto/MemberJoinReqDto";
import {MemberJoinResDto} from "@/Bis/MemberManagement/Dto/MemberJoinResDto";

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

    async checkNickName(nickName: string){
        const { data } = await axios.get("/MemberManagement/checkNickName",{
            params:{
                nickName: nickName
            }
        });
        return data;
    }

    async changeNickName(nickName: string){
        const { data } = await axios.post("/MemberManagement/changeNickName",null,{
            params:{
                nickName: nickName
            }
        });
        return data;
    }

    async updateFcmToken(reqDto: FcmTokenUpdateReqDto):Promise<void> {
        await axios.post("/MemberManagement/fcmToken",reqDto);
    }

    async isJoined(uid: string): Promise<boolean>{
        const { data } = await axios.get("/MemberManagement/isJoined",{
            params:{
                uid: uid
            }
        })
        return data;
    }

    async join(reqDto: MemberJoinReqDto): Promise<MemberJoinResDto> {
        const { data } = await axios.post<MemberJoinReqDto, AxiosResponse<MemberJoinResDto>>("/MemberManagement/join", reqDto);
        return data;
    }
}
