import {QABadReportReqDto} from "@/Bis/QABadReport/Dto/QABadReportReqDto";
import {QABadReportResDto} from "@/Bis/QABadReport/Dto/QABadReportResDto";
import axios, {AxiosResponse} from "axios";
import {PageReqDto} from "@/Bis/Common/PageReqDto";
import {PageWrap} from "@/Bis/Common/PageWrap";

export default class QABadReportUseCase {

    async report(reqDto: QABadReportReqDto): Promise<QABadReportResDto>{
        const { data } = await axios.post<QABadReportReqDto,AxiosResponse<QABadReportResDto>>("/QABadReport",reqDto)
        return data;
    }

    async getReports(pageReqDto: PageReqDto): Promise<PageWrap<QABadReportResDto>> {
        const { data } =  await axios.post<PageReqDto,AxiosResponse<PageWrap<QABadReportResDto>>>
        ("/QABadReport/getReports",pageReqDto)
        return data;
    }

    async deleteReportDoc(id: number): Promise<void> {
        await axios.delete("/QABadReport",{
            params:{
                id: id
            }
        })
    }

}
