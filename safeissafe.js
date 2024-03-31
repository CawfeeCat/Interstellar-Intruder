let lastbob;

function loadbob(id) {

let bob = story.find(element => element.id === id);
let text = story.text;
let options = story.options;
if (bob.actions && Array.isArray(bob.actions)) {
    executeActions(bob.actions); }

    document.getElementById("output").innerHTML = text;

    let optionsString = "";
    for (let i = 0; i < options.length; i++) {
        optionsString += `<div class="option" onclick="selectOption('${id}', '${i}');">
            <p>> ${options[i].text}</p>
        </div>`;
    }

    document.getElementById("output").innerHTML = text;
    document.getElementById("input").innerHTML = optionsString;
    lastbob = id;

 }

 function loadGameover(id) {
                        
     let bob = gameovers.find(element => element.id === id);
     let text = bob.text;
                        
     document.getElementById("output").innerHTML = text;
     document.getElementById("input").innerHTML = `
     <div class="option" onclick="loadCard('${lastCard}')">
      <p>Erneut versuchen.</p>
     </div> 
     `;
 }

 function selectoption(bobId, index) {
    let bob = story.find(element => element.id === bobId);
    let optionElement = bob.options[index];

    executeActions(optionElement.actions);
}
    

function executeActions(actions) {
    actions.forEach(action => {
        const parts = action.split(' ');
        const command = parts[0];
        const parameters = parts.slice(1);

        switch (command) {
            case "load_bob":
                const bobId = parameters[0];
                loadbob(bobId);
                break;
            case "load_gameover":
                const gameoverId = parameters[0];
                loadGameover(gameoverId);
                break;
           /* case "receive":
                inventory[parameters[0]].value += parseInt(parameters[1]);
                displayInventory(); */
                break;
         /*   case "image":
                document.getElementById("image").style.backgroundImage = `url(media/${parameters[0]})`; */
                break;
            default:
                console.warn(`Unrecognized command: ${command}`);
        }
    });
}

loadbob("010");

///story
let story = [

{
    "id" : " 010 ",
    "text": " Du stehst auf einer schmalen Plattform, die als Startrampe für das Raumschiff dient. Um dich herum herrscht Hektik, während die restlichen wohlhabende Überlebenden an Bord gehen. Du bist jedoch keine wohlhabende Person und dein Aufenthalt an Bord dieses Schiffes wäre höchst illegal. Dennoch spürst du einen Drang auf der Erde zu bleiben und zu kämpfen. Die Zeit ist knapp und der Countdown zum Abflug läuft ... ",
   // "actions" : [ ],
    "options": [
  
              {
               "text": "Soll ich hier bleiben und kämpfen?",
               "actions": ["load_gameover 01"],
               },
              {
               "text": "Soll ich mich lieber am Raumschiff verstecken und mit den reichen fliehen?",
               "actions": ["load_story 020" ],
               },
  
              ]
},
{
    "id" : " 020 ",
    "text": "Du entscheidest dich, auf dem Schiff zu verstecken, um zu überleben. Jedoch gibt es hier überall Sicherheitskameras die alles überwachen und du kannst dich nicht frei bewegen, da du hier keinen Zugang hast. Trotzdem würdest du vorerst überleben...",
   // "actions" : [ ],
    "options": [
  
              {
               "text": " Ich verstecke mich im Gepäcklager, da sind keine Kameras und das checkt nie wer... ",
               "actions": ["load_story 031 "],
               },
              {
               "text": " Ich tu so als ob ich dazugehöre und gehe einfach durch, einfach nichts anmerken lassen... ",
               "actions": ["load_story 032 "],
               },
  
              ]
  
  },
  {
    "id" : " 031 ",
    "text": " Du entscheidest dich, in das Gepäcklager zu flüchten. Dort hältst du dich versteckt und hoffst, dass dich niemand bemerkt. - Da HatS WoHl eIneR LieGEN LasSEn!!! ",
   // "actions" : [ ],
    "options": [
  
              {
               "text": " weiter ",
               "actions": ["load_story 040 "],
               },

              ]
  
  },
  {
    "id" : " 032 ",
    "text": " Du entscheidest dich, mutig durch das Schiff zu schleichen und winkst der Sicherheitskamera zu. Trotzdem befindest du dich in einer gefährlichen Situation, da die Sicherheit des Schiffes hoch ist. Dennoch hast du es geschafft und ein sicheres Versteck gefunden. - ",
   // "actions" : [ ],
    "options": [
  
              {
               "text": " weiter ",
               "actions": ["load_story 040 "],
               },
  
              ]
  
  },
  {
    "id" : " 040 ",
    "text": " Du merkst, dass du hungrig und durstig wirst. Deine Vorräte sind begrenzt und du wirst gezwungen, das Schiff nach Lebensmitteln zu durchsuchen. Du musst leise und vorsichtig vorgehen um nicht entdeckt zu werden... ",
  //  "actions" : [ ],
    "options": [
  
              {
               "text": " weiter ",
               "actions": ["load_demo 00 "],
               },
  
              ]
  },
];

// Game Overs
let gameover = [

    {
        "id" : " 01 ",
        "text": " Leider wirst du von einem Nephren-ka getötet. Dein Mut hatte einen hohen Preis. ",
      //  "actions" : [ ],
        "options": [
      
                  {
                   "text": " zurück ",
                   "actions": ["load_story 010 "],
                   },
               
                  ]
      },

                ];

// Demo
let demo = [

    {
        "id" : " 00 ",
        "text": " du verhungerst einfach lmao ",
      //  "actions" : [ ],
        "options": [
      
                  {
                   "text": " go back ",
                   "actions": ["load_story 010"],
                   },
      
                  ]
      
      },

]



/*  Sample------------------------------------------------------------------------->
let sample = [

{
  "id" : " - ",
  "text": " - ",
  "actions" : [ ],
  "options": [

            {
             "text": " - ",
             "actions": ["load_sample * "],
             },
            {
             "text": " - ",
             "actions": ["load_sample * "],
             },

            ]

},

         ] ; 
<------------------------------------------------------------------------ sample */
               






//the other one


// Story -----------------------------------------------------------------

const textArray = [

    {
        id: "010",
        text: "Du stehst auf einer schmalen Plattform, die als Startrampe für das Raumschiff dient. Um dich herum herrscht Hektik, während die restlichen wohlhabende Überlebenden an Bord gehen. Du bist jedoch keine wohlhabende Person und dein Aufenthalt an Bord dieses Schiffes wäre höchst illegal. Dennoch spürst du einen Drang auf der Erde zu bleiben und zu kämpfen. Die Zeit ist knapp und der Countdown zum Abflug läuft ...",
        options: [
            {
                text: "Soll ich hier bleiben und kämpfen?",
                nextText: "gameover01",
            },
            {
                text: "Soll ich mich lieber am Raumschiff verstecken und mit den reichen fliehen?",
                nextText: "020",
            },
        ],
    },
    
    ];
    
    //Demo
    /*
    const textArray = [
    
        {
            id: "00",
            text: "texting",
            options: [
                {
                    text: "texting",
                    nextText: "00",
                },
                {
                    text: "texting",
                    nextText: "00",
                },
            ],
        },
        
        ];
        */


        // Object.defineProperty(deathElement, "deathmsg");

            //deathElement.innerText = textNode.deathmsg
            //Object.defineProperty(deathElement, "deathmsg");