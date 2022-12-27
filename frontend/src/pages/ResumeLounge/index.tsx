import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import * as S from "./style";
import { SlArrowRight, SlPencil, SlHeart } from "react-icons/sl";
import { useInView } from "react-intersection-observer";
import axios from "axios";

type resultType = {
  isConnect: boolean;
  postList: objectType[]; //땜빵
  mark: string;
};

type objectType = { [key: string]: any };

const FilterContext = createContext({} as objectType);

function fakeLoadItem(
  firstRequest: number,
  type: string,
  count: number,
  position: string,
  mark: string = ""
): resultType {
  const jsonData = require("./fake.json");

  return {
    isConnect: true,
    postList: jsonData.slice(0, count),
    mark: "",
  };
}

async function realLoadItem(
  firstRequest: number,
  type: string,
  count: number,
  position: string,
  mark: string = ""
) {
  const jsonData = require("./fake.json");

  return {
    isConnect: true,
    postList: jsonData.slice(0, count),
    mark: "",
  };
}

async function test() {
  const BASE_URL = "http://localhost:3000";
  await axios
    .get(
      `http://localhost:3000/board/community?firstRequest=1&type=created&count=3`
    )
    .then(function (response) {
      console.log(response);
    });
}

function ResumeLounge() {
  const [jobFilter, setJobFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("new");

  const filterContextValue = useMemo(
    () => ({ jobFilter, typeFilter }),
    [jobFilter, typeFilter]
  );

  test();

  return (
    <FilterContext.Provider value={filterContextValue}>
      <WriteButton />
      <JobGroupSelector setFilter={setJobFilter} />
      <TypeGroupSelector setFilter={setTypeFilter} />
      <FreePostListContainer />
    </FilterContext.Provider>
  );
}

function JobGroupSelector({ setFilter }: objectType) {
  const jobMap = [
    ["ALL", "전체보기"],
    ["FE", "프론트엔드"],
    ["BE", "백엔드"],
    ["FS", "풀스텍"],
    ["PM", "pm?"],
  ];

  const jobValue = useContext(FilterContext).jobFilter;

  function JobGroupInput({ jobGroup, jobText }: objectType) {
    return (
      <S.FilterButton
        key={jobGroup}
        active={jobGroup === jobValue}
        onClick={() => {
          setFilter(jobGroup);
        }}
      >
        {jobText}
      </S.FilterButton>
    );
  }

  return (
    <div>
      {jobMap.map(([jobGroup, jobText]) => (
        <JobGroupInput jobGroup={jobGroup} jobText={jobText} />
      ))}
      <p>선택 테스트 : {jobValue}</p>
    </div>
  );
}

function TypeGroupSelector({ setFilter }: objectType) {
  const typeMap = [
    ["new", "최신순"],
    ["like", "좋아요순"],
    ["comment", "댓글순"],
    ["view", "조회수순"],
  ];

  const typeValue = useContext(FilterContext).typeFilter;

  function JobGroupInput({ typeGroup, typeText }: objectType) {
    return (
      <S.FilterButton
        key={typeGroup}
        active={typeGroup === typeValue}
        onClick={() => {
          setFilter(typeGroup);
        }}
      >
        {typeText}
      </S.FilterButton>
    );
  }

  return (
    <div>
      {typeMap.map(([typeGroup, typeText]) => (
        <JobGroupInput typeGroup={typeGroup} typeText={typeText} />
      ))}
      <p>선택 테스트 : {typeValue}</p>
    </div>
  );
}

function FreePostListContainer() {
  const jobValue = useContext(FilterContext).jobFilter;
  const typeValue = useContext(FilterContext).typeFilter;

  const [postListState, setPostListState] = useState([] as objectType[]);
  const [lastMark, setLastMark] = useState("");

  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);

      const { isConnect, postList, mark } = fakeLoadItem(
        1,
        "likeCnt",
        6,
        "ALL"
      );
      setPostListState([...postListState, ...postList]);
      setLastMark(mark);
      alert("help me");
      setLoading(false);
    }
  }, [inView, loading]);

  return (
    <div>
      <S.TitleDiv>
        <button type="button">
          더 보기
          <SlArrowRight />
        </button>
      </S.TitleDiv>

      <ul>
        {postListState.map((i: objectType) => (
          <PostItem post={i} key={i["post_id"]} />
        ))}
      </ul>
      {inView && !loading ? 1 : 2}
      <button type="button" ref={ref}>
        더보기
      </button>
    </div>
  );
}

function WriteButton() {
  return (
    <S.AbsoluteButton type="button">
      <SlPencil />
    </S.AbsoluteButton>
  );
}

function PostItem({ post }: objectType) {
  return (
    <S.PostLI>
      <div className="post">
        <div className="main">
          <h3>{post["postTitle"]}</h3>
          <hr />
          <p>{post["postDescription"]}</p>
        </div>
        <div className="user">
          <img src={post["userProfileSrc"]} />
          <span>{post["username"]}</span>
        </div>
      </div>
      <div className="data">
        <div>
          <SlPencil /> {post["likeCount"]}
        </div>
        <div>
          <SlHeart /> {post["commentCount"]}
        </div>
      </div>
    </S.PostLI>
  );
}

export default ResumeLounge;

//참고자료
//https://medium.com/hivelab-dev/react-js-tutorial-exam-step1-bfec609f5652
//http://61.107.76.13/Li/04_25.html
//https://slog.website/post/8
//https://react.vlpt.us/basic/12-variable-with-useRef.html
//https://swimfm.tistory.com/entry/%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%82%B4%EB%A6%AC%EB%A9%B4-%EC%83%81%EB%8B%A8%EC%97%90-%EA%B3%A0%EC%A0%95%EB%90%98%EB%8A%94-%EB%84%A4%EB%B9%84-%EB%A9%94%EB%89%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0
//https://programming119.tistory.com/211
//https://blog.naver.com/cick3105/222085438083
// 1. 불러오기
// 2. 리스트
// 3. 그리드
// 4. 페이지네이션
// 5. 필터

// 정리하고 마일스톤에 올리기?
