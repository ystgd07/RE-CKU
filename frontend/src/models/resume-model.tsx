export interface careerDataRes {
    company: string;
    endDate: string;
    careerId: number;
    notDevelop: number;
    position: string;
    reward: string;
    startDate: string;
    resumeId: number;
    workNow: number;
}

export interface projectDataRes {
    projectId: number;
    information: string;
    link1: string;
    link2: string;
    projectName: string;
    resumeId: number;
    year: string;
}

export interface resumeDataRes {
    resumeId: number;
    intro: string;
    resumeName: string;
    position: string;
    updatedAt: string;
    userId: number;
}

export interface userDataRes {
    avatarUrl: string;
    created: string;
    id: number;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
    point: number;
}
