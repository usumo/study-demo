//ajax
function ajax(opts) {
    let url = null;
    let sendObject = null;
    let paramsArr = [];
    let conTentType = null;
    // 前端设置是否带cookie
    // xhr.withCredentials = false;
    //xhrReq.open(method, url, async, user, password);
    for (let item in opts.data) {
        paramsArr.push(`${item}=${opts.data[item]}`);
    }
    if (opts.type.toUpperCase() === 'GET') {
        conTentType = 'application/json';
        url = opts.url + '?' + paramsArr.join('&');
    } else if (opts.type.toUpperCase() === 'POST') {
        conTentType = 'application/x-www-form-urlencoded';
        sendObject = paramsArr.join('&');
        url = opts.url;
    }
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest() || new ActiveXObject();
        xhr.open(opts.type, url, true);
        xhr.setRequestHeader("Content-type", conTentType);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.response);
                }
            }
        }
        xhr.send(sendObject);
    });
}
window.onload = () => {
    let opts = {
        type: 'GET',
        url: 'http://localhost:3088/v3/api/user/is_crbt',
        data: {
            mobile: '18382471719',
        }
    }
    ajax(opts).then(result => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });

    let options = {
        type: 'POST',
        url: 'http://localhost:3088/v3/api/user/recharge',
        data: {
            name: 'wyfnet@foxmail.com',
            password: '1234567890'
        }
    }
    ajax(options).then(result => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
}