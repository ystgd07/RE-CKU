import { create } from "../db/board.repo";

export const postNotice = async (data: Record<string, string | boolean | number>): Promise<string> => {
  if (data.resumeId !== null) {
    //이력서 아이디가 있다면
    // 이력서 찾는 해당 아이디로 이력서 찾는 로직 실행.
    // 받아온 정보.usedUserId 와 data.fromUserId 가 같은지 확인
    // 정보가 같지않으면 에러  "이건 당신의 이력서가 아니잖아"
  }

  try {
    await create(data);
    return "게시글이 생성되었습니다.";
  } catch (err) {
    console.log(err);
    throw new Error("500, DB 처리중 에러가 발생했습니다.");
  }
};

export const updateNotice = async (boardId: number, userId: number, data: Record<string, string | number>) => {};
