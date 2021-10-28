export interface QABoardUpdateDto{

    id: number;

    classificationQuestions: string;

    nationName?: string | null;

    title: string;

    contentText: string;

    contentImageUrl: string;
}
