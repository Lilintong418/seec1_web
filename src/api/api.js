//统一管理我们的开发接口 api
import axios from "axios";
let instance = axios.create({
    baseURL:"/api", //基准地址
    timeout:5000
})
//响应请求响应拦截
instance.interceptors.request.use((config)=>{
    //请求拦截  在发送请求之前做些什么
    console.log(config);
    // config.headers.token = "wwwwwwwwww"
    return config
},(error)=>{
    // 对请求错误做些什么
    return Promise.reject(error);
})

instance.interceptors.response.use(response=>{
    // 响应拦截器  对响应数据做点什么
    // response 是后台发挥的响应数据
    return response
},(error)=>{
    // 对响应错误做点什么
    return Promise.reject(error);
})



export default instance;