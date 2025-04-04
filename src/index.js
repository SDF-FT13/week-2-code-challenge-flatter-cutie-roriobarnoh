// Your code here
const characterBar = document.querySelector("#character-bar");
let currentCharacter = null;
const resetBtn = document.querySelector("#reset-btn");
console.log(resetBtn);

async function displayCharactres(params) {
  try {
    const response = await fetch("http://localhost:3002/characters");
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
  fetch("http://localhost:3002/characters")
    .then((reponse) => reponse.json())
    .then((characters) => {
      characters.forEach((character) => displayDetailedCharacter(character));
    });
}
detailedCharacter();

const detailedInfo = document.querySelector("#detailed-info");

const votesInput = document.querySelector("#vote-count");
function displayDetailedCharacter(character) {
  // console.log(detailedInfo);
  currentCharacter = character;

  const myName = document.querySelector("#name");
  const img = document.querySelector("#image");

  myName.textContent = character.name;
  img.src = character.image;
  votesInput.textContent = character.votes;

  // console.log(character.name);
  // console.log(character.image);
}

const form = document.querySelector("#votes-form");
const inputValue = document.querySelector("#votes");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const votesAdded = parseInt(inputValue.value, 10);
  console.log(votesAdded);

  if (currentCharacter) {
    const votesAdded = parseInt(inputValue.value, 10);
    console.log(votesAdded);
    if (!isNaN(votesAdded)) {
      currentCharacter.votes += votesAdded;
      fetch(`http://localhost:3002/characters/${currentCharacter.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          votes: currentCharacter.votes,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((updatedCharacter) => {
          console.log(updatedCharacter)
          const votesCount = document.querySelector("#vote-count");
          votesCount.textContent = updatedCharacter.votes;
        })
        .catch((error) => {
          console.error("Error updating vtes", error);
        });
      const votesCount = document.querySelector("#vote-count");
      votesCount.textContent = currentCharacter.votes;
    }
  }
  form.reset();
});
resetBtn.addEventListener("click", () => {
  console.log(currentCharacter.votes);
  currentCharacter.votes = 0;
  votesInput.textContent = currentCharacter.votes;
  fetch(`http://localhost:3002/characters/${currentCharacter.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      votes: 0,
    }),
  });
});
const characterForm = document.querySelector("#character-form");
console.log(characterForm);

characterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("clicked");
  const nwName = document.querySelector("#new-name").value.trim();
  const nwImage = document.querySelector("#image-url").value.trim();
  console.log(nwName);
  if (nwName && nwImage) {
    const newCharacter = {
      newName: nwName,
      newImage: nwImage,
      votes: 0,
    };
    console.log(newCharacter);

    
        // const addedCharacter = characters[characters.length - 1]; // Assuming the last character is the newly added one
        // console.log(addedCharacter);
        //   displayCharactres(addedCharacter);
        // Display details of the newly added character immediately
        }
});
