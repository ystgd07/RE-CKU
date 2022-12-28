import { useParams } from 'react-router-dom';
import ResumeComponent from 'components/Resume';

export type ResumeId = {
    id: string;
};

const Resume = () => {
    const { id } = useParams<ResumeId>();
    // const id = params.id;
    console.log(id, 'id');
    return (
        <div>
            <ResumeComponent resumeId={id} />
        </div>
    );
};

export default Resume;
