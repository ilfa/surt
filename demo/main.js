$(document).ready(function() {
    var suggest = surt({
        root: '.surt',
        input: '.surt__input',
        suggest: '.surt__suggests',
        suggestItem: '.surt__suggests-item',
        clone: '.surt__clone-main',
        autocomplete: '.surt__clone-hint',
        change: function(e, data) {
            // Изменение текста
            // console.log('query', e.query);

            // console.log('data', data);

            var setData = backend(data);

            // console.log('setData', setData);

            suggest.set(setData);
        }
    });

    suggest.set({
        kit: [],
        suggest: []
    });

    function backend(data) {
        var newData = {
                kit: [],
                suggest: []
            },
            suggests = [],
            kit = data.kit;

        // Ищем ли саггесты?
        if ( data.kit[ data.kit.length - 1 ] && data.kit[ data.kit.length - 1 ].type == "text" ) {
            var q = data.kit[ data.kit.length - 1 ]["text"],
                isSuggests = true;
        }

        // Строим актуальный кит
        for (var j = 0; j < kit.length; j++) {
            for (var i = 0; i < mock.length; i++) {

                if ( kit[j].text == mock[i].text ) {
                    newData.kit[j] = mock[i];
                    break;
                } else {
                    newData.kit[j] = kit[j];
                }

            }
        }

        for (var i = 0; i < mock.length; i++) {

            // Текстовые совпадения для саггестов
            if ( isSuggests ) {
                var matchPosition = mock[i].text.indexOf(q);

                if (matchPosition + 1) {
                    var suggestRow = [];

                    for (var j = 0; j < kit.length; j++) {
                        suggestRow[j] = {
                            text: kit[j].text,
                            type: kit[j].type
                        };
                    }
                    suggestRow[kit.length] = mock[i];

                    if (matchPosition == 0) newData.suggest.unshift(suggestRow);
                    else newData.suggest.push(suggestRow);
                }
            }

        }

        return newData;
    }

    var mock = [{
        text: "Wadsworth",
        type: "rubric"
    }, {
        text: "Marshall",
        type: "rubric"
    }, {
        text: "Breinigsville",
        type: "rubric"
    }, {
        text: "Kirk",
        type: "text"
    }, {
        text: "Maury",
        type: "rubric"
    }, {
        text: "Oberlin",
        type: "text"
    }, {
        text: "Yonah",
        type: "text"
    }, {
        text: "Wintersburg",
        type: "text"
    }, {
        text: "Thermal",
        type: "rubric"
    }, {
        text: "Delshire",
        type: "text"
    }, {
        text: "Temperanceville",
        type: "filter"
    }, {
        text: "Condon",
        type: "filter"
    }, {
        text: "Taft",
        type: "filter"
    }, {
        text: "Robbins",
        type: "filter"
    }, {
        text: "Williamson",
        type: "rubric"
    }, {
        text: "Troy",
        type: "rubric"
    }, {
        text: "Bluffview",
        type: "text"
    }, {
        text: "Smeltertown",
        type: "text"
    }, {
        text: "Vandiver",
        type: "rubric"
    }, {
        text: "Gordon",
        type: "rubric"
    }, {
        text: "Bison",
        type: "rubric"
    }, {
        text: "Edmund",
        type: "text"
    }, {
        text: "Tilden",
        type: "rubric"
    }, {
        text: "Noblestown",
        type: "text"
    }, {
        text: "Hartsville/Hartley",
        type: "filter"
    }, {
        text: "Biddle",
        type: "rubric"
    }, {
        text: "Coldiron",
        type: "text"
    }, {
        text: "Choctaw",
        type: "rubric"
    }, {
        text: "Castleton",
        type: "text"
    }, {
        text: "Tonopah",
        type: "filter"
    }, {
        text: "Chalfant",
        type: "rubric"
    }, {
        text: "Robinson",
        type: "text"
    }, {
        text: "Vivian",
        type: "filter"
    }, {
        text: "Chesterfield",
        type: "rubric"
    }, {
        text: "Cressey",
        type: "filter"
    }, {
        text: "Gloucester",
        type: "rubric"
    }, {
        text: "Williams",
        type: "rubric"
    }, {
        text: "Springdale",
        type: "text"
    }, {
        text: "Vienna",
        type: "text"
    }, {
        text: "Greenbush",
        type: "filter"
    }, {
        text: "Thomasville",
        type: "text"
    }, {
        text: "Rushford",
        type: "text"
    }, {
        text: "Caberfae",
        type: "filter"
    }, {
        text: "Shepardsville",
        type: "rubric"
    }, {
        text: "Wyano",
        type: "rubric"
    }, {
        text: "Weogufka",
        type: "rubric"
    }, {
        text: "Santel",
        type: "rubric"
    }, {
        text: "Waikele",
        type: "text"
    }, {
        text: "Mammoth",
        type: "rubric"
    }, {
        text: "Callaghan",
        type: "filter"
    }, {
        text: "Brownsville",
        type: "rubric"
    }, {
        text: "Groveville",
        type: "rubric"
    }, {
        text: "Finderne",
        type: "filter"
    }, {
        text: "Fredericktown",
        type: "text"
    }, {
        text: "Hollymead",
        type: "rubric"
    }, {
        text: "Cliffside",
        type: "text"
    }, {
        text: "Sanders",
        type: "rubric"
    }, {
        text: "Topaz",
        type: "rubric"
    }, {
        text: "Fidelis",
        type: "filter"
    }, {
        text: "Logan",
        type: "filter"
    }, {
        text: "Yorklyn",
        type: "filter"
    }, {
        text: "Rote",
        type: "text"
    }, {
        text: "Chase",
        type: "filter"
    }, {
        text: "Goochland",
        type: "text"
    }, {
        text: "Nogal",
        type: "text"
    }, {
        text: "Colton",
        type: "filter"
    }, {
        text: "Kilbourne",
        type: "text"
    }, {
        text: "Graniteville",
        type: "text"
    }, {
        text: "Roeville",
        type: "filter"
    }, {
        text: "Snelling",
        type: "rubric"
    }, {
        text: "Foxworth",
        type: "filter"
    }, {
        text: "Sidman",
        type: "text"
    }, {
        text: "Swartzville",
        type: "rubric"
    }, {
        text: "Ladera",
        type: "filter"
    }, {
        text: "Berlin",
        type: "text"
    }, {
        text: "Bradenville",
        type: "text"
    }, {
        text: "Waumandee",
        type: "text"
    }, {
        text: "Nicholson",
        type: "text"
    }, {
        text: "Gila",
        type: "text"
    }, {
        text: "Orovada",
        type: "rubric"
    }, {
        text: "Maxville",
        type: "filter"
    }, {
        text: "Glasgow",
        type: "rubric"
    }, {
        text: "Starks",
        type: "rubric"
    }, {
        text: "Matthews",
        type: "rubric"
    }, {
        text: "Tedrow",
        type: "text"
    }, {
        text: "Lorraine",
        type: "rubric"
    }, {
        text: "Muir",
        type: "filter"
    }, {
        text: "Roderfield",
        type: "rubric"
    }, {
        text: "Blandburg",
        type: "filter"
    }, {
        text: "Valle",
        type: "text"
    }, {
        text: "Salunga",
        type: "filter"
    }, {
        text: "Imperial",
        type: "text"
    }, {
        text: "Emory",
        type: "filter"
    }, {
        text: "Fresno",
        type: "rubric"
    }, {
        text: "Bakersville",
        type: "rubric"
    }, {
        text: "Detroit",
        type: "text"
    }, {
        text: "Moquino",
        type: "filter"
    }, {
        text: "Beason",
        type: "filter"
    }, {
        text: "Tetherow",
        type: "text"
    }, {
        text: "Leming",
        type: "filter"
    }, {
        text: "Bawcomville",
        type: "rubric"
    }, {
        text: "Manila",
        type: "rubric"
    }, {
        text: "Zeba",
        type: "filter"
    }, {
        text: "Hoehne",
        type: "text"
    }, {
        text: "Lowell",
        type: "text"
    }, {
        text: "Martinsville",
        type: "text"
    }, {
        text: "Chesapeake",
        type: "text"
    }, {
        text: "Shelby",
        type: "filter"
    }, {
        text: "Graball",
        type: "text"
    }, {
        text: "Konterra",
        type: "rubric"
    }, {
        text: "Gouglersville",
        type: "rubric"
    }, {
        text: "Riceville",
        type: "text"
    }, {
        text: "Nutrioso",
        type: "rubric"
    }, {
        text: "Wanamie",
        type: "rubric"
    }, {
        text: "Conway",
        type: "rubric"
    }, {
        text: "Hatteras",
        type: "text"
    }, {
        text: "Brandywine",
        type: "filter"
    }, {
        text: "Kansas",
        type: "text"
    }, {
        text: "Homeworth",
        type: "rubric"
    }, {
        text: "Crawfordsville",
        type: "rubric"
    }, {
        text: "Celeryville",
        type: "text"
    }, {
        text: "Bowmansville",
        type: "text"
    }, {
        text: "Warren",
        type: "rubric"
    }, {
        text: "Savage",
        type: "filter"
    }, {
        text: "Edgar",
        type: "filter"
    }, {
        text: "Emison",
        type: "text"
    }, {
        text: "Romeville",
        type: "text"
    }, {
        text: "Brazos",
        type: "text"
    }, {
        text: "Macdona",
        type: "text"
    }, {
        text: "Westboro",
        type: "rubric"
    }, {
        text: "Mulino",
        type: "rubric"
    }, {
        text: "Glenbrook",
        type: "text"
    }, {
        text: "Bancroft",
        type: "text"
    }, {
        text: "Sperryville",
        type: "text"
    }, {
        text: "Kohatk",
        type: "text"
    }, {
        text: "Malott",
        type: "text"
    }, {
        text: "Gulf",
        type: "text"
    }, {
        text: "Vincent",
        type: "text"
    }, {
        text: "Ilchester",
        type: "filter"
    }, {
        text: "Sussex",
        type: "text"
    }, {
        text: "Madaket",
        type: "filter"
    }, {
        text: "Herlong",
        type: "text"
    }, {
        text: "Grantville",
        type: "text"
    }, {
        text: "Woodlake",
        type: "filter"
    }, {
        text: "Baden",
        type: "rubric"
    }, {
        text: "Sunnyside",
        type: "text"
    }, {
        text: "Ballico",
        type: "filter"
    }, {
        text: "Kempton",
        type: "rubric"
    }, {
        text: "Mahtowa",
        type: "text"
    }, {
        text: "Guilford",
        type: "rubric"
    }, {
        text: "Floris",
        type: "filter"
    }, {
        text: "Wilmington",
        type: "rubric"
    }, {
        text: "Wheatfields",
        type: "text"
    }, {
        text: "Gallina",
        type: "filter"
    }, {
        text: "Libertytown",
        type: "rubric"
    }, {
        text: "Brownlee",
        type: "text"
    }, {
        text: "Yardville",
        type: "rubric"
    }, {
        text: "Waukeenah",
        type: "text"
    }, {
        text: "Websterville",
        type: "rubric"
    }, {
        text: "Caspar",
        type: "text"
    }, {
        text: "Wedgewood",
        type: "text"
    }, {
        text: "Kerby",
        type: "rubric"
    }, {
        text: "Thornport",
        type: "filter"
    }, {
        text: "Greenock",
        type: "filter"
    }, {
        text: "Hardyville",
        type: "text"
    }, {
        text: "Austinburg",
        type: "rubric"
    }, {
        text: "Englevale",
        type: "filter"
    }, {
        text: "Lafferty",
        type: "rubric"
    }, {
        text: "Strong",
        type: "rubric"
    }, {
        text: "Marion",
        type: "rubric"
    }, {
        text: "Newcastle",
        type: "filter"
    }, {
        text: "Newry",
        type: "filter"
    }, {
        text: "Whitehaven",
        type: "rubric"
    }, {
        text: "Jessie",
        type: "rubric"
    }, {
        text: "Sims",
        type: "text"
    }, {
        text: "Lydia",
        type: "rubric"
    }, {
        text: "Falmouth",
        type: "text"
    }, {
        text: "Northchase",
        type: "text"
    }, {
        text: "Trona",
        type: "text"
    }, {
        text: "Rossmore",
        type: "filter"
    }, {
        text: "Chelsea",
        type: "text"
    }, {
        text: "Madrid",
        type: "filter"
    }, {
        text: "Martell",
        type: "filter"
    }, {
        text: "Stockdale",
        type: "rubric"
    }, {
        text: "Moscow",
        type: "rubric"
    }, {
        text: "Eggertsville",
        type: "text"
    }, {
        text: "Crayne",
        type: "filter"
    }, {
        text: "Caroleen",
        type: "rubric"
    }, {
        text: "Watchtower",
        type: "text"
    }, {
        text: "Woodlands",
        type: "filter"
    }, {
        text: "Stouchsburg",
        type: "filter"
    }, {
        text: "Hannasville",
        type: "text"
    }, {
        text: "Kenwood",
        type: "rubric"
    }, {
        text: "Urie",
        type: "text"
    }, {
        text: "Sena",
        type: "rubric"
    }, {
        text: "Russellville",
        type: "rubric"
    }, {
        text: "Hollins",
        type: "rubric"
    }, {
        text: "Aberdeen",
        type: "text"
    }, {
        text: "Cleary",
        type: "filter"
    }, {
        text: "Gilgo",
        type: "rubric"
    }, {
        text: "Manchester",
        type: "filter"
    }, {
        text: "Odessa",
        type: "rubric"
    }, {
        text: "Clinton",
        type: "filter"
    }, {
        text: "Turpin",
        type: "filter"
    }, {
        text: "Morgandale",
        type: "filter"
    }, {
        text: "Stevens",
        type: "text"
    }, {
        text: "Magnolia",
        type: "filter"
    }, {
        text: "Watrous",
        type: "rubric"
    }, {
        text: "Coalmont",
        type: "filter"
    }, {
        text: "Makena",
        type: "rubric"
    }, {
        text: "Adelino",
        type: "text"
    }, {
        text: "Echo",
        type: "filter"
    }, {
        text: "Gerton",
        type: "rubric"
    }, {
        text: "Chamberino",
        type: "rubric"
    }, {
        text: "Worton",
        type: "rubric"
    }, {
        text: "Cliff",
        type: "rubric"
    }, {
        text: "Allendale",
        type: "filter"
    }, {
        text: "Coaldale",
        type: "rubric"
    }, {
        text: "Gambrills",
        type: "text"
    }, {
        text: "Chicopee",
        type: "text"
    }, {
        text: "Chical",
        type: "filter"
    }, {
        text: "Harrodsburg",
        type: "rubric"
    }, {
        text: "Hall",
        type: "text"
    }, {
        text: "Carbonville",
        type: "rubric"
    }, {
        text: "Juarez",
        type: "text"
    }, {
        text: "Sultana",
        type: "filter"
    }, {
        text: "Glendale",
        type: "text"
    }, {
        text: "Townsend",
        type: "filter"
    }, {
        text: "Frizzleburg",
        type: "rubric"
    }, {
        text: "Hinsdale",
        type: "text"
    }, {
        text: "Canterwood",
        type: "filter"
    }, {
        text: "Camptown",
        type: "filter"
    }, {
        text: "Hessville",
        type: "rubric"
    }, {
        text: "Joes",
        type: "rubric"
    }, {
        text: "Ripley",
        type: "text"
    }, {
        text: "Chamizal",
        type: "text"
    }, {
        text: "Gadsden",
        type: "text"
    }, {
        text: "Smock",
        type: "text"
    }, {
        text: "Sheatown",
        type: "filter"
    }, {
        text: "Snyderville",
        type: "rubric"
    }, {
        text: "Greenwich",
        type: "filter"
    }, {
        text: "Garfield",
        type: "filter"
    }, {
        text: "Whitmer",
        type: "text"
    }, {
        text: "Noxen",
        type: "filter"
    }, {
        text: "Harold",
        type: "filter"
    }, {
        text: "Jardine",
        type: "text"
    }, {
        text: "Groton",
        type: "filter"
    }, {
        text: "Statenville",
        type: "text"
    }, {
        text: "Tilleda",
        type: "filter"
    }, {
        text: "Belleview",
        type: "filter"
    }, {
        text: "Efland",
        type: "text"
    }, {
        text: "Grapeview",
        type: "text"
    }, {
        text: "Campo",
        type: "filter"
    }, {
        text: "Golconda",
        type: "rubric"
    }, {
        text: "Matheny",
        type: "filter"
    }, {
        text: "Juntura",
        type: "rubric"
    }, {
        text: "Brandermill",
        type: "filter"
    }, {
        text: "Cashtown",
        type: "text"
    }, {
        text: "Gerber",
        type: "text"
    }, {
        text: "Glidden",
        type: "rubric"
    }, {
        text: "Titanic",
        type: "text"
    }, {
        text: "Boykin",
        type: "filter"
    }, {
        text: "Lynn",
        type: "text"
    }];
});