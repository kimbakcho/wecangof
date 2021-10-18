import {QABoardReplyInsertReqDto} from "@/Bis/QABoardReply/Dto/QABoardReplyInsertReqDto";
import {QABoardReplyResDto} from "@/Bis/QABoardReply/Dto/QABoardReplyResDto";
import axios, {AxiosResponse} from "axios";

export default class QABoardReplyUseCase {

    async getQaDocReplys(qaDocId: number): Promise<QABoardReplyResDto[]> {
        const { data }= await axios.get("/QABoardReply",{
            params:{
                qaDocId: qaDocId
            }
        });
        return data;
    }

    async insert(reqDto: QABoardReplyInsertReqDto): Promise<QABoardReplyResDto> {
        const { data } = await axios.post<QABoardReplyInsertReqDto,AxiosResponse<QABoardReplyResDto>>("/QABoardReply",reqDto);
        return data;
    }
}
