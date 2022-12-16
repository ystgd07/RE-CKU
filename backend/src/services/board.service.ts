import { CreateCommentDto } from "../routes/dto/index.dto";
import { create, findAllBoard, findOneBoard, updateBoard } from "../db/board.repo";
import { Board } from "../db/schemas/index.schema";
import { jsonParse } from "../db/utils/parseToJSON";

type BoardInFo = {
  fieldCount: null | number;
  affectedRows: null | number;
  insertId: null | number;
  info: null | string;
  serverStatus: null | number;
  warningStatus: null | number;
};

export const getNoticeAll = async (): Promise<Board[]> => {
  const notices = await findAllBoard();
  const result = jsonParse(notices);
  return result;
};

export const getOneNotice = async (id: number) => {
  try {
    const Notice = await findOneBoard(id);
    return Notice;
  } catch (err) {
    if (err.message === "Cannot read properties of undefined (reading 'hasResumeId')")
      throw Error(`404, 게시글을 찾을 수 없습니다.`);
    throw Error(`500, ${err.message}`);
  }
};

export const postNotice = async (data: Record<string, string | boolean | number>): Promise<BoardInFo> => {
  if (data.resumeId !== null) {
    //이력서 아이디가 있다면
    // 이력서 찾는 해당 아이디로 이력서 찾는 로직 실행.
    // 받아온 정보.usedUserId 와 data.fromUserId 가 같은지 확인
    // 정보가 같지않으면 에러  "이건 당신의 이력서가 아니잖아"
  }

  try {
    const newNotice = await create(data);
    return newNotice;
  } catch (err) {
    console.log(err);
    throw Error(`500, ${err.message}`);
  }
};

export const updateNotice = async (boardId: number, userId: number, data: Record<string, string | number>) => {
  try {
    const ownCheck = await findOneBoard(boardId);
    if (ownCheck.boardInfo.ownUserId !== userId) throw Error(`400, 이건 당신의 게시물이 아니잖아!`);
    const update = await updateBoard(boardId, data);
    console.log("업데이트 내역 ", update);
    return;
  } catch (err) {
    console.log(err.message);
    if (err.message === "Cannot read properties of undefined (reading 'hasResumeId')")
      throw Error(`404, 게시글을 찾을 수 없습니다.`);
    throw Error(err);
  }
};

export const postComment = async (data: CreateCommentDto) => {};
