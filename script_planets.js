let currentPageUrl = 'https://swapi.dev/api/planets/'

window.onload = async () => {
    try {
      await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        // alert('Erro ao carregar cards!');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; //limpar os resultados anteriores

    try{

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach(async (planets) => {
            const card = document.createElement("div")

            const planetImages = {
                "Tatooine": "https://vignette.wikia.nocookie.net/ru.starwars/images/7/7e/Tatooine_EotECR.png/revision/latest/scale-to-width-down/480?cb=20180110135447",
                "Stewjon" : "https://holopedia.de/thumb.php?f=PlanetStewjon.jpg&width=250",
                "Corellia": "https://i.pinimg.com/originals/3d/0e/b6/3d0eb68fb2b6d4665bc9ff076bcaebd3.png",
                "Rodia": "https://vignette.wikia.nocookie.net/es.starwars/images/c/c3/Rodia_canon.png/revision/latest?cb=20160814195410",
                "Nal Hutta": "https://th.bing.com/th/id/OIP.aHmGSMZBjITlvmy4CJybrwHaD9?rs=1&pid=ImgDetMain",
                "Dantooine": "https://vignette.wikia.nocookie.net/es.starwars/images/a/a5/Dantooine_Resistance.jpg/revision/latest?cb=20200120203120",
                "Bestine IV": "https://vignette.wikia.nocookie.net/starwars/images/7/79/Bestine_TEA.png/revision/latest/scale-to-width-down/499?cb=20180325210122",
                "Ord Mantell": "https://th.bing.com/th/id/OIP.dnju1J6IQBO-jJJrcBAfXgHaHa?rs=1&pid=ImgDetMain",
                "Trandosha": "https://th.bing.com/th/id/R.4a646ece52d99afc7695946f36f2c302?rik=tf8Z4DbLFBn0gg&riu=http%3a%2f%2fvignette2.wikia.nocookie.net%2fes.starwars%2fimages%2f9%2f9b%2fTrandosha_NEGAS.jpg%2frevision%2flatest%3fcb%3d20070204210753&ehk=RoYLsZQPsX8feYgjjzIVX%2bFiqtv5glTA%2fSwAnFyzmSo%3d&risl=&pid=ImgRaw&r=0",
                "Socorro": "https://i.pinimg.com/originals/f1/14/1c/f1141c8ff7477de0a69aa35fb899bc6a.jpg",
                "Mon Cala": "https://th.bing.com/th/id/R.13e973ac6299ea33ae3b433d88da8f2e?rik=iGRf94172Nj8hw&pid=ImgRaw&r=0",
                "Chandrila": "https://th.bing.com/th/id/R.1765f335d1188f9bd7d8e6770de5a1f2?rik=zSIIjuEzlwgVEw&pid=ImgRaw&r=0",
                "Sullust": "https://th.bing.com/th/id/R.d38ffa19900749718868869688e0bfa4?rik=s6fs8XawKZ5A3Q&pid=ImgRaw&r=0",
                "Toydaria": "https://th.bing.com/th/id/R.b314aae282fbed20e8d7a6ec3416b0aa?rik=9EjpABZgkdpMfg&riu=http%3a%2f%2fvignette2.wikia.nocookie.net%2fstarwars%2fimages%2fb%2fba%2fToydaria_LoNH.png%2frevision%2flatest%3fcb%3d20160830004608&ehk=bRNi%2b75JHo9mqMYjh532Li2JIBOgNIse4IUY%2fD0Q%2bA8%3d&risl=&pid=ImgRaw&r=0",
                "Malastare": "https://vignette.wikia.nocookie.net/jedipedia/images/d/de/Malastare.jpg/revision/latest?cb=20070319134020&path-prefix=de",
                "Dathomir": "https://th.bing.com/th/id/R.2dd1bc19124c4e0b430ebeba6a4c050e?rik=9F00%2bkb3xcmV5g&pid=ImgRaw&r=0",
                "Ryloth": "https://th.bing.com/th/id/OIP.F2n3xkk_6XzZF49RCJUH7AHaHa?rs=1&pid=ImgDetMain",
                "Aleen Minor": "https://vignette.wikia.nocookie.net/jedipedia/images/4/42/Aleen.png/revision/latest?cb=20130406153923&path-prefix=de",
                "Vulpter": "https://th.bing.com/th/id/R.e8d67f9f2d12db651df359a72e24613e?rik=OFMUR4OkPsEndg&pid=ImgRaw&r=0",
                "Troiken": "https://th.bing.com/th/id/OIP.K07TnJtzREQsQMFldryjjAAAAA?rs=1&pid=ImgDetMain",
                "Tund": "https://th.bing.com/th/id/OIP.7XrJ008_xNXUy5txIf83zAHaHa?rs=1&pid=ImgDetMain",
                "Haruun Kal": "https://vignette.wikia.nocookie.net/starwarsofthecaribbean/images/6/6f/Jungle_Planet_Resource.jpg/revision/latest?cb=20120309222948",
                "Cerea": "https://th.bing.com/th/id/R.82b8634a8f3176ceff63c95a69ec1fda?rik=1EnO7j3wVvZhbA&riu=http%3a%2f%2fimg4.wikia.nocookie.net%2f__cb20090712183513%2fstarwars%2fimages%2fd%2fdf%2fCerea_NEGAS.jpg&ehk=6py0PKdN9RCZ8sffT%2fkwKqcOpBzAVoc0dll17uBsYLE%3d&risl=&pid=ImgRaw&r=0",
                "Glee Anselm": "https://th.bing.com/th/id/R.7c8f437a6c7d58d6cf66f95288352e02?rik=b4IbLnLL209L2A&pid=ImgRaw&r=0",
                "Iridonia": "https://vignette.wikia.nocookie.net/fr.starwars/images/c/c5/Iridonia.jpg/revision/latest?cb=20150614075656",
                "Tholoth": "https://th.bing.com/th/id/OIP.bwbKMDPfKF4xGlHdjXpiBgAAAA?rs=1&pid=ImgDetMain",
                "Iktotch": "https://th.bing.com/th/id/OIP.s8TTrRzkQ92PQDJ6bq4qNQHaHa?rs=1&pid=ImgDetMain",
                "Quermia": "https://vignette.wikia.nocookie.net/starwars/images/2/29/Quermia_NEGAS.jpg/revision/latest?cb=20070701083603",
                "Dorin": "https://th.bing.com/th/id/OIP.yya8kNsNBl9Qo8fPxSD42wAAAA?rs=1&pid=ImgDetMain",
                "Champala": "https://th.bing.com/th/id/R.84ee5112677e432edec1e7c9951b2f43?rik=3lPf48DGML6wMg&riu=http%3a%2f%2fstatic2.wikia.nocookie.net%2f__cb20061114221733%2fstarwars%2fimages%2fd%2fd7%2fChampala_NEGAS.jpg&ehk=X7svOIWJc%2fvxXGB7Vu8iqyxgIz2Jtb0je8h8wFXMyRU%3d&risl=&pid=ImgRaw&r=0",
                "Mirial": "https://vignette.wikia.nocookie.net/star-wars-pathfinder/images/e/e0/Mirial.jpg/revision/latest?cb=20170612022003",
                "Serenno": "https://th.bing.com/th/id/OIP.Py4G1QY69hrk6alNl8VOQwAAAA?rs=1&pid=ImgDetMain",
                "Concord Dawn": "https://th.bing.com/th/id/OIP.3TcFH7MXCA7RnFLWOVpkXgHaHa?rs=1&pid=ImgDetMain",
                "Zolan": "https://th.bing.com/th/id/R.dc0a9081057ded954a21e22be199a548?rik=ss%2fgpU48grQ7FA&riu=http%3a%2f%2fimages2.wikia.nocookie.net%2f__cb20070701111502%2fstarwars%2fimages%2f6%2f66%2fZolan.jpg&ehk=MbteSCCgBP0wFSJ330saXsOyTMuPiV%2fHt8QAPzGumuw%3d&risl=&pid=ImgRaw&r=0",
                "Ojom": "https://vignette.wikia.nocookie.net/jedipedia/images/9/9f/Ojom.jpg/revision/latest?cb=20131229103853&path-prefix=de",
                "Skako": "https://vignette.wikia.nocookie.net/starwars/images/c/cd/Skako.jpg/revision/latest?cb=20090821171533&path-prefix=nl",
                "Muunilinst": "https://th.bing.com/th/id/R.95c7902b661f648b2c32807ada0110f1?rik=6Yqkgkf1a7giWA&riu=http%3a%2f%2fimg3.wikia.nocookie.net%2f__cb20071221131608%2fstarwars%2fimages%2f1%2f19%2fMuunilinst.jpg&ehk=N6ObZDZvJEtjXNOL1FFFpHLZHh0tYWlcdFCxNho%2bbI8%3d&risl=&pid=ImgRaw&r=0",
                "Shili": "https://vignette.wikia.nocookie.net/fr.starwars/images/6/65/Shili.jpg/revision/latest?cb=20150220150519",
                "Kalee": "https://vignette2.wikia.nocookie.net/es.starwars/images/0/08/KaleePlanet.jpg/revision/latest?cb=20070910164336",
                "Umbara": "https://th.bing.com/th/id/R.92f8faebde13946cc0e89904b4082f0a?rik=x9JRGpLdb0UNgg&riu=http%3a%2f%2fimg1.wikia.nocookie.net%2f__cb20110524153303%2fstarwars%2fnl%2fimages%2fthumb%2f9%2f94%2fUmbara.jpg%2f500px-Umbara.jpg&ehk=TaGAaDyNlVaGP5iwyV1D%2fZ62lCUfKet6nZo7X5fBlNw%3d&risl=&pid=ImgRaw&r=0"
            };

            let urlImg = planetImages[planets.name] || `https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg`;
           
            card.style.backgroundImage = `url('${urlImg}')`
            card.className = "cards"

            const planetsNameBG = document.createElement("div")
            planetsNameBG.className = "character-name-bg"

            const planetsName = document.createElement("span")
            planetsName.className = "character-name"
            planetsName.innerText = `${planets.name}`

            planetsNameBG.appendChild(planetsName)
            card.appendChild(planetsNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const planetsImage = document.createElement("div")
                
                planetsImage.style.backgroundImage = `url('${urlImg}')`
                planetsImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${planets.name}`

                const diameter = document.createElement("span")
                diameter.className = "character-details"
                diameter.innerText = `Diâmetro: ${convertDiameter(planets.diameter)}`

                const climate = document.createElement("span")
                climate.className = "character-details"
                climate.innerText = `Clima: ${convertClimate(planets.climate)}`

                const population = document.createElement("span")
                population.className = "character-details"
                population.innerText = `População: ${convertPopulation(planets.population)}`

                const terrain = document.createElement("span")
                terrain.className = "character-details"
                terrain.innerText = `Terreno: ${convertTerrain(planets.terrain)}`
                
                modalContent.appendChild(planetsImage)
                modalContent.appendChild(name)
                modalContent.appendChild(diameter)
                modalContent.appendChild(climate)
                modalContent.appendChild(population)
                modalContent.appendChild(terrain)
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
        alert('Erro ao carregar os planetas');
        console.log(error);
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch(error) {
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

    } catch(error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertClimate(climate) {
    const clima = {

        "artificial temperate " : "Temperado artificial",
        temperate: "Temperado",
        "temperate, tropical": "temperado, tropical",
        tropical: "Tropical",
        arid: "Árido",
        frozen: "Congelado",
        murky: "Obscuro",
        "temperate, arid": "temperado, arido",
        "temperate, arid, windy": "temperado, arido, ventoso",
        windy: "Ventoso",
        hot: "Quente",
        frigid: "Frio",
        "hot, humid": "quente, umido",
        "temperate, moist": "temperado, umido",
        humid: "Úmido",
        moist: "Molhado",
        polluted: "Poluído",
        superheated: "Superaquecido",
        subartic: "Subártico",
        artic: "Ártico",
        rocky: "Rochoso",
        unknown: "Desconhecido",
        "arid, temperate, tropical": "arido, temperado, tropical",
        "temperate, arid, subartic": "temperado, arido, subártico",
        "temperate, artic": "temperado, artico",
        "tropical, temperate": "tropical, temperado",
        "arid, rocky, windy": "arido, rochoso, ventoso"
    };

    return clima[climate] || climate;
}

function convertTerrain(terrain){
    const terreno ={

        desert: "Deserto",
        "grasslands, mountains": "Pastagens, Montanhas",
        "jungle, rainforests": "Selva, Florestas Tropicais",
        "tundra, ice caves, mountain ranges": "Tundra, Cavernas de gelo, Serras",
        "swamp, jungles": "Pântano, Selvas",
        "gas giant": "Gás gigante",
        "forests, mountains, lakes": "Florestas, Montanhas, Lagos",
        "grassy hills, swamps, forests, mountains": "Colinas gramadas, Pântanos, Florestas, Montanhas",
        "cityscape, mountains": "Paisagem urbana, Montanhas",
        ocean: "oceano",
        "rock, desert, mountain, barren": "Rocha, Deserto, Montanha, Árido",
        "scrublands, savanna, canyons, sinkholes": "Matagais, Savanas, Desfiladeiros, Crateras",
        "volcanoes, lava rivers, mountains, caves": "Vulcões, Rios de lava, Montanhas, Cavernas",
        "jungle, forests, lakes, rivers": "Selva, Florestas, Lagos, Rios",
        "airless asteroid": "Asteroide sem ar",
        "glaciers, mountains, ice canyons": "Geleiras, Montanhas, Desfiladeiros de gelo",
        "fungus forests": "Florestas de fungos",
        "mountains, fields, forests, rock arches": "Montanhas, Campos, Florestas, Arcos rochosos",
        "caves, desert, mountains, volcanoes": "Cavernas, Deserto, Montanhas, Vulcões",
        grass:  "Grama",
        cityscape: "Paisagem urbana",
        "plains, urban, hills, forests": "Planícies, Urbano, Colinas, Florestas",
        "jungles, oceans, urban, swamps": "Selvas, Oceanos, Urbano, Pântanos",
        "urban, oceans, swamps, bogs": "Urbano, Oceanos, Pântanos, Brejos",
        "oceans, savannas, mountains, grasslands": "Oceanos, Savanas, Montanhas, Pastagens",
        "rocky islands, oceans": "Ilhas rochosas, Oceanos",
        "plains, seas, mesas": "Planicies, Mares, Mesas",
        unknown: "Desconhecido",
        "mountains, seas, grasslands, deserts": "Montanhas, Mares, Pastagens, Desertos",
        "deserts, mountains": "Desertos, Montanhas",
        "oceans, reefs, islands": "Oceanos, Recifes, Ilhas",
        "plains, forests":  "Planícies, Florestas",
        "mountains, volcanoes, rocky deserts": "Montanhas, Vulcões, Desertos rochosos",
        "swamps, lakes": "Pântanos, Lagos",
        "swamps, deserts, jungles, mountains": "Pântanos, Desertos, Selvas, Montanhas",
        "forests, deserts, savannas": "Florestas, Desertos, Savanas",
        "mountains, valleys, deserts, tundra": "Montanhas, Vales, Desertos, Tundra",
        "urban, barren":"Urbano, Árido",
        "desert, tundra, rainforests, mountains": "Deserto, Tundra, Florestas tropicais, Montanhas",
        "barren, ash": "Infértil, Fumaça e cinzas",
        "toxic cloudsea, plateaus, volcanoes": "Mar nublado tóxico, Planaltos, Vulcões",
        verdant: "Verdejante",
        "lakes, islands, swamps, seas": "Lagos, Ilhas, Pântanos, Mares",
        "rocky canyons, acid pools": "Desfiladeiros rochosos, Piscinas ácidas",
        rocky: "Rochoso",
        "oceans, rainforests, plateaus": "Oceanos, Florestas tropicais, Planaltos",
        deserts: "Desertos",
        "rainforests, rivers, mountains": "Florestas tropicais, Rios, Montanhas",
        "jungles, forests, deserts": "Selvas, Florestas, Desertos",
        "oceans, glaciers": "Oceanos, Geleiras",
        "urban, vines": "Urbano, Vinhas",
        "plains, forests, hills, mountains": "Planicies, Florestas, Colinas, Montanhas",
        "cities, savannahs, seas, plains": "Cidades, Savanas, Mares, Planicies",
        "rainforests, cliffs, canyons, seas": "Florestas tropicais, Penhascos, Desfiladeiros, Mares"

    };

    return terreno[terrain] || terrain;
}

function convertPopulation(population){
    if (population === "unknown") {
        return "Desconhecida"
    }

    return population
}

function convertDiameter(diameter){
    if (diameter === "unknown" || diameter === "0"){
        return "Desconhecido"
    } 

    return diameter
}


