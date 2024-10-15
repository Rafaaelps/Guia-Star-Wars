let currentPageUrl = 'https://swapi.dev/api/vehicles/'

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

};


async function loadCharacters(url) {
    const mainContent = document.getElementById ('main-content')
    mainContent.innerHTML = ''; //limpar os resultados anteriores

    try {

      const response = await fetch(url);
      const responseJson = await response.json();

      responseJson.results.forEach(async (vehicles) => {
        
        const card = document.createElement("div")

        const veihclesImage = {
            "Zephyr-G swoop bike": "https://cdnb.artstation.com/p/assets/images/images/022/606/397/large/brandon-robinson-robinsonb-assignment-3-exterior-1.jpg?1576053950",
            "XJ-6 airspeeder": "https://th.bing.com/th/id/OIP.NDUudOkbLRuScH_Kd0CawwAAAA?rs=1&pid=ImgDetMain",
            "Koro-2 Exodrive airspeeder": "https://vignette2.wikia.nocookie.net/starwars/images/2/22/Koro2_uvg.jpg/revision/latest?cb=20130519005132",
            "LAAT/i": "https://th.bing.com/th/id/R.f6d9d4d49a77c8c8875fba07c8486f03?rik=gcULIw%2f%2fPYAuPA&pid=ImgRaw&r=0",
            "LAAT/c": "https://vignette.wikia.nocookie.net/starwars/images/5/51/LAAT1.jpg/revision/latest?cb=20080428092324&path-prefix=hu",
            "AT-TE": "https://cdnb.artstation.com/p/assets/images/images/043/794/693/large/luke-patching-atte4.jpg?1638282798",
            "SPHA": "https://th.bing.com/th/id/R.f4bf594720657b58a76beb3cca81902b?rik=f5q1Msile3dHfQ&riu=http%3a%2f%2fwww.jedi-legacy.com%2ftechno%2fsphat03.jpg&ehk=enVwGTMIAXzVitUf1pqDjKPXWCl5jFXSk4KqnpAKU8I%3d&risl=&pid=ImgRaw&r=0",
            "Flitknot speeder": "https://th.bing.com/th/id/OIP.fDjz5raKzKbUfIGf02_S9wHaD8?rs=1&pid=ImgDetMain",
            "Neimoidian shuttle": "https://th.bing.com/th/id/OIP.fGRIy1bLHe4Oi53LdfwIaAHaHb?rs=1&pid=ImgDetMain",
            "Geonosian starfighter": "https://th.bing.com/th/id/OIP.BvWI8jwVvvWTmOwwYzrF4QHaEK?rs=1&pid=ImgDetMain",
            "Tsmeu-6 personal wheel bike": "https://th.bing.com/th/id/R.be5219db9577d77667ebb48dad263df5?rik=5JWoYHKX%2brJy2g&riu=http%3a%2f%2fvignette3.wikia.nocookie.net%2fswg%2fimages%2fe%2fec%2fGrievous_Exclusive_Mount.jpg%2frevision%2flatest%3fcb%3d20091119212120&ehk=FgdlHX4%2fQ0NnT4oqdqS5OHLWxfkOXl%2fYMgXCtENU0us%3d&risl=&pid=ImgRaw&r=0",
            "Emergency Firespeeder": "https://th.bing.com/th/id/OIP.azTPKEFyumMZBbW5NUTjywHaFg?rs=1&pid=ImgDetMain",
            "Droid tri-fighter": "https://th.bing.com/th/id/OIP.sqcc8EwKZn6x7AvHhzgJCwHaHa?rs=1&pid=ImgDetMain",
            "Oevvaor jet catamaran": "https://www.starwars-universe.com/images/encyclopedie/vaisseaux_vehicules/images_du_texte/vc_catamaranwookiee/catamaran1.jpg",
            "Raddaugh Gnasp fluttercraft": "https://vignette.wikia.nocookie.net/starwars/images/4/40/WookieeFluttercraft-SWDB.jpg/revision/latest?cb=20080425140709",
            "Clone turbo tank": "https://th.bing.com/th/id/OIP.4nQCA_RxjSXupCiHbLOCxgHaFK?rs=1&pid=ImgDetMain",
            "Corporate Alliance tank droid": "https://vignette.wikia.nocookie.net/star-wars-and-mlpfim/images/c/c3/Corporate_Alliance_Tank_Droid.jpg/revision/latest/scale-to-width-down/2000?cb=20140813145650",
            "Droid gunship": "https://th.bing.com/th/id/R.769ed643d33ebafdb3dd18c28de33eea?rik=kgQv9v1g2FQ83g&riu=http%3a%2f%2fimg3.wikia.nocookie.net%2f__cb20141227052202%2fstarwars%2fimages%2f6%2f6d%2fDroidGunship-DB.png&ehk=Jon5izHY1zROSPNAtZwPX1v8bawJ27kCk9Xi69%2fsPkM%3d&risl=&pid=ImgRaw&r=0",
            "AT-RT": "https://www.renderhub.com/zifir3d/star-wars-at-rt-walker/star-wars-at-rt-walker-01.jpg"

        };
        
        let urlImg = veihclesImage[vehicles.name] || `https://starwars-visualguide.com/assets/img/vehicles/${vehicles.url.replace(/\D/g, "")}.jpg`;
        
        card.style.backgroundImage = `url('${urlImg}')`
        card.className = "cards"

        const characterNameBG = document.createElement("div")
        characterNameBG.className = "character-name-bg"

        const characterName = document.createElement("span")
        characterName.className = "character-name"
        characterName.innerText = `${vehicles.name}`

        characterNameBG.appendChild(characterName)
        card.appendChild(characterNameBG)

        card.onclick = () => {
            const modal = document.getElementById('modal')
            modal.style.visibility = "visible"

            const modalContent = document.getElementById("modal-content")
            modalContent.innerHTML = ''

            const characterImage = document.createElement("div")
            characterImage.style.backgroundImage = `url('${urlImg}')`
            characterImage.className = "character-image"

            const name = document.createElement("span")
            name.className = "character-details"
            name.innerText = `Nome: ${vehicles.name}`
           
            const vehiclesModel = document.createElement("span")
            vehiclesModel.className = "character-details"
            vehiclesModel.innerText = `Modelo: ${vehicles.model}`

            const manufacturer = document.createElement("span")
            manufacturer.className = "character-details"
            manufacturer.innerText = `Fabricante: ${vehicles.manufacturer}`

            const vehiclesPassengers = document.createElement("span")
            vehiclesPassengers.className = "character-details"
            vehiclesPassengers.innerText = `Passageiros: ${convertVehiclesPassengers(vehicles.passengers)}`

            const cargoCapacity = document.createElement("span")
            cargoCapacity.className = "character-details"
            cargoCapacity.innerText = `Capacidade de Carga: ${convertCargoCapacity(vehicles.cargo_capacity)}`


            modalContent.appendChild(characterImage)
            modalContent.appendChild(name)
            modalContent.appendChild(vehiclesModel)
            modalContent.appendChild(manufacturer)
            modalContent.appendChild(vehiclesPassengers)
            modalContent.appendChild(cargoCapacity)
            
        }

        mainContent.appendChild(card)
      });

      const nextButton = document.getElementById('next-button')
      const backButton = document.getElementById('back-button')

      nextButton.disabled = !responseJson.next
      backButton.disabled = !responseJson.previous

      backButton.style.visibility = responseJson.previous? "visible" : "hidden"

      currentPageUrl = url
         
    } catch (error) {
      alert('Erro ao carregar as Naves Estrelares')
      console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
    const response = await fetch(currentPageUrl)
    const responseJson = await response.json()
    
    await loadCharacters(responseJson.next)

    }catch (error){
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
    const response = await fetch(currentPageUrl)
    const responseJson = await response.json()
    
    await loadCharacters(responseJson.previous)

    }catch (error){
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertCargoCapacity(cargoCapacity){
    if(cargoCapacity === "unknown") {
        return "Desconhecido"
    }
   
    return `${cargoCapacity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} t`
    
}

function convertVehiclesPassengers(vehiclesPassengers){
    if (vehiclesPassengers === "unknown"){
        return "Desconhecido"
    } 

    return vehiclesPassengers
}