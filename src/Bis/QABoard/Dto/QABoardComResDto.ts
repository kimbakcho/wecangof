import {QABoardResDto} from "@/Bis/QABoard/Dto/QABoardResDto";
import {QABoardReplyResDto} from "@/Bis/QABoardReply/Dto/QABoardReplyResDto";

export interface QABoardComResDto extends QABoardResDto{
    qaBoardReplyResDto?: QABoardReplyResDto;
}
