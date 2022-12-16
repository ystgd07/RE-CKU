import { Link } from 'react-router-dom';

function Main() {
    const post = {
        id: 2,
        title: '게시글 제목',
    };
    return (
        <>
            <div>This is Main</div>
            <Link to="/resume">이력서 페이지 가기</Link>
            <div>
                <Link to={`/create-post`} state={post}>
                    게시물 생성하기
                </Link>
            </div>
            <div>
                <Link to={`/post/${post.id}`} state={post}>
                    게시물 상세 페이지
                </Link>
            </div>
        </>
    );
}

export default Main;
