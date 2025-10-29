//fetch

async function main() {
    const response= await fetch("https://jsonplaceholder.typicode.com/todos/");
    const res=await response.json();
    console.log(res[0].title);
}

//axios
const axios=require('axios');

async function maiin() {
    const resp=await axios.get("https://jsonplaceholder.typicode.com/todos/");
    console.log(resp.data.length);
}

main();
maiin();
