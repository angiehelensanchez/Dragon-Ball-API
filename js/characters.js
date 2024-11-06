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

function createCharacterCard ({name, race, gender, ki, maxKi, affiliation, image}){
    return `
        <div class="card mb-3" style="max-width:600px">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${image}" class="img-fluid rounded-start" alt="Dragon ball character ${name}.">
                </div>
                <div class="col-md-8">
                    <div class="card-body" style="height: 100%">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${race}-${gender}</p>
                        <p class="card-text2">Base KI:</p>
                        <p class="card-text">${ki}</p>
                        <p class="card-text2">Total KI:</p>
                        <p class="card-text">${maxKi}</p>
                        <p class="card-text2">Afilliation:</p>
                        <p class="card-text">${affiliation}</p>
                    </div>
                </div>
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