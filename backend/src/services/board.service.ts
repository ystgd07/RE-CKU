import { CreateCommentDto } from "../routes/dto/index.dto";
import * as boardRepo from "../db/board.repo";
import { Board } from "../db/schemas/index.schema";
import { jsonParse } from "../db/utils/parseToJSON";

interface BoardInFo {
  fieldCount: null | number;
  affectedRows: null | number;
  insertId: null | number;
  info: null | string;
  serverStatus: null | number;
  warningStatus: null | number;
}

export const getNoticeAll = async (): Promise<Board[]> => {
  const notices = await boardRepo.findAllBoard();
  const result = jsonParse(notices);
  return result;
};

// 하나의 게시물 정보를 가져옴
export const getOneNotice = async (id: number, userId: null | number) => {
  let alreadyLikes = false;
  let ownThisNotice = false;
  try {
    let notice = await boardRepo.findOneBoard(id, userId);
    console.log(notice.boardInfo.ownUserId);
    // 자신이 게시글의 주인인 경우
    if (notice.boardInfo.ownUserId === userId && userId !== null) {
      ownThisNotice = true;
    }

    const result = { ownThisNotice, alreadyLikes, ...notice };
    return result;
  } catch (err) {
    if (err.message === "Cannot read properties of undefined (reading 'hasResumeId')")
      throw new Error(`404, 게시글을 찾을 수 없습니다.`);
    throw new Error(`500, ${err.message}`);
  }
};

// 게시글 생성 서비스
export const postNotice = async (data: Record<string, string | boolean | number>): Promise<BoardInFo> => {
  if (data.resumeId !== null) {
    //이력서 아이디가 있다면
    // 이력서 찾는 해당 아이디로 이력서 찾는 로직 실행.
    // 받아온 정보.usedUserId 와 data.fromUserId 가 같은지 확인
    // 정보가 같지않으면 에러  "이건 당신의 이력서가 아니잖아"
    // 이렇게까지 에러처리를 해야할까 ...?
  }

  try {
    const newNotice = await boardRepo.create(data);
    return newNotice;
  } catch (err) {
    console.log(err);
    throw Error(`500, ${err.message}`);
  }
};

// 게시글 수정 서비스
export const updateNotice = async (boardId: number, userId: number, data: Record<string, string | number>) => {
  try {
    const ownCheck = await boardRepo.findOneBoard(boardId);
    if (ownCheck.boardInfo.ownUserId !== userId) throw new Error(`400, 이건 당신의 게시물이 아니잖아!`);
    const update = await boardRepo.updateBoard(boardId, data);
    console.log("업데이트 내역 ", update);
    return;
  } catch (err) {
    console.log(err.message);
    if (err.message === "Cannot read properties of undefined (reading 'hasResumeId')")
      throw new Error(`404, 게시글을 찾을 수 없습니다.`);
    throw new Error(err);
  }
};

export const deleteNotice = async (userId: number, boardId: number): Promise<boolean> => {
  try {
    // 게시물이 요청한 본인이 작성한 것인지 검증
    const boardData = await boardRepo.findBoardData(boardId);
    if (boardData.fromUserId !== userId) throw new Error(`400, 이 게시물에 대한 권한이 없습니다.`);

    // 게시글 삭제
    await boardRepo.deleteBoard(boardId);
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export const addLikes = async (userId: number, boardId: number, likesStatus: boolean): Promise<boolean> => {
  const data = {
    userId,
    boardId,
  };
  try {
    const alreadyLikes = await boardRepo.alreadyLikesBoard(boardId);
    console.log("alreadyLikes : ", alreadyLikes);
    // if (alreadyLikes && alreadyLikes.userId === userId) throw new Error(`400, 이미 좋아요를 누른 게시글 입니다.`);

    // 좋아요 상태와 DB에 저장된 값이 없다면 좋아요
    if (!likesStatus && !alreadyLikes) {
      console.log("좋아요상태 : false , 좋아요 로직");
      await boardRepo.likeBoardFromUser(data);
      return true; // 좋아요
    } else {
      console.log("좋아요상태 : ture , 좋아요 취소 로직");
      await boardRepo.unlikeBoardFromUser(userId, boardId);
      return false; // 취소
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const postComment = async (data: CreateCommentDto) => {};
