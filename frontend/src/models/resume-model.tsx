export interface ResumeDetailModel {
    careerData: [];
    msg: string;
    projectData: [];
    resumeData: ResumeData[];
    userData: UserData;
}

export interface ResumeData {
    userId: number;
    intro?: string;
    resumeName: string;
    position?: string;
    updatedAt: string;
    resumeId: number;
}

export interface UserData {
    avaterUrl?: string;
    created: string;
    email: string;
    id: number;
    phoneNumber: string;
    username: string;
}

export interface WorkFormData {
    companyName: string;
    jobGroup: string;
    startWork: string;
    endWork: string;
    workPerformance: string;
}

export interface ProjectFormData {
    projectName: string;
    year: string;
    information: string;
    link1: string;
    link2: string;
    // stacks: Stack[],
}
