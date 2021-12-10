import {QABoardBadReplyReportResDto} from "@/Bis/QABoardBadReplyReport/Dto/QABoardBadReplyReportResDto";
import axios, {AxiosResponse} from "axios";

export default class QABoardBadReplyReportUseCase {
    async report(id: number): Promise<QABoardBadReplyReportResDto> {
        const { data } = await axios.post<null,AxiosResponse<QABoardBadReplyReportResDto>>("/QABoardBadReplyReport",null,{
            params:{
                id: id
            }
        })
        return data;
    }
}
