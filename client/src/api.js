import axios from 'axios';
const url = '/api/notes';

export default class API {
    static async getAllNotes(email) {
        const res = await axios.get(url + '/' + email);
        return res.data;
    }
    static async getNoteById(id) {
        const res = await axios.get(url + "/edit/" + id);
        return res.data;
    }
    static async addNote(post) {
        const res = await axios.post(url, post);
        return res.data;
    }
    static async updateNote(id, post) {
        console.log(id);
        const res = await axios.patch(url + "/" + id, post);
        return res.data;
    }
    static async deleteNote(id) {
        const res = await axios.delete(url + "/" + id);
        return res.data;
    }
}