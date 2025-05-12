import axios from 'axios';
import Cookies from 'js-cookie';
const myCookie = Cookies.get(process.env.COOKIE_NAME as string);

const fetcher = axios.create({
  baseURL: '/api'
});

if (myCookie) {
  fetcher.defaults.headers.common['Authorization'] = `${myCookie}`;
}

fetcher.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response.status == 403) {
    //   toast.error("Token expired");
    //   Cookies.remove(process.env.COOKIE_NAME as string);
    //   window.location.href = "/login";
    // }

    return Promise.reject(error);
  }
);

export { fetcher };
