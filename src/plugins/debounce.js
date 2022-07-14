let debounce = (fn) =>{
    //fn  //业务函数
    let timer
    clearTimeout(timer)
    return function(){
        timer = setTimeout(()=>{
            fn()
        },2000)
    }
}

export default debounce