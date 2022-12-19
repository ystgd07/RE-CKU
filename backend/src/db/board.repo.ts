import { db } from ".";
import * as userRepo from "./user.repo";
import { Board, BoardInfo } from "./schemas/board.entity";
import * as utils from "./utils";
import { TypeCareer, TypeProject } from "./schemas";
import { AlreadyLikesComments } from "./schemas/comment.entity";

// 두번째 게시글 페이지네이션
export const findAllBoardToPageNationQ = async () => {
  // 현재 페이지의 마지막 게시물 id 값을 받아야함
  // 그 id 값을 기준으로 페이지 네이션 해야함!
  const [query] = await db.query(`
    SELECT * FROM board WHERE id > 현재마지막게시글id limit 몇개가져올지
  `);
};

/** 인자값 안넣고 부르면 필터없는 전체 게시글 조회! */
export const findAllBoard = async (filter?: string, boardId?: number, count?: number) => {
  // 페이지 네이션 추가해서 리턴해야하는 로직 추가해야함@@
  let perPage = 6;
  if (count) {
    perPage = count;
  }
  console.log(boardId);
  type Board = {
    postId: number;
    username: string;
    hasResume: null;
    postTitle: string;
    postDescription: string;
    userId: number;
    userProfileSrc: string;
    commentCount: number;
    likeCount: number;
    createdAt: string;
  };

  let [boards] = await db.query(
    `SELECT 
      b.id as postId,
      u.username as username,
      b.hasResumeId as hasResume,
      b.title as postTitle,
      b.content as postDescription,
      b.fromUserId as userId,
      u.avatarUrl as userProfileSrc,
      commentCnt as commentCount,
      likeCnt as likeCount,
      b.created as createdAt
    FROM board b
    JOIN user u
    ON b.fromUserId = u.id
    WHERE b.id < ? AND b.hasResumeId ${filter}  
    ORDER BY b.created DESC
    LIMIT ?
  `,
    [boardId, perPage]
  );
  //

  const boardArr = utils.jsonParse(boards);
  // 기존 reduce 써서 한 코드
  // const reducer = await boardArr.reduce(async (a, c) => {
  //   const [commentCount, likeCount] = await Promise.all([findComments(c.post_id), findLikesToBoard(c.post_id)]);
  //   let result = await a;
  //   c.likeCount = likeCount;
  //   c.commentCount = commentCount;
  //   result.push(c);
  //   return result;
  // }, []);
  // result[0] = map;

  const result = await Promise.all(
    boardArr.map(async (board: Board) => {
      const [commentCount, likeCount] = await Promise.all([findComments(board.postId), findLikesToBoard(board.postId)]);
      board.commentCount = commentCount.length;
      board.likeCount = likeCount.length;
      return {
        ...board,
      };
    })
  );
  return result;
};

// 게시물에 달린 좋아요 전체조회
export const findLikesToBoard = async (boardId: number) => {
  const [likes] = await db.query(`select id from board_like_maping where boardId=?`, [boardId]);
  const result = utils.jsonParse(likes);
  return result;
};

// 게시물 있는지 찾는 것
export const boardStatus = async (boardId: number, userId?: null | number) => {
  const [notice] = await db.query(
    `
      SELECT *
      FROM board
      WHERE id=?
    `,
    [boardId]
  );
  const returnValue = utils.jsonParse(notice)[0];
  return returnValue;
};

type OneBoardInfo = {
  alreadyLikesThisBoard: boolean;
  boardInfo: BoardInfo;
  resumeInfo: null | {
    id: number;
    usedUserId: number;
    name: string;
    career: Array<TypeCareer>;
    projects: Array<TypeProject>;
  };
  comments: null | Array<AlreadyLikesComments>;
} | null;
// 상세 게시글 보기
export const findOneBoardQ = async (boardId: number, userId?: null | number): Promise<OneBoardInfo> => {
  // 이력서와 댓글의 기본값
  // const returnValue:{
  //   id: number;

  const result: OneBoardInfo = {
    alreadyLikesThisBoard: false,
    boardInfo: {
      id: 0,
      title: "",
      content: "",
      hashTags: "",
      boardCreated: undefined,
      hasResumeId: 0,
      fixed: false,
      ownUserId: 0,
      email: "",
      avatarUrl: "",
    },
    resumeInfo: null,
    comments: [],
  };

  // } = {}
  let id = 0;
  if (userId) {
    id = userId;
  }
  let [boardInfoRows] = await db.query(
    `SELECT 
    id,
    title,
    content, 
    hashTags, 
    created as boardCreated,
    hasResumeId, 
    fixed,
    fromUserId as ownUserId 
    From board 
    WHERE id=?`,
    [boardId]
  );
  // 쿼리로 받아온 배열의 length 를 사용하기 위해서 jsonParse 유틸함수를 사용함.
  const boardInfo = utils.jsonParse(boardInfoRows)[0];
  console.log(boardInfo);
  if (!boardInfo || boardInfo === undefined) return null;

  // 게시물의 오너ID로 유저검색후, 이메일과 프사정보를 넣어줌
  // 현재 보고있는 게시물에 좋아요를 눌렀는지 확인함. 받아온 userId 가 있다면
  const [userInfo, checkLikes] = await Promise.all([
    userRepo.findOneUser(boardInfo.ownUserId),
    alreadyLikesBoard(boardInfo.id),
  ]);

  result.boardInfo = boardInfo;
  result.boardInfo.email = userInfo.email;
  result.boardInfo.avatarUrl = userInfo.avatarUrl;

  // 이미 게시물에 좋아요 눌렀는지 확인
  if (checkLikes) {
    result.alreadyLikesThisBoard = true;
  }
  result.alreadyLikesThisBoard = false;

  // 게시물이 가지고 있는 이력서Id 가 있다면
  if (boardInfo.hasResumeId > 0 || boardInfo.hasResumeId !== null) {
    const [resumeRows] = await db.query(
      `Select
        id,
        usedUserId,
        name,
        FROM resume a
      WHERE a.id=?
      `,
      [boardInfo.hasResumeId]
    );
    // 값을 수정하기 위해서 jsonParse 해야함.
    const resume = utils.jsonParse(resumeRows);

    // 이력서가 있다면 이력서에 종속된 프로젝트와 커리어를 찾아서 각 필드에 넣어줌
    const [projects, career] = await Promise.all([
      db.query(
        `SELECT 
          * 
        FROM project a 
        JOIN resume r
        On a.usedResumeId=r.id  
        WHERE a.usedResumeId=?
        `,
        [result.boardInfo.hasResumeId]
      ),
      db.query(
        `
          SELECT * 
          FROM career a 
          JOIN resume r 
          On a.usedResumeId = r.id   
          WHERE a.usedResumeId=?
        `,
        [result.boardInfo.hasResumeId]
      ),
    ]);

    // 쿼리로 날린 값에 프로젝트와 커리어를 넣고,
    // 리턴할 이력서 정보에 넣음
    resume.project = utils.jsonParse(projects);
    resume.career = utils.jsonParse(career);
    result.resumeInfo = resume;
  }

  // 좋아요 한 댓글을 찾는다.
  const comments = await findComments(boardId);
  // 좋아요 한 댓글이 없을 경우에는 그냥 넣는다.
  if (comments.length !== 0) {
    result.comments = comments;
  }
  // console.log("파싱값 ", parsing);
  const extendedComments = await Promise.all(
    comments.map(async (comment) => {
      const [mappingTable] = await db.query(
        `
        SELECT id 
        FROM comment_like_maping WHERE userId = ? AND commentId = ?`,
        [userInfo.id, comment.commentId]
      );
      let parseMappingTable = utils.jsonParse(mappingTable);
      if (parseMappingTable.length <= 0) {
        parseMappingTable = null;
      }
      return {
        ...comment,
        alreadyLikes: parseMappingTable !== null ? true : false,
      };
    })
  );
  result.comments = extendedComments;

  // console.log(boardInfo[0][0]);
  // const result = { alreadyLikesThisBoard, boardInfo: boardInfo[0][0], resumeInfo, comments: reduceCmt };
  // 게시물보여줄때
  // 게시물id, 타이틀, 내용, 게시일, 작성자, 이력서:{}, 댓글들:[{댓글id ,내용, 유저이름, 유저아바타, 생성일자 }{}{}]
  // return user[0][0];
  return result;
};

// 조인X 게시물 정보 보기
export const findBoardData = async (boardId: number) => {
  const board = await db.query(`SELECT * FROM board WHERE (id=?)`, [boardId]);
  return utils.jsonParse(board)[0][0];
};

// 게시글 만들기
export const create = async (data: Record<string, string | number | boolean>): Promise<any> => {
  console.log("서비스가 받아온 data : ", data);
  const [keys, values, arrValues] = utils.insertData(data);
  const newBoard = await db.query(`INSERT INTO board (${keys.join(", ")}) VALUES (${values.join(",")})`, [
    ...arrValues,
  ]);
  console.log(typeof newBoard);
  return newBoard[0];
};

// 게시글 수정
export const updateBoard = async (boardId: number, data: Record<string, string | number>) => {
  console.log("게시글 업데이트 내역 : ", data);
  const [keys, values] = utils.updateData(data);
  await db.query(
    `
    UPDATE board 
    SET ${keys.join(", ")}, 
      fixed=true,
      created=now()
    WHERE id = ?`,
    [...values, boardId]
  );
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
export const findComments = async (boardId: number): Promise<AlreadyLikesComments[]> => {
  const [comments] = await db.query(
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
  const result = utils.jsonParse(comments);
  return result;
};

/** 해당 id의 게시물에 등록된 좋아요의  userId 배열을 반환하는 REPO */
export const alreadyLikesBoard = async (boardId: number) => {
  const [resultRows] = await db.query(
    `
      SELECT 
        userId 
      FROM board_like_maping 
      WHERE(boardId=?)
    `,
    [boardId]
  );
  // 리턴값이 복수이기 떄문에 배열로 반환
  const result = utils.jsonParse(resultRows)[0];
  return result;
};

// 좋아요 테이블에 board 값 추가
export const likeBoardFromUser = async (data: Record<number, number>) => {
  const [keys, values, valval] = utils.insertData(data);
  const boardId = valval[1];
  await db.query(
    `
      INSERT 
      INTO 
      board_like_maping (${keys.join(", ")})
      VALUES (${values})
    `,
    [...valval]
  );
  await db.query(
    `
    UPDATE board
    SET
      likeCnt = likeCnt+1
    WHERE id = ?
  `,
    [boardId]
  );
  return true;
};

export const unlikeBoardFromUser = async (userId: number, boardId: number) => {
  // 삭제에 필요한것들 userId, boardId WHERE (coulmn = ? ADN coulmn2 = ?)
  await db.query(
    `
      DELETE
      FROM board_like_maping
      WHERE (userId = ? AND boardId = ?)
    `,
    [userId, boardId]
  );

  await db.query(
    `
    UPDATE board
    SET
      likeCnt = likeCnt -1
    WHERE id = ?
  `,
    [boardId]
  );
  return true;
};

// 이미 게시글에 좋아요 했는지 확인
export const findSavedPointByBoard = async (userId: number, boardId: number) => {
  const [result] = await db.query(
    `
      SELECT userId
      FROM point_from_board
      WHERE (userId=? AND boardId=?)
    `,
    [userId, boardId]
  );
  const returnValue = utils.jsonParse(result)[0];
  return returnValue;
};

// 게시물 좋아요로 게시물 오너의 포인트가 증가됨
export const savePointByBoard = async (data: { userId: number; boardId: number }) => {
  const [keys, values, valval] = utils.insertData(data);
  await db.query(
    `
      INSERT INTO point_from_board (${keys.join(", ")})
      VALUES (${values.join(", ")})
    `,
    [...valval]
  );

  // 보드정보에서 userId 를 가져옴
  const [boardRows] = await db.query(
    `
    SELECT 
      fromUserId
    FROM board
    WHERE id = ?
  `,
    [data.boardId]
  );
  const userId = boardRows[0].fromUserId;
  console.log(userId);

  // 해당 댓글 주인의 포인트 상승
  await db.query(
    `
      UPDATE user 
      SET 
      point = point+?
      WHERE id= ?
    `,
    [50, userId]
  );
};
