const requestURL = 'https://dragonball-api.com/api/characters?pages=1&limit=58';

async function fetchCharacterJson() {
    try{
        const response = await fetch(requestURL);
        if (!response.ok){
            throw new Error(`An error occured. Json request failed ${response.status}.`)
        }
        return await response.json();
    }
    catch (error){
        console.error('An error occured. Null Json', error)
        return null;
    }
}

function createCharacterCard ({name, race, gender, ki, maxKi, afilliation, image}){
    return `
        <div class="card m-4" style="width: 30rem">
            <img src="${image}" class="card-img-top" alt="Person wearing a ${name}.">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title">${name}</h5>
                    <div class="d-flex">
                        <i class="bi bi-star-fill me-2"></i>
                        <p>${race}</p>
                    </div>
                </div>
                <p class="card-text mb-4">${gender}</p>
                <h3>${ki} </h3>
            </div>
        </div>
    `;
}

async function displayCharacters(){
    const characterSection = document.getElementById('characterSection');
    const charactersData = await fetchCharacterJson();
    
    if (charactersData && charactersData.items){
        const charactersCard = charactersData.items.map(createCharacterCard).join('');
        characterSection.innerHTML = charactersCard;
    }
    else{
        characterSection.innerHTML = `<p>Characters Json couldn't load</p>`;
    }
}

displayCharacters();


const header = document.querySelector("header");
const toggleClass = "is-sticky";

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 150) {
    header.classList.add(toggleClass);
  } else {
    header.classList.remove(toggleClass);
  }
});