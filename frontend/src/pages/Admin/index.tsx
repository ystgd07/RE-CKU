import * as S from './style';
import { Link } from 'react-router-dom';
import Header from './../../components/Header/index';

const Admin = () => {
    return (
        <S.Div>
            <div>
                <S.H1>Admin</S.H1>
            </div>
            <S.RowDiv>
                <S.Nav>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        <div>회원관리</div>
                    </Link>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        <div>회원관리</div>
                    </Link>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        <div>회원관리</div>
                    </Link>
                </S.Nav>
                <S.Content>
                    컨텐츠
                    <div>d</div>
                </S.Content>
            </S.RowDiv>
        </S.Div>
    );
};

export default Admin;
