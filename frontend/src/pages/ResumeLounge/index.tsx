import React, { useState, useEffect } from "react";
import * as S from "./style";
import { SlArrowRight, SlPencil, SlHeart } from "react-icons/sl";
import { useInView } from "react-intersection-observer";

type resultType = {
  isConnect: boolean;
  postList: never[]; //땜빵
  isLastPage: boolean;
};

function fakeLoadItem(
  filter: string,
  count: number,
  pageNum: number = 1
): resultType {
  const jsonData = require("./fake.json");

  return {
    isConnect: true,
    postList: jsonData.slice(0, count),
    isLastPage: false,
  };
}

function ResumeLounge() {
  return (
    <div>
      {/*직군필터*/}
      {/*필터*/}
      {/*리스트*/}
      <WriteButton />
      <JobGroupSelector />
      <FilterPostListContainer filter="like" />
      <FilterPostListContainer filter="comment" />
      <FilterPostListContainer filter="view" />
      <FreePostListContainer />
    </div>
  );
}

function JobGroupSelector() {
  return <div></div>;
}

type objectType = { [key: string]: any };

const FILTER_STRING: objectType = {
  like: "좋아요 많은 게시물",
  comment: "댓글 많은 게시물",
  view: "조회수 많은 게시물",
  new: "자유 주제 게시물",
};

function FilterPostListContainer({ filter }: objectType) {
  const { isConnect, postList, isLastPage } = fakeLoadItem(filter, 1);
  return (
    <div>
      <S.TitleDiv>
        <h2>{FILTER_STRING[filter]}</h2>
        <button type="button">
          더 보기
          <SlArrowRight />
        </button>
      </S.TitleDiv>
      <ul>
        {postList.map((i: objectType) => (
          <PostItem post={i} key={i["post_id"]} />
        ))}
      </ul>
    </div>
  );
}

function FreePostListContainer() {
  const [postListState, setPostListState] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isLastPageState, setIsLastPageState] = useState(true);

  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const { isConnect, postList, isLastPage } = fakeLoadItem(
      "new",
      12,
      pageNum
    );
    setPostListState([...postListState, ...postList]);
    setIsLastPageState(isLastPage);

    setLoading(false);
  }, [pageNum]);

  useEffect(() => {
    if (inView && !loading) {
      setPageNum((prev) => prev + 1);
    }
  }, [inView, loading]);

  return (
    <div>
      <S.TitleDiv>
        <h2>{FILTER_STRING["new"]}</h2>
        <button type="button">
          더 보기
          <SlArrowRight />
        </button>
      </S.TitleDiv>

      <ul>
        페이지 넘버 테스트 : {pageNum}
        {postListState.map((i: objectType) => (
          <PostItem post={i} key={i["post_id"]} />
        ))}
      </ul>
      {isLastPageState ? (
        ""
      ) : (
        <button type="button" ref={ref}>
          {/* onClick={() => setPageNum(pageNum + 1)} */}
          더보기
        </button>
      )}
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
          <h3>{post["post_title"]}</h3>
          <hr />
          <p>{post["post_description"]}</p>
        </div>
        <div className="user">
          <img src={post["user_profile_src"]} />
          <span>{post["user_id"]}</span>
        </div>
      </div>
      <div className="data">
        <div>
          <SlPencil /> {post["like_count"]}
        </div>
        <div>
          <SlHeart /> {post["comment_count"]}
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
