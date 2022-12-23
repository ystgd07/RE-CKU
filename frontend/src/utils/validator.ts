// 폰번호 형식 일치 여부 검증 기능 - 구현 예정
export const validatePhoneNumber = (phoneNumber: string) => {
    return String(phoneNumber).match(/^\d{3}-\d{3,4}-\d{4}$/);
};
