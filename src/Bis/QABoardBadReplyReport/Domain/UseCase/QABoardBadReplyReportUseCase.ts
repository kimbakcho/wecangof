import {QABoardBadReplyReportResDto} from "@/Bis/QABoardBadReplyReport/Dto/QABoardBadReplyReportResDto";
import axios, {AxiosResponse} from "axios";
import {PageReqDto} from "@/Bis/Common/PageReqDto";
import {PageWrap} from "@/Bis/Common/PageWrap";

export default class QABoardBadReplyReportUseCase {
    async report(id: number): Promise<QABoardBadReplyReportResDto> {
        const { data } = await axios.post<null,AxiosResponse<QABoardBadReplyReportResDto>>("/QABoardBadReplyReport",null,{
            params:{
                id: id
            }
        })
        return data;
    }

    async getReports(pageReqDto: PageReqDto): Promise<PageWrap<QABoardBadReplyReportResDto>>{
        const { data } = await axios.post<PageReqDto,AxiosResponse<PageWrap<QABoardBadReplyReportResDto>>>
        ("/QABoardBadReplyReport/getReports",pageReqDto);
        return data;
    }

    async deleteReportReply(id: number): Promise<void>{
        await axios.delete("/QABoardBadReplyReport",{
            params:{
                id: id
            }
        })
    }
}
