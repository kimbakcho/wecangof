import {QABoardInsertDto} from "@/Bis/QABoard/Dto/QABoardInsertDto";
import axios, {AxiosResponse} from "axios";
import {QABoardResDto} from "@/Bis/QABoard/Dto/QABoardResDto";
import {QABoardFilterReqDto} from "@/Bis/QABoard/Dto/QABoardFilterReqDto";
import {PageWrap} from "@/Bis/Common/PageWrap";
import {QABoardUpdateDto} from "@/Bis/QABoard/Dto/QABoardUpdateDto";

export class QABoardUseCase {

    async insert(insertDto : QABoardInsertDto): Promise<QABoardResDto>{
        const { data } = await axios.post<QABoardInsertDto,AxiosResponse<QABoardResDto>>("/QABoard",insertDto);
        return data;
    }

    async getDoc(id: number): Promise<QABoardResDto>{
        const { data } = await axios.get("/QABoard",{
            params:{
                id:id
            }
        });
        return data;
    }

    async updateViewCount(id: number){
         await axios.post("/QABoard/viewCount",null,{
             params:{
                 id: id
             }
         });
    }

    async getFilterDoc(reqDto: QABoardFilterReqDto): Promise<PageWrap<QABoardResDto>> {
        const { data } = await axios.post<QABoardFilterReqDto, AxiosResponse<any>>('/QABoard/getFilterDoc',reqDto)
        return data;
    }

    async changeRepresentative(docNumber: number,changeOrder :number): Promise<void>{
        await axios.post("/QABoard/changeRepresentative",null,{
            params:{
                docNumber: docNumber,
                changeOrder: changeOrder

            }
        })
    }

    async deleteDoc(id: number): Promise<void>{
        await axios.delete("/QABoard/doc",{
            params:{
                id: id
            }
        });
    }

    async update(reqDto: QABoardUpdateDto): Promise<QABoardResDto>{
        const { data} = await axios.post<QABoardUpdateDto,AxiosResponse<QABoardResDto>>("/QABoard/update",reqDto);
        return data;
    }



}
