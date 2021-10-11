const Fetching = async (url, method, data, authToken) => {
    if (method !== "GET" && method!=="DELETE") {
        let Data = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'auth-Token': authToken
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        let res = await Data.json();
        // console.log("response from fr ",res);
        return  res;
    }
    else{
        let Data = await fetch(url, {
            method:method,
            headers: {
                'Content-Type': 'application/json',
                'auth-Token': authToken,
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        let res = await Data.json()
        return res;
    }
    
}

export default Fetching;