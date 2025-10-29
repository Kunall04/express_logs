const axios = require('axios');

async function main() {
    const resp=await axios.post(
        //request config
        "https://httpdump.app/dumps/55404113-8f8b-4c8d-8f88-59fa00bfdeeb" , {
        username: "kirt",
        password: "lwda"
    }, 
    {
        headers: {
            Authorization: "comint1234"
        }
    });
    console.log(resp.data);
}
// post requst: axios.post("link", {body}, {headers});

main();