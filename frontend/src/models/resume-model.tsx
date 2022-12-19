export interface ResumeDetailModel {
    careerData: [];
    msg: string;
    projectData: [];
    resumeData: ResumeData[];
    userData: UserData;
}

export interface ResumeData {
    id: number;
    information?: string;
    name: string;
    position?: string;
    updatedAt: string;
    usedUserId: number;
}

export interface UserData {
    avaterUrl?: string;
    created: string;
    email: string;
    id: number;
    phoneNumber: string;
    username: string;
}
