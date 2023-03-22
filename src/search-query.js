import axios from 'axios';

export default function searchQuery(inputQueryValue, pageValue, perPageValue) {
    const BASE_URL = 'https://pixabay.com/api/';
    const key = '34332505-45396fda10b41948f3d74cbb9';
    return axios(`${BASE_URL}?key=${key}&q=${inputQueryValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageValue}&per_page=${perPageValue}`)
}