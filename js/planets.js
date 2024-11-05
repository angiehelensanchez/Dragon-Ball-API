const requestURL = 'https://dragonball-api.com/api/planets?pages=1&limit=20';

async function fetchPlanetJson() {
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

function createPlanetCard ({name, isDestroyed, image, description }){
    return `
        <div class="card m-4" style="width: 30rem">
            <img src="${image}" class="card-img-top" alt="Person wearing a ${name}.">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title">${name}</h5>
                    <div class="d-flex">
                        <i class="bi bi-star-fill me-2"></i>
                    
                    </div>
                </div>
                <p class="card-text mb-4">${isDestroyed}</p>
                <h3>${description} </h3>
            </div>
        </div>
    `;
}

async function displayPlanets(){
    const planetSection = document.getElementById('planetSection');
    const planetsData = await fetchPlanetJson();
    
    if (planetsData && planetsData.items){
        const planetsCard = planetsData.items.map(createPlanetCard).join('');
        planetSection.innerHTML = planetsCard;
    }
    else{
        planetSection.innerHTML = `<p>Planets Json couldn't load</p>`;
    }
}

displayPlanets();


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