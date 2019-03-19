const resTurn = time => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, time)
});
async function huoqu(){
    const result = await resfunc;
    return result;
}