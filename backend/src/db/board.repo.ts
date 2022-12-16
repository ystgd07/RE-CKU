import { db, findOneUser } from "./index.schema";
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
export const findOneBoard = async (data: number, userId?: null | number) => {
  // 이력서와 댓글의 기본값
  let id = null;
  if (userId) {
    id = userId;
  }
  let resumeInfo = null;
  let comments = null;
  console.log("findOneBoard repo ");
  let boardInfo = await db.query(
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
  boardInfo[0][0].email = (await findOneUser(boardInfo[0][0].ownUserId, "이메일")).email;
  // 이미 게시물에 좋아요 눌렀는지 확인

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
      await db.query(
        `
          SELECT * 
          FROM project a 
          JOIN resume r
          On a.usedResumeId=r.id  
          WHERE a.usedResumeId=?
        `,
        [resumeInfo.id]
      )
    )[0];
    resumeInfo.career = (
      await db.query(
        `
          SELECT * 
          FROM career a 
          JOIN resume r 
          On a.usedResumeId = r.id   
          WHERE a.usedResumeId=?
        `,
        [resumeInfo.id]
      )
    )[0];
  }

  // 귀속된 커맨트를 찾고 없다면 null 로 반환
  comments = await findComments(data);
  const parsing = jsonParse(comments);
  // console.log("파싱값 ", parsing);
  let reduceCmt = await parsing.reduce(async (a, c) => {
    let result = await a;
    // 현재 커멘트의 id와 유저값을 쿼리날려서
    // 매핑 테이블에서 값을 찾아서 있다면
    // 이 댓글에 대한 좋아요를 눌렀던 것임.
    let mapingTable = await jsonParse(
      await db.query(
        `
      SELECT id
      From comment_like_maping 
      Where (userId =? AND commentId =?)
      `,
        [id, c.commentId]
      )
    )[0][0];
    if (mapingTable) {
      console.log("좋아요 누른 댓글임");
      c.alreadyLikes = true;
    }
    result.push(c);
    return result;
  }, []);

  if (comments.length === 0) {
    reduceCmt = null;
  }
  const result = { boardInfo: boardInfo[0][0], resumeInfo, comments: reduceCmt };
  // 게시물보여줄때
  // 게시물id, 타이틀, 내용, 게시일, 작성자, 이력서:{}, 댓글들:[{댓글id ,내용, 유저이름, 유저아바타, 생성일자 }{}{}]
  // return user[0][0];
  return result;
};

// 조인X 게시물 정보 보기
export const findBoardData = async (boardId: number) => {
  const board = await db.query(`SELECT * FROM board WHERE (id=?)`, [boardId]);
  return jsonParse(board);
};

// 게시글 만들기
export const create = async (data: Record<string, string | number | boolean>): Promise<any> => {
  console.log("서비스가 받아온 data : ", data);
  const [keys, values, arrValues] = insertData(data);
  const newBoard = await db.query(`INSERT INTO board (${keys.join(", ")}) VALUES (${values.join(",")})`, [
    ...arrValues,
  ]);
  console.log(typeof newBoard);
  return newBoard[0];
};

// 게시글 수정
export const updateBoard = async (boardId: number, data: Record<string, string | number>) => {
  console.log("게시글 업데이트 내역 : ", data);
  const [keys, values] = updateData(data);
  await db.query(`UPDATE board SET ${keys.join(", ")}fixed=true ,created=now() WHERE id = ?`, [...values, boardId]);
  return true;
};

// 게시글 삭제
export const deleteBoard = async (boardId: number) => {
  await db.query(
    `
      DELETE 
      FROM board 
      WHERE (id = ?)
    `,
    [boardId]
  );
  return true;
};

// 게시물ID 로 댓글 찾기
export const findComments = async (boardId: number) => {
  let comments = await db.query(
    `SELECT 
    s.alreadyLikes,
    s.id as commentId, 
    u.username, 
    u.avatarUrl,
    s.text,
    s.created as commentCreated,
    s.likes,
    s.userId as fromUserId,
    s.fixed
    From board a 
    JOIN comment s 
    ON s.boardId=a.id 
    Join user u 
    On s.userId=u.id 
    WHERE a.id=? `,
    [boardId]
  );
  // 사람이 댓글에 좋아요 하면
  // 사람1    댓글 1
  // 코맨트id로 찾을 경우 이 댓글을 좋아하는 사람들의 목록이 나옴
  // const parsing = jsonParse(comments)[0];
  // console.log("파싱값 ", parsing);
  // const reduceCmt = parsing.reduce(async (a, c) => {
  //   let result = await a;
  //   const curCommentId = c.commentId
  //   const mapingTable = await db.query(
  //     `
  //     SELECT userId
  //     From comment_like_maping
  //     Where commentId =
  //     `,
  //     []
  //   );
  // }, []);

  return comments[0];
};

// 해당 게시글에 좋아요 눌렀는지 확인
export const likesFrom = async (userId: number) => {
  const table = await db.query(
    `
      SELECT boardId 
      FROM board_like_maping 
      WHERE(userId=?)
    `,
    [userId]
  );
  const overlap = jsonParse(table);
  return overlap;
};

// 좋아요 테이블에 board 값 추가
export const likeBoardFromUser = async (data: Record<number, number>) => {
  const [keys, values, valval] = insertData(data);
  await db.query(
    `
      INSERT 
      INTO 
      board_like_maping (${keys.join(", ")})
      VALUES (${values})
    `,
    [...valval]
  );
  return true;
};

export const unlikeBoardFromUser = async (userId: number, boardId: number) => {
  // 삭제에 필요한것들 userId, boardId WHERE (coulmn = ? ADN coulmn2 = ?)
  await db.query(
    `
      DELETE
      board_like_maping
      WHERE (userId = ? AND boardId = ?)
    `,
    [userId, boardId]
  );
  return true;
};

// 댓글의 좋아요 추가
export const likeCommentFromUser = async (data: Record<number, number>) => {
  const [keys, values, valval] = insertData(data);
  await db.query(
    `
      INSERT 
      INTO 
      comment_like_maping (${keys.join(", ")})
      VALUES (${values})
    `,
    [...valval]
  );
  return true;
};

export const unlikeCommentFromUser = async (userId: number, commentId: number) => {
  // 삭제에 필요한것들 userId, boardId WHERE (coulmn = ? ADN coulmn2 = ?)
  await db.query(
    `
      DELETE
      comment_like_maping
      WHERE (userId = ? AND commentId = ?)
    `,
    [userId, commentId]
  );
  return true;
};
