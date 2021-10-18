import {QABoardInsertDto} from "@/Bis/QABoard/Dto/QABoardInsertDto";
import axios, {AxiosResponse} from "axios";
import {QABoardResDto} from "@/Bis/QABoard/Dto/QABoardResDto";

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
}
