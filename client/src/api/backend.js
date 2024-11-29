import axios from 'axios';

let origin = window.location.origin;
if (origin === 'http://localhost:3000') origin = 'http://localhost:8000';

const backend = axios.create({
  baseURL: `${origin}/api/`,
});

export default backend;
