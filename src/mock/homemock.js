let Mock = require("mockjs")
//   /aa 拦截
let arr = ["zhangsan","lisi","wangwu"];
// Mock.mock("/api/aa","get",(options)=>{
//     console.log(options);  //{url:"/api/aa",type:"get",body:null}
//     return arr
// })
//正则  /api/aa
Mock.mock(/\/api\/aa/,"get",(options)=>{
    console.log(options);  //{url:"/api/aa",type:"get",body:null}
    return arr
})


Mock.mock("/api/ab","post",(options)=>{
    console.log(options);  //{url:"/api/aa",type:"get",body:null}
    return {
        status:200,
        message:"success",
        data:arr
    }
})