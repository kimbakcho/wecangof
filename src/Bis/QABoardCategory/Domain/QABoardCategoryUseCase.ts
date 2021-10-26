import {QABoardCategoryResDto} from "@/Bis/QABoardCategory/Dto/QABoardCategoryResDto";
import axios, {AxiosResponse} from "axios";
import {QABoardCategoryNameChangeReqDto} from "@/Bis/QABoardCategory/Dto/QABoardCategoryNameChangeReqDto";
import {QABoardCategoryOrderChangReqDto} from "@/Bis/QABoardCategory/Dto/QABoardCategoryOrderChangReqDto";

export class QABoardCategoryUseCase {
    async getList(): Promise<QABoardCategoryResDto[]>{
        const { data }  = await axios.get("/qaBoardCategory");

        return data;
    }

    async input(name: string): Promise<QABoardCategoryResDto> {
        const { data } = await axios.post<null, AxiosResponse<QABoardCategoryResDto>>("/qaBoardCategory",null, {
            params:{
                name: name
            }
        })
        return data;
    }

    async changeName(reqDto: QABoardCategoryNameChangeReqDto): Promise<QABoardCategoryResDto>{
       const { data } = await axios.post<QABoardCategoryNameChangeReqDto, AxiosResponse<QABoardCategoryResDto>>("/qaBoardCategory/changeName",reqDto)
        return data;
    }

    async changeOrder(reqDto: QABoardCategoryOrderChangReqDto): Promise<void>{
       await axios.post<QABoardCategoryOrderChangReqDto, AxiosResponse<void>>("/qaBoardCategory/changeOrder",reqDto)
    }

    async deleteItem(name: string): Promise<void> {
        await axios.delete("/qaBoardCategory",{
            params:{
                "categoryName": name
            }
        })
    }

}
