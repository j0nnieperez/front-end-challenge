const API_Url = 'https://api.bitso.com/v3/' 
const API_Key = 'pvLYHXGlzT'
const API_Secret_Key = '7dec2407c16c4fd9b55c89f0023afb90'

const api = {
    async get(endpoint){
        const request = await fetch(API_Url+endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        const data = await request.json();
        return data;
    },
    async post(endpoint, data) {
        const request = await fetch(API_Url+endpoint, {
            method: 'POST',
            enctype:"multipart/form-data",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return request;
    },
    async update(endpoint, data){
        let nonce = new Date().getTime()
        let auth = ''
        const request = await fetch(API_Url+endpoint, {
            method: 'PUT',
            headers: {
                "Authorization": auth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
       });
       return request;
    },
    async deleteWithAuth(endpoint){
        let auth = ''
        const request = await fetch(API_Url+endpoint, {
            method: 'DELETE',
            headers: {
                "Authorization": auth,
                'Content-Type': 'application/json',
            },
       });
       return request;
    },
    async getWhitAuth(endpoint) {
        let nonce = new Date().getTime()
        let http_method="GET"
        let request_path="/v3/"+endpoint+'/'
        let json_payload=""

        let Data = nonce+http_method+request_path+json_payload
        let crypto = require('crypto')
        let signature = crypto.createHmac('sha256', API_Secret_Key).update(Data).digest('hex')
        
        let auth_header = "Bitso "+API_Key+":" +nonce+":"+signature

        console.log(auth_header)
        console.log({
            'Authorization': auth_header,
        })

        const request = await fetch(API_Url+endpoint, {
            method: 'GET',
            headers: {
                'Authorization': auth_header,
            },
        });
        const data = await request.json();
        return data;
    },
    async postWhitAuth(endpoint, data) {
        let auth = ''
        const request = await fetch(API_Url+endpoint, {
            method: 'POST',
            headers: {
                "Authorization": auth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return request;
    },
    
};

export default api;