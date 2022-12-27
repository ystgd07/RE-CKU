import React, { useEffect, useState } from 'react';
import { ComunityFrame } from './style';
import Layout from 'components/Layout';
import API from 'utils/api';
import axios from 'axios';

interface BoardResume {
    MARK: string;
    commentCount: number;
    createdAt: string;
    hasResume: number;
    likeCount: number;
    position: string;
    postDescription: string;
    postId: number;
    postTitle: string;
    userId: number;
    userProfileSrc: string;
    username: string;
}

const Comunity = () => {
    const [pageToggle, setPageToggle] = useState<boolean>(false);
    const [boardResumes, setBoardResumes] = useState<BoardResume[]>([]);

    const fetchResume = async () => {
        try {
            const res = await API.get(
                `/board/resumes`,
                `?firstRequest=1&type=created&count=12&mark=&position=ALL`,
            );

            setBoardResumes(res);
        } catch (err: unknown) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchResume();
    }, []);
    console.log(boardResumes, 'board');

    return (
        <Layout>
            <ComunityFrame>
                <div className="comuNav">
                    <ul>
                        <li>자유게시판</li>
                        <li>이력서</li>
                    </ul>
                </div>

                <section className="postWrap">
                    {boardResumes.map((tem: BoardResume, idx: number) => {
                        return <></>;
                    })}
                </section>
            </ComunityFrame>
        </Layout>
    );
};

export default Comunity;
