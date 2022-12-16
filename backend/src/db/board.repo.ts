import { db } from "./index.schema";
import { Board } from "./schemas/board.entity";
import { updateData, insertData, jsonParse } from "./utils/index.utils";

// 게시물 전체 보기
export const findAllBoard = async () => {
  // 페이지 네이션 추가해서 리턴할 것.
  let boards = await db.query(`SELECT 
    b.id as post_id,
    b.hasResumeId as has_resume,
    b.title as post_title,
    b.content as post_description,
    b.fromUserId as user_id,
    u.avatarUrl as user_profile_src,
    commentCnt as comment_count,
    likeCnt as like_count
    FROM board b
    JOIN user u
    ON b.fromUserId = u.id
  `);
  const boardArr = jsonParse(boards[0]);
  const result = await boardArr.reduce(async (a, c) => {
    let result = await a;
    const commentCnt = await jsonParse(await findComments(c.post_id)).length;
    const likeCnt = await jsonParse(await findLikesToBoard(c.post_id)).length;
    c.like_count = likeCnt;
    c.comment_count = commentCnt;
    // console.log(`게시물 ID :${c.post_id}에 담긴 , 댓글 :${c.comment_count}, 좋아요 : ${c.like_count}`);
    result.push(c);
    return result;
  }, []);
  return result;
};

// 게시물에 달린 좋아요 전체조회
export const findLikesToBoard = async (boardId: number) => {
  const likes = await db.query(`select id from board_like_maping where boardId=?`, [boardId]);
  return likes[0];
};

// 상세 게시글 보기
export const findOneBoard = async (data: number) => {
  // 이력서와 댓글의 기본값
  let resumeInfo = null;
  let comments = null;
  console.log("findOneBoard repo ");
  const boardInfo = await db.query(
    `SELECT 
    title,
    content, 
    hashTags, 
    created as boardCreated,
    hasResumeId, 
    fixed,
    fromUserId as ownUserId 
    From board 
    WHERE id=?`,
    [data]
  );

  // 만약 이력서 게시물이 이력서 id를 존재한다면 이력서정보를 resumInfo 에 담아줌
  if (boardInfo[0][0].hasResumeId > 0 || boardInfo[0][0].hasResumeId !== null) {
    resumeInfo = (
      await db.query(
        `Select
      *
    FROM resume a
    WHERE a.id=?
    `,
        [boardInfo[0][0].hasResumeId]
      )
    )[0][0];

    // 이력서가 있다면 이력서에 종속된 프로젝트와 커리어를 찾아서 각 필드에 넣어줌
    resumeInfo.projects = (
      await db.query(`select * from project a join resume r On a.usedResumeId=r.id   where a.usedResumeId=?`, [
        resumeInfo.id,
      ])
    )[0][0];
    resumeInfo.career = (
      await db.query(` select * from career a join resume r On a.usedResumeId=r.id   where a.usedResumeId=?`, [
        resumeInfo.id,
      ])
    )[0][0];
  }

  // 귀속된 커맨트를 찾고 없다면 null 로 반환
  comments = await findComments(data);
  if (comments.length === 0) {
    comments = null;
  }
  const result = { boardInfo: boardInfo[0][0], resumeInfo, comments };
  // 게시물보여줄때
  // 게시물id, 타이틀, 내용, 게시일, 작성자, 이력서:{}, 댓글들:[{댓글id ,내용, 유저이름, 유저아바타, 생성일자 }{}{}]
  // return user[0][0];
  return result;
};

export const findComments = async (boardId: number) => {
  console.log("댓글찾다가?");
  const comments = await db.query(
    `SELECT 
    s.id as commentId, 
    u.username, 
    s.text,
    s.created as commentCreated,
    s.userId,
    s.fixed
    From board a 
    JOIN comment s 
    ON s.boardId=a.id 
    Join user u 
    On s.userId=u.id 
    WHERE a.id=? `,
    [boardId]
  );
  return comments[0];
};

export const create = async (data: Record<string, string | number | boolean>): Promise<any> => {
  console.log("서비스가 받아온 data : ", data);
  const [keys, values, arrValues] = insertData(data);
  const newBoard = await db.query(`INSERT INTO board (${keys.join(", ")}) VALUES (${values.join(",")})`, [
    ...arrValues,
  ]);
  console.log(typeof newBoard);
  return newBoard[0];
};

export const updateBoard = async (boardId: number, data: Record<string, string | number>) => {
  console.log("게시글 업데이트 내역 : ", data);
  const [keys, values] = updateData(data);
  await db.query(`UPDATE board SET ${keys.join(", ")}fixed=true ,created=now() WHERE id = ?`, [...values, boardId]);
  return true;
};
