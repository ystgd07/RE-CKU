import axios from 'axios';
// axios 클래스 만들어봤는데
// 처음 만들어봐서 이게 질문할게 좀 있습니다.
// 인터셉터로 token 인증 추가를 했습니다.
// 그런데 토큰 안쓰는 api가 있을 수 있는데
// 그때는 이 클래스를 사용할 수 없나요?

// withCredential 활용해서 구분 가능할 수도

class axiosAPI {
    instance;
    BASE_URL = 'http://localhost:3001';
    // BASE_URL = 'https://rechu-api.jinytree.shop';

    constructor() {
        this.instance = axios.create();
        // token 인증 추가
        this.instance.interceptors.request.use(
            (config): any => {
                const headers = config.headers;
                const token = localStorage.getItem('accessToken');
                try {
                    if (headers !== undefined)
                        headers.Authorization = token ? `Bearer ${token}` : '';
                    return config;
                } catch (err) {
                    console.error('[_axios.interceptors.request] config : ' + err);
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            },
        );
    }

    async get(endpoint: string, params = '') {
        try {
            const apiUrl = `${endpoint}/${params}`;
            console.log(`%cGET 요청: ${apiUrl} `, 'color: #a25cd1;');
            const res = await this.instance.get(this.BASE_URL + apiUrl);
            const data = res.data.data;
            return data;
        } catch (err) {
            console.log('Error: ', err);
        }
    }

    async post(endpoint: string, data: any) {
        try {
            const apiUrl = endpoint;
            const res = await this.instance.post(this.BASE_URL + apiUrl, data);
            return res.data;
        } catch (err) {
            console.log('Error:', err);
        }
    }

    async patch(endpoint: any, params = '', data: any) {
        try {
            const apiUrl = `${endpoint}/${params}`;
            const res = await this.instance.patch(this.BASE_URL + apiUrl, data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    async delete(endpoint: any, params = '', data = {}) {
        try {
            const apiUrl = `${endpoint}/${params}`;
            const res = await this.instance.delete(this.BASE_URL + apiUrl, data);
            return res;
        } catch (err) {
            console.log(err);
        }
    }
}

const API = new axiosAPI();

export default API;
