import { useParams } from 'react-router-dom';
import Header from 'components/Header';
import ResumeComponent from 'components/Resume';

const Resume = () => {
    const { id } = useParams<{ id: string }>();
    console.log('resume id = ', id);
    return (
        <div>
            <Header />
            <ResumeComponent resumeId={Number(id)} />
        </div>
    );
};

export default Resume;
