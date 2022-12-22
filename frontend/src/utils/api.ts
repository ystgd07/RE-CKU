import axios from 'axios';

class axiosAPI {
    instance;
    BASE_URL = 'http://localhost:3001';

    constructor() {
        this.instance = axios.create();
        // token 인증 추가
        axios.interceptors.request.use(
            (config): any => {
                const token = localStorage.getItem('accessToken');
                try {
                    if (token) {
                        config.headers = {
                            Authorization: `Bearer ${token}`,
                        };
                    }
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
            const res = await axios.get(this.BASE_URL + apiUrl);

            console.log(res);
            const data = res.data.data;
            return data;
        } catch (err) {
            console.log('Error: ', err);
        }
    }

    async post(endpoint: string, data: any) {
        try {
            const apiUrl = endpoint;
            const res = await axios.post(this.BASE_URL + apiUrl, data);
            return res.data;
        } catch (err) {
            console.log('Error:', err);
        }
    }

    // 미완성
    async patch(endpoint: any, params = '', data: any) {
        try {
            const apiUrl = `${endpoint}/${params}`;
            const res = await axios.patch(this.BASE_URL + apiUrl, data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    // 미완성
    async delete(endpoint: any, params = '', data = {}) {
        try {
            const apiUrl = `${endpoint}/${params}`;
        } catch (err) {
            console.log(err);
        }
    }
}

const API = new axiosAPI();

export default API;
