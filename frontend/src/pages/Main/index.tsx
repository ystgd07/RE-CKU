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
            <Link to={`/post/${post.id}`} state={post}>
                이력서 페이지 가기
            </Link>
        </>
    );
}

export default Main;
