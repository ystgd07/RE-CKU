<<<<<<< HEAD
import { db } from ".";
import * as userRepo from "./user.repo";
import { Board, BoardInfo } from "./schemas/board.entity";
import * as utils from "./utils";
import { TypeCareer, TypeProject } from "./schemas";
import { AlreadyLikesComments } from "./schemas/comment.entity";
=======
import { db, findOneUser } from "./index.repo";
import { Board } from "./schemas/board.entity";
import * as utils from "./utils/index.utils";

>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
// 게시물 전체 보기
export const findAllBoard = async () => {
  // 페이지 네이션 추가해서 리턴해야하는 로직 추가해야함@@

  // 보드와 user 는 ManyToOne , OneToMany 의 관계,
  // 보드는 자신을 소유한 user의 id 값을 가지고 있기 때문에
  // 해당유저와 join 하여 리턴할 모양을 만듬
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

  //
  const boardArr = utils.jsonParse(boards[0]);
  const result = await boardArr.reduce(async (a, c) => {
    let result = await a;
    const commentCnt = await utils.jsonParse(await findComments(c.post_id)).length;
    const likeCnt = await utils.jsonParse(await findLikesToBoard(c.post_id)).length;
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

// 게시물 있는지 찾는 것
export const boardStatus = async (data: number, userId?: null | number) => {
<<<<<<< HEAD
=======
  console.log(" 이결 못해 ?");
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
  const notice = await db.query(
    `
      SELECT *
      FROM board
      WHERE id=?
    `,
    [data]
  );
  const returnValue = utils.jsonParse(notice)[0][0];
  return returnValue;
};

<<<<<<< HEAD
type OneBoardInfo = {
  alreadyLikesThisBoard: boolean;
  boardInfo: BoardInfo;
  resumeInfo: {
    id: number;
    usedUserId: number;
    name: string;
    career: Array<TypeCareer>;
    projects: Array<TypeProject>;
  };
  comments: null | Array<AlreadyLikesComments>;
} | null;
=======
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
// 상세 게시글 보기
export const findOneBoardQ = async (boardId: number, userId?: null | number): Promise<OneBoardInfo> => {
  // 이력서와 댓글의 기본값
  // const returnValue:{
  //   id: number;

  const result: OneBoardInfo = {
    alreadyLikesThisBoard: false,
    boardInfo: {
      id: "",
      title: "",
      content: "",
      hashTags: "",
      boardCreated: undefined,
      hasResumeId: 0,
      fixed: false,
      ownUserId: 0,
    },
    resumeInfo: {
      id: 0,
      usedUserId: 0,
      name: "",
      career: [],
      projects: [],
    },
    comments: [],
  };

  // } = {}
  let id = 0;
  if (userId) {
    id = userId;
  }
<<<<<<< HEAD
  let [boardInfoRows] = await db.query(
=======
  let resumeInfo = null;
  let comments = null;
  let alreadyLikesThisBoard = false;
  console.log("findOneBoard repo ");
  let boardInfo = await db.query(
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
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
<<<<<<< HEAD
  // 쿼리로 받아온 배열의 length 를 사용하기 위해서 jsonParse 유틸함수를 사용함.
  const boardInfo = utils.jsonParse(boardInfoRows)[0];
  if (boardInfo.length === 0) return null;

  // 게시물의 오너ID로 유저검색후, 이메일과 프사정보를 넣어줌
  // 현재 보고있는 게시물에 좋아요를 눌렀는지 확인함. 받아온 userId 가 있다면
  const [userInfo, checkLikes] = await Promise.all([
    userRepo.findOneUser(boardInfo.ownUserId),
    alreadyLikesBoard(boardInfo.id),
  ]);
  boardInfo.email = userInfo.email;
  boardInfo.avatarUrl = userInfo.avatarUrl;

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
=======

  boardInfo[0][0].email = (await findOneUser(boardInfo[0][0].ownUserId, "이메일")).email;
  boardInfo[0][0].avatarUrl = (await findOneUser(boardInfo[0][0].ownUserId, "이메일")).avatarUrl;
  // 이미 게시물에 좋아요 눌렀는지 확인
  const checkLikes = await alreadyLikesBoard(boardInfo[0][0].id);
  // 확인해서 쿼리값이 존재하면 좋아요 한것이기 때문에 true
  // 확실히 있는지 없는지 해줘야 에러가 안뜸. 존재하는지 여부랑 요소랑 같이 물어보는게 좋을듯
  if (checkLikes) {
    alreadyLikesThisBoard = true;
  }
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
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969

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

<<<<<<< HEAD
  // 좋아요 한 댓글을 찾는다.
  const comments = await findComments(boardId);
  // 좋아요 한 댓글이 없을 경우에는 그냥 넣는다.
  if (comments.length !== 0) {
    result.comments = comments;
  }
  // console.log("파싱값 ", parsing);
  const extendedComments = await Promise.all(
    comments.map(async (comment) => {
      console.log("여기서 막힘??");
      const [mappingTable] = await db.query(
=======
  // 귀속된 커맨트를 찾고 없다면 null 로 반환
  comments = await findComments(data);
  const parsing = utils.jsonParse(comments);
  // console.log("파싱값 ", parsing);
  let reduceCmt = await parsing.reduce(async (a, c) => {
    let result = await a;
    // 현재 커멘트의 id와 유저값을 쿼리날려서
    // 매핑 테이블에서 값을 찾아서 있다면
    // 이 댓글에 대한 좋아요를 눌렀던 것임.
    let mapingTable = await utils.jsonParse(
      await db.query(
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
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

<<<<<<< HEAD
  // console.log(boardInfo[0][0]);
  // const result = { alreadyLikesThisBoard, boardInfo: boardInfo[0][0], resumeInfo, comments: reduceCmt };
=======
  if (comments.length === 0) {
    reduceCmt = null;
  }
  console.log(boardInfo[0][0]);
  const result = { alreadyLikesThisBoard, boardInfo: boardInfo[0][0], resumeInfo, comments: reduceCmt };
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
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

<<<<<<< HEAD
/** 해당 id의 게시물로 등록된 userId 배열을 반환하는 REPO */
export const alreadyLikesBoard = async (boardId: number) => {
  const [resultRows] = await db.query(
    `
      SELECT 
        userId 
=======
// 해당 게시글에 좋아요 눌렀는지 확인
export const alreadyLikesBoard = async (boardId: number) => {
  const table = await db.query(
    `
      SELECT userId 
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
      FROM board_like_maping 
      WHERE(boardId=?)
    `,
    [boardId]
  );
<<<<<<< HEAD
  // 리턴값이 복수이기 떄문에 배열로 반환
  const result = utils.jsonParse(resultRows);
  return result;
=======

  const overlap = utils.jsonParse(table)[0][0];
  return overlap;
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
};

// 좋아요 테이블에 board 값 추가
export const likeBoardFromUser = async (data: Record<number, number>) => {
  const [keys, values, valval] = utils.insertData(data);
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
      FROM board_like_maping
      WHERE (userId = ? AND boardId = ?)
    `,
    [userId, boardId]
  );
  return true;
};
