//fetch

async function main() {
    const response= await fetch("https://jsonplaceholder.typicode.com/todos/");
    const res=await response.json();
    console.log(res[0].title);
}

main();
