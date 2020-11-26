import baseApi from './api';

class ShortenerService {
    constructor() {
        this.api = baseApi('http://localhost:3001/');
    }

    async getLink(code) {
        const result = await this.api.get(`links/${code}`);

        return result.data;
    }

    async getStats(code) {
        const result = await this.api.get(`links/${code}/stats`);

        return result.data;
    }

    async gerenate(model) {
        const result = await this.api.post('links', model);

        return result.data;
    }
}

export default ShortenerService;