import { useParams, useLocation, Outlet, useMatch, Link } from 'react-router-dom';
import styled from '@emotion/styled';

interface RouteState {
    state: {
        id: string;
        title: string;
    };
}

const Post = () => {
    const { postId } = useParams<{ postId: string }>();
    const { state } = useLocation() as RouteState;
    console.log(state);
    console.log('postId = ', postId);
    return (
        <div>
            <div>게시물 아이디: {state?.id}</div>
            <div>게시물 제목: {state?.title}</div>
        </div>
    );
};

export default Post;
