import {QABadReportReqDto} from "@/Bis/QABadReport/Dto/QABadReportReqDto";
import {QABadReportResDto} from "@/Bis/QABadReport/Dto/QABadReportResDto";
import axios, {AxiosResponse} from "axios";

export default class QABadReportUseCase {

    async report(reqDto: QABadReportReqDto): Promise<QABadReportResDto>{
        const { data } = await axios.post<QABadReportReqDto,AxiosResponse<QABadReportResDto>>("/QABadReport",reqDto)
        return data;
    }
}
