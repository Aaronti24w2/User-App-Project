const API_URL = "https://reqres.in/api/users";

let userInfoData = [];
const userContainer = document.getElementById("user-container");
const userClickedInfo = document.getElementById("user-clicked-info");

async function getUserInfo() {
  // JUST TO UNDERSTAND HOW IT WORKS WITH THEN CATCH BLOCK
  // fetch(API_URL).then((data) => {
  //     return data.json();
  // }).then((dataJSON) => {
  //     createCardUI();
  // }).catch((error) => {
  //     userInfoData = dataInJson.data || [];
  // })
  try {
    const data = await fetch(API_URL);
    const dataInJson = await data.json();
    userInfoData = dataInJson.data;
    generateAllCards(userInfoData)
  } catch (error) {
    console.log("There was an error", error);
    userInfoData = [];
  }
}

async function getUserDetails(userId){
  try { 
  const userDetails = await fetch(`${API_URL}/${userId}`);
  const userDetailsJson = await userDetails.json();
  displayUserDetails(userDetailsJson.data);
  }
  catch(error){
    console.log("There was an error", error);
  }
}

function createCardUI(user) {
  let cardUI = `
    <div class="card  m-4" style="width: 18rem;">
  <img src=${user.avatar} class="card-img-top" alt="...">
  <div class="card-body">
    <h1>${user.first_name} ${user.last_name}</h1>
    <p class="card-text">${user.email}</p>
  </div>
  <button class="btn btn-primary" onclick="getUserDetails(${user.id})">Get Details</button>
</div>
    `;

  userContainer.innerHTML += cardUI;
}

function displayUserDetails(user) {
  let userDetailsUI = `
    <div class="card m-4" style="width: 18rem;">
      <img src=${user.avatar} class="card-img-top" alt="...">
      <div class="card-body">
        <h1>${user.first_name} ${user.last_name}</h1>
        <p class="card-text">${user.email}</p>
        <p class="card-text">User ID: ${user.id}</p>
        <p class="card-text">Company: ${user.company || 'lorem ipsum'}</p>
        <p class="card-text">Location: ${user.location || 'anywhere'}</p>
      </div>
    </div>
    `;

  userClickedInfo.innerHTML = userDetailsUI;
}

function generateAllCards(userData = []) {
    for(let i = 0 ; i < userData.length; i++) {
        createCardUI(userData[i]);
    }
}



getUserInfo();
