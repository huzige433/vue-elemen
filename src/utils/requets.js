
import axios from "axios";

// 创建一个单例（实例）
const http = axios.create({
  baseURL: "xxxxxxxxxxxxxxxxxxxxxx",
  timeout: 5000,
});

// 请求拦截
// 添加请求拦截器
http.interceptors.request.use(
    function (request) {
    // 在发送请求之前做些什么
    //若token存在，则在每次请求头中加入token
  const headers=request.headers;
  let token=localStorage.getItem("token");
  headers["token"]=token;

    return request;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截
http.interceptors.response.use(
  (res) => {
    // this.$toast.clear();
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default http;

