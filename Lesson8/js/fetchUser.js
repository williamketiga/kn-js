const BASEURL = 'http://localhost:3000'
async function getUserData() {
    const response = await fetch(`${BASEURL}/user`)
    console.log(response);
    const data = await response.json()
    console.log(`Data fetched from backend -> ${data}`);
    const resultDiv = document.getElementById('result')
    const cardBootstrap = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">User card</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Profile</h6>
                <p class="card-text">Name: ${data.name}</p>
                <p class="card-text">Job: ${data.job}</p>
                <p class="card-text">Age: ${data.age}</p>
            </div>
        </div>
    `
    resultDiv.innerHTML = cardBootstrap
}
async function getPlayerData() {
    const response = await fetch(`http://localhost:3000/ball`)
    console.log(response);
    const data = await response.json()
    console.log(`Data fetched from backend -> ${data}`);
    const resultDiv = document.getElementById('ball')
    const cardBootstrap = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">User card</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Profile</h6>
                <p class="card-text">Name: ${data.name}</p>
                <p class="card-text">Team: ${data.team}</p>
                <p class="card-text">Years played: ${data.year}</p>
                <p class="card-text">Championships: ${data.rings}</p>
            </div>
        </div>
    `
    resultDiv.innerHTML = cardBootstrap
}
getUserData().catch(console.error)
getPlayerData().catch(console.error)