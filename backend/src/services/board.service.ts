import { create } from "../db/board.repo";

export const postNotice = async (data: Record<string, string | boolean | number>): Promise<string> => {
  if (data.resumeId) {
    //이력서 아이디를 갖고있는 부모를 찾고,
    // 그 부모에 대한 값과
  }
  try {
    await create(data);
    return "게시글이 생성되었습니다.";
  } catch (err) {
    console.log(err);
    throw new Error("500, DB 처리중 에러가 발생했습니다.");
  }
};
