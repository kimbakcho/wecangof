import {AdminContentSaveReqDto} from "@/Bis/AdminContent/Dto/AdminContentSaveReqDto";
import {AdminContentResDto} from "@/Bis/AdminContent/Dto/AdminContentResDto";
import axios, {AxiosResponse} from "axios";
import {AdminContentSimpleResDto} from "@/Bis/AdminContent/Dto/AdminContentSimpleResDto";

export default class AdminContentUseCase {
    async save(saveReqDto: AdminContentSaveReqDto): Promise<AdminContentResDto>{
        const { data } = await axios.post<AdminContentSaveReqDto,AxiosResponse<AdminContentResDto>>("/AdminContent/save",saveReqDto)
        return data;
    }
    async update(saveReqDto: AdminContentSaveReqDto): Promise<AdminContentResDto>{
        const { data } = await axios.post<AdminContentSaveReqDto,AxiosResponse<AdminContentResDto>>("/AdminContent/update",saveReqDto)
        return data;
    }
    async doc(id: number): Promise<AdminContentResDto> {
        const { data } = await axios.get("/AdminContent/doc",{
            params:{
                id: id
            }
        })
        return data;
    }
    async docs(): Promise<AdminContentSimpleResDto[]>{
        const { data } = await axios.get("/AdminContent/docs");
        return data;
    }

    async delDoc(id: number): Promise<void> {
        await axios.delete("/AdminContent",{
            params:{
                id: id
            }
        });
    }

    async getMainPageDocs(): Promise<AdminContentSimpleResDto[]>{
        const { data } = await axios.get("/AdminContent/mainPage");
        return data;
    }
}
