import {QABoardReplyInsertReqDto} from "@/Bis/QABoardReply/Dto/QABoardReplyInsertReqDto";
import {QABoardReplyResDto} from "@/Bis/QABoardReply/Dto/QABoardReplyResDto";
import axios, {AxiosResponse} from "axios";
import {QABoardReplyUpdateReqDto} from "@/Bis/QABoardReply/Dto/QABoardReplyUpdateReqDto";

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

    async changeRepresentativeComment(replyNumber: number,changeOrder: number): Promise<void> {
        await axios.post("/QABoardReply/changeRepresentativeComment",null,{
            params:{
                replyNumber: replyNumber,
                changeOrder: changeOrder
            }
        })
    }

    async updateReply(reqDto: QABoardReplyUpdateReqDto): Promise<QABoardReplyResDto> {
        const { data }= await axios.post<QABoardReplyUpdateReqDto,AxiosResponse<QABoardReplyResDto>>(
            "/QABoardReply/updateReply",reqDto)
        return data;
    }

    async delete(id: number): Promise<void> {
        await axios.delete("/QABoardReply",{
            params:{
                id: id
            }
        })
    }
}
