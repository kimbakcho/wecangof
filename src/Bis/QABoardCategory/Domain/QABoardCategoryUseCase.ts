import {QABoardCategoryResDto} from "@/Bis/QABoardCategory/Dto/QABoardCategoryResDto";
import axios from "axios";

export class QABoardCategoryUseCase {
    async getList(): Promise<QABoardCategoryResDto[]>{
        const { data }  = await axios.get("/qaBoardCategory");

        return data;
    }
}
