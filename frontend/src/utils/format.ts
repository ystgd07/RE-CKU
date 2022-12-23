// 13,000원, 2개 등의 문자열에서 쉼표, 글자 등 제외 후 숫자만 뺴냄
// 예시: 13,000원 -> 13000, 20,000개 -> 20000
export const convertToNumber = (price: string) => {
    return parseInt(price.replace(/(,|개|원)/g, ''));
};

// 숫자에 쉼표를 추가함. (10000 -> 10,000)
export const addCommas = (n: number) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 폰 번호 형식 자동 포맷
export function formatPhoneNumber(phoneNumber: string) {
    const formattedPhoneNumber = phoneNumber
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(-{1,2})$/g, '');
    return formattedPhoneNumber;
}

// ~초 전, ~분 전, ~일 전 등 상황에 맞게 수정
export function calcElapsed(date: Date | undefined) {
    const time = new Date(String(date)).getTime();

    const elapsedSec = (Date.now() - time) / 1000;
    if (elapsedSec >= 60) {
        const elapsedMin = elapsedSec / 60;
        if (elapsedMin >= 60) {
            const elapsedHour = elapsedMin / 60;
            if (elapsedHour >= 24) {
                const elapsedDay = elapsedHour / 24;
                return Math.floor(elapsedDay) + '일';
            } else {
                return Math.floor(elapsedHour) + '시간';
            }
        } else {
            return Math.floor(elapsedMin) + '분';
        }
    } else {
        return Math.floor(elapsedSec) + '초';
    }
}
