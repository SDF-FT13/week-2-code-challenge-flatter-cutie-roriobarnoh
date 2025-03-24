// Your code here
const characterBar = document.querySelector("#character-bar");
async function displayCharactres(params) {
  try {
    const response = await fetch("http://localhost:3005/characters");
    if (!response.ok) {
      throw new error("Failed to fetch data!");
    }
    const data = await response.json();
    //  console.log(data);
    // detailedCharacter(data);

    characterBar.innerHTML = "";

    data.forEach((character) => {
      const characterSpan = document.createElement("span");
      characterSpan.textContent = character.name;

      characterSpan.addEventListener("click", () => {
        displayDetailedCharacter(character);
      });

      characterBar.appendChild(characterSpan);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}
displayCharactres();

function detailedCharacter(character) {
  fetch("http://localhost:3005/characters")
    .then((reponse) => reponse.json())
    .then((characters) => {
      characters.forEach((character) => displayDetailedCharacter(character));
    });
}
detailedCharacter();

const detailedInfo = document.querySelector("#detailed-info");

const votesInput = document.querySelector("#vote-count");
function displayDetailedCharacter(character) {
  console.log(detailedInfo);

  const myName = document.querySelector("#name");
  const img = document.querySelector("#image");

  myName.textContent = character.name;
  img.src = character.image;
  votesInput.textContent = character.votes;

  console.log(character.name);
  console.log(character.image);

 
}

const form = document.querySelector("#votes-form");
const inputValue = document.querySelector("#votes");

console.log(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const myVotes = parseInt(inputValue.value, 10);

  if(isNaN(myVotes) || myVotes <=0){
    alert('please enter a valid number greater than zero');
    return;
  }
  const currentVote = parseInt((votesInput).textContent, 10);

  const updatedVotes = currentVote + myVotes;

  votesInput.textContent = updatedVotes;

  inputValue.value = '';
 
});