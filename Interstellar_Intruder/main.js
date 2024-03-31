const textElement = document.getElementById("text")

//const death = document.getElementById("deathmsg")

const optionButtonsElement = document.getElementById("option-buttons")

//visual related functions----------------------------------

/* function lightmode() {
   const element = document.body;
   element.classList.toggle("dark-mode") 
} */

function lightmode() {
    const element = document.body;
    element.classList.toggle("dark-mode") 
}




//visual related functions----------------------------------

//gameplay related functions-------------------------------

let state = {}
//dis one for the weapon and previous choices btw


function startGame() {

    state = {}
    showTextNode("titel")

}

let currentCountdown = null;
function countdown(time, targetNode) {
    currentCountdown = setTimeout(() => {
        showTextNode(targetNode);
    }, time * 1000);
};

function timestop() {
    clearTimeout(currentCountdown);
}


// story cards --------------------------------------

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

    textElement.innerText = textNode.text

    document.getElementById("video").style.backgroundColor = textNode.colors
  // document.body.style.backgroundColor = textNode.colors

    if (textNode.hasOwnProperty("video")) {
        document.getElementById("video").innerHTML = `
        <video autoplay muted>
            <source src="Media/${textNode.video}" type="video/mp4" alt="Begleitendes Bildelement">
        </video> `; 
    }

    if (textNode.hasOwnProperty("loop")) {
        document.getElementById("video").innerHTML = `
        <video loop autoplay muted>
            <source src="Media/${textNode.loop}" type="video/mp4" alt="Begleitendes Bildelement">
        </video> `; 
    }


    if (textNode.hasOwnProperty("image")) {
        document.getElementById("video").innerHTML = `
        <img source src= "Media/${textNode.image}" type="image/jpg" alt="Begleitendes Bildelement"> 
         
        </img>`;
    } 

   /* document.getElementById("video").innerHTML = `
    <video autoplay muted>
        <source src="Media/${textNode.video}" type="video/mp4">
    </video> ` */

   /* document.getElementById("video").innerHTML = `
    <video autoplay loop muted>
        <source src="Media/${textNode.loop}" type="video/mp4">
    </video> `; */

   

    if (textNode.hasOwnProperty("countdown")) {
        countdown(textNode.countdown.time, textNode.countdown.targetNode);
    }

    if (textNode.hasOwnProperty("stop")) {
        timestop(textNode.stop);
    }


   while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
   }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button")
            button.innerText = option.text
            button.classList.add("btn")
            button.addEventListener("click", () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    } )

    textNodes.options.sort(() => Math.random());
  
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}



function selectOption(option) {
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)

}


/* function shuffleOption(options) {
    options.sort(() => (Math.random() > .5) ? 1 : -1);
} */

//story stuff ------------------------------------------

// 0000

const textNodes = [
    {
        id: "0000",
        colors: "#f0e1be",
        loop: "anfang.mp4",
        text: "Die Welt befindet sich im Krieg. Monster sind auf die Erde gekommen und die Menschheit kämpft verzweifelt gegen diese Kreaturen. Diese grausamen, gefürchteten, außerirdische Wesen sind gnadenlos und gefährlich. Eines Tages, als die Lage auf der Erde immer aussichtsloser wird, erhältst du die Chance, zu fliehen ...Deine Entscheidungen werden den Verlauf dieser gefährlichen Reise beeinflussen. Dein Ziel ist es, zu überleben. Viel Glück, Überlebender.",
        options: [
            {
                text: "Weiter.",
                setState: { },
                nextText: "1010",

            },
        ],
    },

//1000

    {
        id: "1010",
        colors: "##efd8b3",
        video: "abfahrt.mp4",
        text: "Du stehst auf einer schmalen Plattform, die als Startrampe für das Raumschiff dient. Um dich herum herrscht Hektik, während die restlichen wohlhabenden Überlebenden an Bord gehen. Du bist jedoch keine reiche/begüterte Person und dein Aufenthalt an Bord dieses Schiffes wäre höchst illegal. Dennoch spürst du einen Drang, auf der Erde zu bleiben und zu kämpfen. Die Zeit ist knapp und der Countdown zum Abflug läuft ...",
        countdown: {
            time: 30,
            targetNode: "go01",
        },
        options: [
            {
                text: "Am Raumschiff verstecken und mit den Reichen fliehen...",
              
                nextText: "1020",
            },
        {
            text: "Hier bleiben und kämpfen...",
            
            nextText: "go01",
            
        },
      
       ]
    },

    {
        id: "1020",
        stop,
        colors: "#838282",
        image: "gang1.jpg",
        text: "Du entscheidest dich, dich kurzfristig auf dem Schiff hinter einer fluchtkapsel zu verstecken, um zu überleben. Jedoch gibt es hier überall Sicherheitskameras, die alles überwachen, und du kannst dich nicht frei bewegen, da du hier keinen Zugang hast. Trotzdem würdest du vorerst überleben...",
        options: [
            {
                text: "Weiter im Gepäcklager verstecken (da sind keine Kameras)...",
                nextText: "1031",
            },
            {
                text: "So tun, als ob man dazugehört...",
                setState: {noweapon: true},
                nextText: "1032",
            }
        ]
    },
    {
        id: "1031",
        colors: "#838282",
        image: "gepäcklager.jpg",
        text: " Du entscheidest dich, weiter in das Gepäcklager zu flüchten. Dort hältst du dich versteckt und hoffst, dass dich niemand bemerkt.",
        options: [
            {
                text: "Weiter.",
              
                nextText: "1040",

            },
        ]
    },
    {
        id: "1032",
        colors: "#838282",
        text: "Du entscheidest dich, mutig durch das Schiff zu schleichen, und winkst der Überwachungskamera zu. Trotzdem befindest du dich in einer gefährlichen Situation, da die Sicherheit des Schiffes hoch ist. Dennoch hast du es geschafft und ein sicheres Versteck gefunden.",
        options: [
            {
                text: "Weiter.",
             
                nextText: "1060",

            },
        ]
    },
    {
        id: "1040",
        colors: "#dac59d",
        image: "waffe.jpg",
        text: "Während du darauf wartest, bis die Luft rein ist, fällt dir etwas auf den Kopf. Du schaust auf das Objekt, welches jetzt vor dir liegt. Es scheint eine Schusswaffe zu sein, die jemand hier rein geschmuggelt haben muss",
        options: [
            {
                text: "Die Schusswaffe nehmen..?",
                setState: {weapon:true },
                nextText: "1051",

            },
            {
                text: "Die Schusswaffe nicht nehmen...",
                setState: {noweapon:true},
                nextText: "1052",

            },
        ]
    },
    {
        id: "1051",
        colors: "#dac59d",
        text: "Du nimmst die Waffe. Sie scheint nicht schwer zu bedienen zu sein und im Fall der Fälle kannst du dich dann damit selbst verteidigen",
        options: [
            {
                text: "Weiter.",
             
                nextText: "1060",

            },
        ]
    },
    {
        id: "1052",
        colors: "#dac59d",
        text: "(Damit will ich nichts zu tun haben) Du bist selbst schon illegal an Bord, wenn du bewaffnet bist könnte es noch schlechter für dich ausgehen. Du nimmst die Waffe nicht.",
        options: [
            {
                text: "Weiter.",
            
                nextText: "1060",

            },
        ]
    },
    {
        id: "1060",
        colors: "#e79b6f",
        image: "gang1.jpg",
        text: "Du merkst, dass du hungrig und durstig wirst. Deine Vorräte sind begrenzt und du wirst gezwungen, das Schiff nach Lebensmitteln zu durchsuchen. Zum Glück liegt bei der Tür eine Karte des Schiffs. Du nimmst sie um zurecht zu finden. Vergesse nicht, leise und vorsichtig vorgehen, um nicht entdeckt zu werden...",
        options: [
            {
                text: "Weiter.",
                setState: { },
                nextText: "2010",

            },
        ]
    },

//2000

{
    id: "2010",
    colors: "#8e827d",
    image: "gang1.jpg",
    text: "Unauffällig bewegst du dich durch die Gänge, jedoch kommen dir immer wieder Menschen entgegen. Du überlegst, ob du auf den nächsten Vorbeikommenden zugehen solltest, um sich diesem anzuvertrauen, oder ob du dich weiter unauffällig verhalten sollst.",
    options: [
        {
            text: "Dich weiterhin unauffällig verhalten...",
          
            nextText: "2020",

        },
        {
            text: "Auf den nächsten Vorbeikommenden zugehen und dich ihm anvertrauen...",
           
            nextText: "go02",

        },
      
    ]
},
{
    id: "2020",
    colors: "#40627a",
    image: "türen.jpg",
    text: "Du hast dich dazu entschieden weiterzugehen. Am Ende des Ganges erscheinen einige Räume, davon jeweils links und rechts von dir ein beschrifteter Raum. Auf dem einen steht Küche und auf dem anderen Labor. Du entscheidest dich nach kurzem Überlegen, einen von den vielen Räumen zu durchsuchen.",
    options: [
        {
            text: "Das Labor erkunden...",
           
            nextText: "go03",

        },
        {
            text: "Die Küche erkunden...",
            setState: {kitchen:true},
            nextText: "2030",

        },
        {
            text: "Einen unbeschrifteten Raum betreten...",
            setState: {nokitchen:true},
            nextText: "2040",

        },
    ]
},
{
    id: "2030",
    colors: "#d15b36",
    image: "kücheorange.jpg",
    text: "Du begibst dich in die Küche, in der Hoffnung etwas zu essen zu finden und du hast Glück, du findest Essen ohne Ende! Du stopfst dir den Magen und deine Taschen voll, doch als du zum Steak greifen willst, entdeckst du riesige tiefe Kratzspuren, dein Herz fängt an zu rasen, von wem könnten die wohl sein? du bekommst Panik und läufst, ohne nachzudenken wieder auf den Gang schon nach ein paar Meter entdeckst du eine dritte Tür, ohne nachzudenken öffnest du sie und läufst hinein, mit einem lauten Knall fällt die Tür hinter dir zu.",
    options: [
        {
            text: "Weiter.",
          
            nextText: "2040",

        },
    ]
},
{
    id: "2040",
    colors: "d15b36",
    image: "keycard.jpg",
    text: "In dem Raum ist es stockdunkel, du tastest dich an der Wand entlang, bis du einen Lichtschalter findest. Das Licht geht an und du traust deinen Augen nicht, du bist in der Kajüte des Kapitäns und direkt vor dir mitten auf dem Schreibtisch liegt eine Keycard!",
    options: [
        {
            text: "Keycard nehmen...",
            requiredState: (currentState) => currentState.kitchen,
            setState: {key:true, kitchen:true, },
            nextText: "2051",

        },
        {
            text: "Keycard nicht nehmen...",
            requiredState: (currentState) => currentState.kitchen,
            setState: {nokey:true, kitchen:true, },
            nextText: "2052",

        }, 
        {
            text: "Keycard nehmen...",
            requiredState: (currentState) => currentState.nokitchen,
            setState: {key:true, nokitchen:true, },
            nextText: "2051",

        },
        {
            text: "Keycard nicht nehmen...",
            requiredState: (currentState) => currentState.nokitchen,
            setState: {nokey:true, nokitchen:true, },
            nextText: "2052",

        }, 
    ]
},
{
    id: "2051",
    colors: "#c44829",
    text: "Du nimmst die Keycard, sie könnte noch nützlich werden!",
    options: [
        {
            text: "Weiter.",
            requiredState: (currentState) => currentState.kitchen,
           
            nextText: "3011",

        },
        {
            text: "Weiter.",
            requiredState: (currentState) => currentState.nokitchen,
           
            nextText: "3012",

        },
    ]
},
{
    id: "2052",
    colors: "#c44829",
    text: "Vielleicht wirst du entdeckt. Du lässt die Keycard liegen.",
    options: [
        {
            text: "Weiter.",
            requiredState: (currentState) => currentState.kitchen,
           
            nextText: "3011",

        },
        {
            text: "Weiter.",
            requiredState: (currentState) => currentState.nokitchen,
          
            nextText: "3012",

        },
    ]
},


//3000

{
    id: "3011",
    colors: "#b4361d",
    image: "gang2.jpg",
    text: "Du verlässt die Kajüte wieder. Denn immerhin kannst du nicht mehr auf diesem Schiff bleiben. Nein, du musst sofort hier weg. Du siehst dich um, doch dich beschleicht ein unangenehmes Gefühl. Du bist nicht alleine. Du gehst vorsichtig den Gang runter, stockst aber. Im Schatten bewegt sich etwas.",
    options: [
        {
            text: "Gehe in den nächstbesten Raum...",
        
            nextText: "3020",

        },
        {
            text: "“SheeeeeSh!”",
           
            nextText: "go04",

        },
        {
            text: "Nähere dich dem Wesen um es zu streicheln...",
          
            nextText: "go05",

        },
       
    ]
},
{
    id: "3012",
    colors: "#b4361d",
    image: "gang2.jpg",
    text: "Du verlässt die Kajüte wieder. Zurück im Gang siehst dich etwas um, doch dich beschleicht ein unangenehmes Gefühl. Du bist nicht alleine. Du gehst vorsichtig den Gang runter, stockst aber. Im Schatten bewegt sich etwas.",
    options: [
        {
            text: "Gehe in den nächstbesten Raum...",
        
            nextText: "3020",

        },
        {
            text: "“SheeeeeSh!”",
           
            nextText: "go04",

        },
        {
            text: "Nähere dich dem Wesen um es zu streicheln...",
          
            nextText: "go05",

        },
      
    ]
},
{
    id: "3020",
    colors: "#ad321a",
    text: "Mehr oder weniger geschickt schlüpfst du durch die nächste Tür und findest dich in der Schiffskantine wieder. Du siehst dich wieder um. Alles hier drinnen ist verwüstet. Du zuckst auf. Es sind Schritte von draußen zu hören und sie werden lauter.",
    countdown: {
        time: 20,
        targetNode: "go06",
    },
    options: [
       
        {
            text: "Verstecke dich in einem der Spinde...",
           
            nextText: "3032",

        },
        {
            text: "Verstecke dich hinter der Tür...",
           
            nextText: "3033",

        },
        {
            text: "Verstecke dich unter einem Tisch...",
            
            nextText: "3031",

        },
    ]
},
{
    id: "3031",
    stop,
    colors: "#9c2c17",
    image: "steakambodn.jpg",
    text: "Schnell schlitterst du unter den Tisch, direkt gegen ein Steak, das da am Boden liegt. Du schaust es an, eigentlich bist du ja noch hungrig.",
    options: [
        {
            text: "Esse das Steak...",
            
            nextText: "go07",

        },
        {
            text: "Esse das Steak nicht...",
            nextText: "go08",

        },
    ]
},
{
    id: "3032",
    stop,
    colors: "#9c2c17",
    text: "Auf der anderen Seite des Raumes stehen große Spinde. Du läufst hinüber, steigst in einen hinein und schließt die Tür. Gerade noch rechtzeitig, kurz darauf kommt eine wütende Kreatur hinein.",
    options: [
        {
            text: "Weiter.",

            nextText: "3040",

        },
    ]
},
{
    id: "3033",
    stop,
    colors: "#9c2c17",
    text: "Ohne groß nachzudenken, rennst du zu der Tür und stellst dich neben den Türflügel. Gerade noch rechtzeitig, kurz darauf kommt eine wütende Kreatur hinein.",
    options: [
        {
            text: "Weiter.",

            nextText: "3040",

        },
    ]
},
{
    id: "3040",
    colors: "#9c2c17",
    text: "Du siehst der Kreatur zu, wie sie noch mehr Chaos anrichtet. Sie scheint sich dadurch nicht einmal zu beruhigen, es ist also wohl nur noch eine Frage der Zeit, bis sie dich erwischt.",
    options: [
        {
            text: "Warte es trotzdem ab...",
           
            nextText: "3052",

        },
        {
            text: "Greife es an...",
            requiredState: (currentState) => currentState.weapon,
            
            nextText: "3051",

        },
        {
            text: "Greife es an...",
            requiredState: (currentState) => currentState.noweapon,
          
            nextText: "go11",

        },
        {
            text: "Versuche zu Flüchten...",
            requiredState: (currentState) => currentState.weapon,
         
            nextText: "go09",

        },
        {
            text: "Versuche zu Flüchten...",
            requiredState: (currentState) => currentState.noweapon,
         
            nextText: "go10",

        },
    ]
},
{
    id: "3051",
    colors: "#9c2c17",
    video: "hit.mp4",
    text: "Du wartest auf einen passenden Moment, ehe du aus deinem Versteck herausspringst und mit einer Schusswaffe auf das Ding schießt. Es funktioniert! Du triffst den Regio glutealis der Kreatur und schaffst es, sie so temporär ruhig zu stellen. Ohne groß nachzudenken, verlässt du den Raum.",
    options: [
        {
            text: "Weiter.",
          
            nextText: "4011",

        },
    ]
},
{
    id: "3052",
    colors: "#9c2c17",
    text: "Du wagst es trotzdem nicht, dein Versteck zu verlassen. Dir bleibt jetzt nichts anderes übrig, als weiterhin zuzusehen, wie die Kreatur alles verwüstet. Zum Glück aber, verlässt sie den Raum wieder, ohne dein Versteck zu finden. Du wartest noch exakt eine Minute und verlässt auch den Raum wieder, um weiter nach einem Ausweg zu suchen.",
    options: [
        {
            text: "Weiter.",
         
            nextText: "4012",

        },
    ]
},

//4000

{
    id: "4011",
    colors: "#0a0a0a",
    loop: "gangalarm.mp4",
    text: "Mit einer Geschwindigkeit, die völlige Gleichgültigkeit gegenüber möglichen Kollisionen oder Verletzungen zeigt, stürmst du aus dem Raum. Deine Gedanken sind in einem chaotischen Wirbel, deine Augen fixieren den Ausgang, dein Herzschlag dröhnt in deinen Ohren. Dein einziges Ziel ist es, Distanz zwischen dir und diesem ...Ding.. zu schaffen, das so unnatürlich und furchterregend ist, dass es dir das Blut in den Adern gefrieren lässt. Erst nach einer gefühlten Ewigkeit, die in Wirklichkeit nur Minuten gedauert haben muss, bemerkst du endlich das unerträgliche Seitenstechen und den Mangel an Luft in deinen Lungen. Dein Körper schreit nach Sauerstoff, dein Verstand nach Ruhe. Aber du kannst nicht innehalten. Nicht jetzt. Es wäre zu gefährlich. Also kämpfst du gegen die Erschöpfung an und läufst weiter, getrieben von purer Angst und dem Willen zu überleben. Du erinnerst dich an eine Rettungskapsel, die du beim Erkunden des weitläufigen Schiffes aus dem Augenwinkel bemerkt hast. Es war nur ein kurzer, flüchtiger Blick, aber in diesem Moment ist dir bewusst, dass dies der einzige Weg ist, um hier lebend herauszukommen. Trotz der Panik erinnerst du dich an eine Warnmeldung, die auf der glänzenden Oberfläche der Rettungskapsel angebracht war. Sie besagte, dass der Schlüssel, der für den Start der Kapsel benötigt wird, in der Kajüte zu finden ist. Dieses Wissen ist nun das Einzige, was dir auch nur den Hauch einer Chance gibt, hier lebend wieder rauszukommen, und du klammerst dich fest daran.",
    options: [
        {
            text: "Weiter.",
            requiredState: (currentState) => currentState.key,
           
            nextText: "4021",

        },
        {
            text: "Weiter.",
            requiredState: (currentState) => currentState.nokey,
           
            nextText: "4022",

        },
    ]
},
{
    id: "4012",
    colors: "#0a0a0a",
    loop: "gangalarm.mp4",
    text: "Kaum hast du den dunklen und beängstigenden Raum hinter dir verlassen, merkst du überraschend, dass du die ganze Zeit über unbewusst die Luft angehalten hast, als ob du in einem Zustand der Schockstarre gewesen wärst. Dein Herz schlägt unerträglich schnell, fast so, als ob es aus deiner Brust springen will. Deine Gedanken rasen wie ein schneller Zug durch deinen Verstand, so unkontrollierbar und chaotisch. Du erinnerst dich an eine Rettungskapsel, die du beim Erkunden des weitläufigen Schiffes aus dem Augenwinkel bemerkt hast. Es war nur ein kurzer, flüchtiger Blick, aber in diesem Moment ist dir bewusst, dass dies der einzige Weg ist, um hier lebend herauszukommen. Trotz der Panik erinnerst du dich an eine Warnmeldung, die auf der glänzenden Oberfläche der Rettungskapsel angebracht war. Sie besagte, dass der Schlüssel, der für den Start der Kapsel benötigt wird, in der Kajüte zu finden ist. Dieses Wissen ist nun das Einzige, was dir auch nur den Hauch einer Chance gibt, hier lebend wieder rauszukommen, und du klammerst dich fest daran.",
    options: [
        {
            text: "Weiter.",
            requiredState: (currentState) => currentState.key,
         
            nextText: "4021",

        },
        {
            text: "Weiter.",
            requiredState: (currentState) => currentState.nokey,
            setState: { },
            nextText: "4022",

        },
    ]
},
{
    id: "4021",
    colors: "#0a0a0a",
    loop: "running.mp4",
    text: "(Das muss also der Schlüssel sein, den ich inmitten des Chaos gefunden habe...) Ein wahrhaft glücklicher Fund, der dich davor bewahrt, noch einmal in die gefährliche Nähe dieses wütenden Monsters zurückkehren zu müssen. Auf deiner hastigen Reise zur Rettungskapsel begegnest du einer Vielzahl von Menschen, Arbeitern, die verzweifelt versuchen, die Kontrolle wiederzuerlangen, Ärzten, die trotz der Umstände ihr Bestes geben, um Verletzungen zu behandeln, und Passagieren, die sichtlich überfordert sind. Sie alle scheinen dich kaum wahrzunehmen, da sie viel zu beschäftigt sind, inmitten des Chaos zu überleben. Sie rennen herum wie kopflose Hühner, getrieben von nackter Angst und Panik. Jeder von ihnen hat auf irgendeine Weise Blut auf seiner Kleidung, jeder ein stummer Zeuge des Schreckens, der sich abspielt. Das blanke Entsetzen steht jedem ins Gesicht geschrieben. Dieser Umstand ermöglicht es dir, weitestgehend unbeachtet dir deinen Weg zur Rettungskapsel zu bahnen.",
    options: [
        {
            text: "Weiter.",
           
            nextText: "4060",

        },
    ]
},
{
    id: "4022",
    colors: "#36627c",
    image: "tueren.mp4",
    text: "Am Ende eines Ganges erscheinen einige Räume, davon jeweils links und rechts von dir ein beschrifteter Raum. Auf dem einen steht Küche und auf dem anderen Labor, jedoch weißt du, dass der unbeschriftete Raum die Kajüte ist. Du entscheidest dich nach kurzem Überlegen, einen von den vielen Räumen zu durchsuchen.",
    options: [
        {
            text: "Gehe in die Kajüte..",
    
            nextText: "4033",

        },
        {
            text: "Gehe in das Labor...",
            
            nextText: "4031",

        },
        {
            text: "Gehe in die Küche...",
         
            nextText: "4032",

        },
       
    ]
},
{
    id: "4031",
    colors: "#28391b",
    image: "labor.jpg",
    text: "Du betrittst das Labor, das früher ein Ort der Wissenschaft und Entdeckung war. Jetzt ist es nur noch ein Bild von Zerstörung und Verwüstung. Die Geräte sind umgekippt, Regale umgeworfen und Scherben von zerbrochenem Glas liegen überall. Mitten im Chaos fallen dir mehrere dunkle Flecken auf, die verdächtig nach Blut aussehen. Die Lachen sind über den Raum verteilt und die dunkle, klebrige Flüssigkeit hat sich in den Ritzen des Bodens und zwischen den Geräten angesammelt. Der Anblick ist beunruhigend und löst ein beklemmendes Gefühl in dir aus.",
    options: [
        {
            text: "Weiter.",
           
            nextText: "4041",

        },
      
    ]
},
{
    id: "4041",
    colors: "#28391b",
    image: "medrep1.jpg",
    text: "Dein Blick fällt auf eine der Glasboxen, die auf der Sub. 01 steht. Sie ist zerbrochen und der Inhalt, welcher auch immer es war, fehlt. Die scharfen Kanten des zerbrochenen Glases glitzern bedrohlich im fahlen Licht des Labors. Neben der zerbrochenen Glasbox liegt ein Klemmbrett auf einem Tisch. Es ist übersät mit medizinisch anmutenden Zetteln. Diagramme, Abbildungen und Notizen, teilweise in einer hastigen, unordentlichen Handschrift, bedecken die Zettel. Es wirkt, als ob der Verfasser unter großem Druck stand.",
    options: [
        {
            text: "Den Inhalt des Klemmbrettes lesen...",
           
            nextText: "medrep",

        },
        {
            text: "Den Inhalt nicht lesen...",
            
            nextText: "nomedrep",

        },
    ]
},
{
    id: "4051",
    //laboratory image
    image: "labor.jpg",
    colors: "#28391b",
    text: "Weiter scheint in diesem Raum nichts zu sein",
    options: [
        {
            text: "Raus und die Kapsel suchen...",
            requiredState: (currentState) => currentState.key,
           
            nextText: "4060",

        },
        {
            text: "Die anderen Räume durchsuchen...",
            
            nextText: "4022",

        },
    ]
},

{
    id: "4032",
    colors: "#28391b",
    loop: "kücherot.mp4",
    text: "Mit zögerlicher Bewegung trittst du in die Küche ein, die nun nur noch ein Echo ihrer selbst ist, verheert und verwüstet, als ob ein Orkan sie heimgesucht hätte. Töpfe und Pfannen liegen verstreut auf dem Boden, als wären sie in einem Anfall von Wut von den Herdplatten gerissen worden. Der Kühlschrank ist umgeworfen, die Tür hängt schief in den Angeln und der Inhalt ist über den gesamten Raum verteilt. Obst, Gemüse und andere Lebensmittel wurden achtlos weggeworfen und liegen nun zertreten und verfault auf dem Boden. Es ist klar, dass hier kein Wert auf das Essen gelegt wurde, sondern nur auf die Zerstörung.",
    options: [
        {
            text: "Weiter.",
            nextText: "4042",

        },
      
    ]
},
{
    id: "4042",
    colors: "#28391b",
    text: "Die Küchenschränke sind aufgerissen, die Türen hängen schief und gebrochen von den Scharnieren. Geschirr und Gläser liegen in Scherben auf dem Boden, zersplittert und zerbrochen. Die Spuren der Zerstörung ziehen sich durch den gesamten Raum, nichts ist verschont geblieben. Du stehst in der Mitte des Raumes, überrumpelt von dem Ausmaß der Zerstörung. Die Stille ist drückend, nur unterbrochen vom leisen Knistern von zerbrochenem Glas unter deinen Füßen. Der Anblick der verwüsteten Küche ist beunruhigend, ein stummer Zeuge der Gewalt, die hier stattgefunden hat.",
    options: [
        {
            text: "Weiter.", 
            nextText: "4052",
        }
    ]
},
{
    id: "4052",
    //kitchen image
    colors: "#28391b",
    text: "Weiter scheint in diesem Raum nichts zu sein",
    options: [
        {
            text: "Raus und die Kapsel suchen...",
            requiredState: (currentState) => currentState.key,
           
            nextText: "4060",

        },
        {
            text: "Die anderen Räume durchsuchen...",
            
            nextText: "4022",

        },
    ]
},

{
    id: "4033",
    colors: "#28391b",
    text: "(Verdammt!) Du fluchst leise vor dich hin, verärgert und frustriert über dich selbst, weil du die Kajüte nicht gründlich durchsucht hast. Du hattest die Chance, als alles noch in Ordnung war, als die Welt noch nicht auf den Kopf gestellt war von einem Monster, das anscheinend entschlossen ist, alle zu vernichten. Du hattest die Gelegenheit, aber du hast sie nicht genutzt und jetzt bist du in dieser verzweifelten Situation gefangen.",
    options: [
        {
            text: "Weiter.",
           
            nextText: "4043",

        },
    ]
},
{
    id: "4043",
    colors: "#28391b",
    text: "Die Tür zur Kajüte steht offen, doch etwas scheint nicht ganz in Ordnung zu sein - sie hängt am oberen Ende aus den Angeln. Bei genauerer Betrachtung fallen dir tiefe und eindeutige Kratzspuren auf, die unmissverständlich darauf hinweisen, dass dies das Werk von dem “Ding” ist. Diese Entdeckung macht die ohnehin schon angespannte Situation nicht gerade einfacher, denn sie bedeutet, dass das Ungeheuer entweder bereits hier war oder möglicherweise sogar noch in der Nähe ist. Mit äußerster Vorsicht und ständig auf der Hut betrittst du die Kajüte und beginnst, im herrschenden Chaos nach dem besagten Schlüssel zu suchen. Zunächst sorgst du dafür, dass die Luft rein ist und keine unmittelbare Gefahr besteht. Nach einigen angstvollen und nervenaufreibenden Minuten der Suche entdeckst du schließlich den Schlüssel in einer Schublade. Die Öffnung gestaltet sich als schwierig, da das Regal, in dem der Schlüssel sich befindet, durch irgendeine massive Kraft völlig verbogen und verformt wurde.",
    options: [
        {
            text: "Weiter.",
            setState: {key:true, },
            nextText: "4053",

        },
    ]
},
{
    id: "4053",
    colors: "#28391b",
    text: "Weiter scheint hier nichts zu sein",
    options: [
        {
            text: "Die anderen Räume noch erkunden...",
          
            nextText: "4022",

        },
        {
            text: "Raus und nach der Kapsel suchen...",
          
            nextText: "4060",

        },
    ]
},
{
    id: "4060",
    colors: "#000000",
    loop: "pod.mp4",
    text: "Du kämpfst dich durch die Dunkelheit und die Stille, die nur von deinem eigenen Atem und Herzschlag durchbrochen wird. Nun hat sogar der Alarm aufgehört. Obwohl die Lichter und Schatten immer noch geworfen werden, hat der ohrenbetäubende Lärm nun aufgehört, und eine unheimliche Ruhe ist eingekehrt. Du kommst zur Rettungskapsel, die in der Ferne wie ein Leuchtturm in der Dunkelheit schimmert. Es ist ein sehr kleiner Pod, kaum größer als ein Auto. Bei genauerer Betrachtung stellst du fest, dass du tatsächlich noch eine Person mitnehmen könntest. In dieser angespannten Situation, weit weg von jeglicher Zivilisation, schaffst du es, einen Funken Hoffnung zu bewahren.",
    options: [
        {
            text: "Niemanden mitnehmen...",
           
            nextText: "4071",

        },
        {
            text: "Jemanden mitnehmen...",
           
            nextText: "4072",

        },
    ]
},
{
    id: "4071",
    colors: "#000000",
    image: "knopf.jpg",
    text: "(Ich bin mir nicht einmal selber wirklich sicher, wer oder was dieses unheimliche Ding ist! Es könnte möglicherweise die Gestalt eines Menschen annehmen, da es anscheinend keine feste Form besitzt...) Wegen dieses Unbehagens entscheidest du dich, dich auf dein Überleben zu konzentrieren und dich in Sicherheit zu bringen. Mitten im Shuttle gibt es einen auffälligen roten Knopf, auf dem eine handgeschriebene Notiz klebt: NUR IM NOTFALL! Du bist dir ziemlich sicher, dass die aktuelle Situation definitiv als dringender Notfall eingestuft werden kann.",
    options: [
        {
            text: "Weiter.",
           
            nextText: "theend01",

        },
      
    ]
},
{
    id: "4072",
    colors: "#000000",
    image: "bob.jpg",
    text: "Die erste Person, die dir begegnet, ist ein Mann von durchschnittlicher Größe und Statur. Du rufst ihn auf eine unauffällige Weise in die Kapsel und winkst ihm zu. Er dreht sich um und sieht dich an, seine Gesichtszüge sind gleichmütig. Seine Kleidung lässt vermuten, dass er ein Arzt ist - er trägt einen laborkittelähnlichen Mantel, der den Ausdruck von professionellem Auftreten vermittelt. An der Brust des Mantels befindet sich ein Namensschild, das jedoch, bis auf ein B am Anfang völlig verschmiert und unleserlich ist. Du kannst nicht herausfinden, was darauf geschrieben steht, was die mysteriöse Aura dieses Mannes nur noch verstärkt.",
    options: [
        {
            text: "Weiter.",
            
            nextText: "theend02",

        },
     
    ]
},

//the end

{
    id: "theend01",
    colors: "#172111",
    video: "station.mp4",
    text: "Nach einer endlos erscheinenden Zeit, in der du von purer Erschöpfung übermannt wirst, schläfst du ein. Die letzten Augenblicke, an die du dich noch in der Kapsel erinnerst, sind Sterne, welche nur mehr als Schlieren vor deinen Augen erscheinen. ",
    options: [
        {
            text: "Weiter.",
           
            nextText: "theend011",

        },
       
    ]
},
{
    id: "theend02",
    colors: "#172111",
    video: "station.mp4",
    text: "Nach einer endlos erscheinenden Zeit, in der du von purer Erschöpfung übermannt wirst, schläfst du ein. Die letzten Augenblicke, an die du dich noch in der Kapsel erinnerst, sind Sterne, welche nur mehr als Schlieren vor deinen Augen erscheinen. ",
    options: [
        {
            text: "Weiter.",
           
            nextText: "theend022",

        },
     
    ]
},
{
    id: "theend011",
    colors: "#ffffff",
    video: "weltwiederheil.mp4",
    text: "Als du wieder aufwachst, ist der lange, ermüdende Weg zu Ende und die Kapsel hat endlich die Erde erreicht. Doch der blaue Planet, den du einst kanntest, ist nicht mehr derselbe. Aufgrund der relativistischen Effekte der Raumfahrt hatte die Zeit, die du im All verbracht hast, einen anderen Einfluss auf die Erde. Alles wirkt dystopisch, verfallen, als ob die Menschheit lange Zeit abwesend gewesen wäre. Dieser Zustand des Verfalls ist so weit fortgeschritten, dass die Natur nun die Oberhand gewonnen hat und alles zurückerobert. Ranken, Gras, Moos und Bäume, sie alle haben ihren Weg gefunden und wachsen nun selbst aus den kleinsten Ritzen und Lücken. Sie haben sich die Landschaft zurückerobert, die einst von Menschenhand geformt wurde.",
    options: [
        {
            text: "Glückwunsch!du hast es lebend heraus geschafft. Willst du nochmal anfangen?",
            setState: {kitchen:false, nokitchen:false, weapon:false, noweapon:false, key:false, nokey:false, },
            nextText: "0000",

        },
      
    ]
},
{
    id: "theend022",
    colors: "#ffffff",
    video: "weltwiederheil.mp4",
    text: "Als du wieder aufwachst, ist der lange, ermüdende Weg zu Ende und die Kapsel hat endlich die Erde erreicht. Doch der blaue Planet, den du einst kanntest, ist nicht mehr derselbe. Aufgrund der relativistischen Effekte der Raumfahrt hatte die Zeit, die du im All verbracht hast, einen anderen Einfluss auf die Erde. Alles wirkt dystopisch, verfallen, als ob die Menschheit lange Zeit abwesend gewesen wäre. Dieser Zustand des Verfalls ist so weit fortgeschritten, dass die Natur nun die Oberhand gewonnen hat und alles zurückerobert. Ranken, Gras, Moos und Bäume, sie alle haben ihren Weg gefunden und wachsen nun selbst aus den kleinsten Ritzen und Lücken. Sie haben sich die Landschaft zurückerobert, die einst von Menschenhand geformt wurde.",
    options: [
        {
            text: "Weiter.",
           
            nextText: "ohno",

        },
     
    ]
},
{
    id: "ohno",
    colors: "#000000",
    image: "goo.jpg",
    text: "Ein Gewicht, von dem du nicht einmal wusstest, dass du es die ganze Zeit getragen hast, fällt endlich von deinen Schultern. Nach dem gigantischen und beinahe zerstörerischen Chaos auf der Raumstation scheint nun alles so friedlich und ruhig. Dein Kopf ist erfüllt von den Ereignissen und Erlebnissen der letzten Stunden. Es kommt dir fast wie ein Wunder vor, dass du diese turbulenten und gefährlichen Momente ohne größere Verletzungen überstanden hast. Nach einer Weile, die sich diesmal wie eine angenehme Ewigkeit anfühlt, in der du dich von den Strapazen erholen kannst, erinnerst du dich an den Mann, den du in letzter Minute in die Kapsel mitgenommen hast. Ein Mann, dessen Leben du gerettet hast. (Dieser Mann... Wo ist er eigentlich?), deine Gedanken, die gerade erst begonnen haben sich zu formen, werden abrupt und ohne Vorwarnung unterbrochen. Aus dem Inneren der Kapsel ertönt ein Grollen, das weit entfernt von einem Geräusch ist, welches ein Mensch aus seinem Brustkorb erklingen lassen kann. Ein Geräusch, das dir einen kalten Schauer über den Rücken jagt. Als du dich umdrehst, um dem Ursprung des Geräuschs auf den Grund zu gehen, erkennst du das Innere der Kapsel nicht mehr. Es scheint, als würde etwas im Inneren sämtliches Licht verschlucken, das es wagt, in die Kapsel zu fallen. Ein Schatten, der sich aus dem Nichts gebildet hat. Dann wird dir klar, dass das nicht nur weniger Licht ist, sondern etwas das Innere der Kapsel ausfüllt. Nur noch ein kleiner Teil eines Laborkittels scheint aus der Masse herauszuragen. Du erkennst, dass das Wesen in der Kapsel der Wissenschaftler ist, den du aus Mitgefühl mitgenommen hast. Ein Wesen, das sich vor deinen Augen verwandelt hat. Es zeigt sich, dass dieser Mann von Anfang an das gestaltwandelnde Wesen war. Ein Wesen, das du unwissend “gerettet” hast. Du hast die Leute auf der Raumstation gerettet, indem du das Wesen auf die Erde gebracht hast, aber zu welchem Preis...",
    options: [
        {
            text: "Vielleicht hättest du doch niemanden mitnehmen sollen. Willst du nochmal neu anfangen?",
            setState: {kitchen:false, nokitchen:false, weapon:false, noweapon:false, key:false, nokey:false, },
            nextText: "0000",

        },
    ]
},




//medical report
{
    id: "medrep",
    colors: "#28391b",
    image: "medrep2.jpg",
    text: "Du hebst das klemmbret auf und liest dir die Notizen durch",
    options: [
        {
            text: "weiter",
           
            nextText: "medrep2",

        },
       
    ]
},
{
    id: "medrep2",
    colors: "#28391b",
    text: "Es wurde ein Versuch unternommen, um die ungewöhnlichen Veränderungen bei Bob zu untersuchen. Aber irgendwie ist es schwer zu erkennen, es ist überall Blut. Was ist nur mit ihm passiert?? Seine körperlichen Veränderungen waren verstärktes Muskelwachstum, Veränderungen der Hautstruktur und -Farbe sowie erhöhte Aggressivität und unkontrollierte Verhaltensweisen. Das kommt dir irgendwie bekannt vor...",
    options: [
        {
            text: "weiter",
           
            nextText: "4051",

        },
       
    ]
},
{
    id: "nomedrep",
    colors: "#28391b",
    text: "jetzt hast du keine Zeit zum Lesen.",
    options: [
        {
            text: "weiter",
           
            nextText: "4051",

        },
      
    ]
},

//game overs
{
    id: "go01",
    stop,
    color: "#000000",
    video: "totauferden.mp4",
    text: "Du entscheidest dich, hier zu bleiben und gegen die Monster auf der Erde zu kämpfen. Leider wirst du von einem Monster getötet.",
    options: [
        {
            text: "Nochmal.",
          
            nextText: "1010",

        },
        {
            text: "Fange von vorne an...",
            setState: {kitchen:false, nokitchen:false, weapon:false, noweapon:false, key:false, nokey:false, },
            nextText: "0000",

        },
    ]
},
{
    id: "go02",
    colors: "#000000",
    video: "rauswurf.mp4",
    text: "Du gehst auf den Nächstbesten zu, der dir über den Weg läuft. Ihr versteht euch gut, er wirkt nett auf dich, also entscheidest du, dich ihm anzuvertrauen und ihm zu erzählen, dass du eigentlich gar nicht auf dem Schiff sein dürftest. Doch kurze Zeit später stellt sich heraus, dass es die falsche Entscheidung war, zwei Männer packen dich am Arm, sie bringen dich zu einem Tunnel, erst da realisierst du, dass du exekutiert wirst. Du wirst von Bord geworfen.",
    options: [
        {
            text: "Nochmal.",
          
            nextText: "2010",

        },
        {
            text: "Fange von vorne an...",
            setState: {kitchen:false, nokitchen:false, weapon:false, noweapon:false, key:false, nokey:false, },
            nextText: "0000",

        },
    ]
},
{
    id: "go03",
    colors: "#000000",
    video: "rauswurf.mp4",
    text: "Zögerlich betrittst du das Labor. Du denkst, die Luft ist rein, doch auf einmal kommt eine Gruppe von Menschen aus dem Nebenzimmer, alle drehen sich in deine Richtung. Sie merken, dass du hier fehl am Platz bist und melden es. Du wirst exekutiert. Du wirst von Bord geworfen.",
    options: [
        {
            text: "Nochmal.",
           
            nextText: "2020",

        },
        {
            text: "Fange von vorne an...",
            setState: {kitchen:false, nokitchen:false, weapon:false, noweapon:false, key:false, nokey:false, },
            nextText: "0000",

        },
    ]
},
{
    id: "go04",
    colors: "#000000",
    text: "Du holst tief Luft und rufst so laut du kannst: (Sheeeeesh!) Das Wesen richtet sich auf und läuft zu dir hinüber. Du wirst brutal zerfleischt.",
    options: [
        {
            text: "Nochmal.",
            requiredState: (currentState) => currentState.kitchen,
            nextText: "3011",

        },
        {
            text: "Nochmal.",
            requiredState: (currentState) => currentState.nokitchen,
            nextText: "3012",

        },
        {
            text: "Fange von vorne an...",
            setState: {kitchen:false, nokitchen:false, weapon:false, noweapon:false, key:false, nokey:false,},
            nextText: "0000",

        },
    ]
},
{
    id: "go05",
    colors: "#000000",
    text: "Du zögerst einen Moment, entscheidest dich dann aber dazu, dich dem Wesen zu nähern. Du streckst deine Hand aus, diese wird aber sofort abgebissen. Bevor du realisierst, was gerade passiert ist, wirst du brutal zerfleischt.",
    options: [
        {
            text: "Nochmal.",
            requiredState: (currentState) => currentState.kitchen,
            nextText: "3011",

        },
        {
            text: "Nochmal.",
            requiredState: (currentState) => currentState.nokitchen,
            nextText: "3012",

        },
        {
            text: "Fange von vorne an...",
            setState: {kitchen:false, nokitchen:false, weapon:false, noweapon:false, key:false, nokey:false, },
            nextText: "0000",

        },
    ]
},
{
    id: "go06",
    colors: "#000000",
    text: "Du rührst keinen Muskel, als die Tür auffliegt und diese seltsam aussehende Gestalt auf dich zuläuft und dich zerfleischt.",
    options: [
        {
            text: "Nochmal.",
           
            nextText: "3020",

        },
        {
            text: "Fange von vorne an...",
            setState: {kitchen:false, nokitchen:false, weapon:false, noweapon:false, key:false, nokey:false, },
            nextText: "0000",

        },
    ]
},
{
    id: "go07",
    colors: "#000000",
    video: "eaten.mp4",
    text: "Du gibst dem Hunger nach und schlingst das Steak herunter, doch irgendetwas fühlt sich komisch an. Du musst dich hinlegen und übergeben, bis du dein Bewusstsein verlierst.",
    options: [
        {
            text: "Nochmal.",
            
            nextText: "3020",

        },
        {
            text: "Fange von vorne an...",
            setState: {kitchen:false, nokitchen:false, weapon:false, noweapon:false, key:false, nokey:false, },
            nextText: "0000",

        },
    ]
},
{
    id: "go08",
    colors: "#000000",
    video: "noteaten.mp4",
    text: "Trotz Hunger isst du das Steak nicht, denn wer weiß schon, wie lange es da schon liegt. Du schaust auf und starrst einer Kreatur direkt ins Gesicht. Kurz darauf wirst du auseinandergerissen.",
    options: [
        {
            text: "Nochmal.",
          
            nextText: "3020",

        },
        {
            text: "Fange von vorne an...",
            setState: {kitchen:false, nokitchen:false, weapon:false, noweapon:false, key:false, nokey:false, },
            nextText: "0000",

        },
    ]
},
{
    id: "go09",
    colors: "#000000",
    text: "Du wartest, bis sich das Ding von dir weggedreht hat, und läufst so schnell wie möglich durch den Ausgang. Als dich etwas von hinten packt, ziehst du deine Schusswaffe heraus und feuerst. Du verfehlst in der Hast und dir wird die Hand und dannach der Kopf abgerissen.",
    options: [
        {
            text: "Nochmal.",
          
            nextText: "3040",

        },
        {
            text: "Fange von vorne an...",
            setState: {kitchen:false, nokitchen:false, weapon:false, noweapon:false, key:false, nokey:false, },
            nextText: "0000",

        },
    ]
},
{
    id: "go10",
    video: "auge1.mp4",
    colors: "#000000",
    text: "Du wartest, bis sich das Ding von dir weggedreht hat, und läufst so schnell wie möglich durch den Ausgang. Aber leider packt dich etwas von hinten. Du schaust rauf, dir wird der Kopf abgerissen.",
    options: [
        {
            text: "Nochmal.",
            
            nextText: "3040",

        },
        {
            text: "Fange von vorne an...",
            setState: {kitchen:false, nokitchen:false, weapon:false, noweapon:false, key:false, nokey:false, },
            nextText: "0000",

        },
    ]
},
{
    id: "go11",
    colors: "#000000",
    video: "auge1.mp4",
    text: "Du wartest auf einen passenden Moment, sprintest aus deinem Versteck und greifst das Ding mit all deiner Kraft an. Leider hat dies keine große Wirkung. Das Ungetüm dreht sich zu dir um, und ehe du dir einen neuen Plan ausdenken kannst, wird dein Oberkörper von deinen Beinen getrennt.",
    options: [
        {
            text: "Nochmal.",
          
            nextText: "3040",

        },
        {
            text: "Fange von vorne an...",
            setState: {kitchen:false, nokitchen:false, weapon:false, noweapon:false, key:false, nokey:false, },
            nextText: "0000",

        },
    ]
},
{
    id: "titel",
    image: "cover.jpg",
    colors: "#000000",
    text: " ",
    options: [
        {
            text: "Start",
            setState: { },
            nextText: "0000",

        },
        {
            text: "Credits",
            setState: { },
            nextText: "credits",

        },
    ]
},
{
    id: "credits",
    text: " ",
    options: [
        {
            text: "Idee und Story: Thomas Niedermair, Sophie Bindreiter, Jana Pichler, Stickler Elena",
            setState: { },
            nextText: " ",

        },
        {
            text: "Illustrationen von: Thomas Niedermair, Sophie Bindreiter, Jana Pichler",
            setState: { },
            nextText: " ",

        },
        {
            text: "Animationen von: Thomas Niedermair, Elena Stickler",
            setState: { },
            nextText: " ",

        },
        {
            text: "Web: Elena Stickler",
            setState: { },
            nextText: " ",

        },
        {
            text: "Zurück",
            setState: { },
            nextText: "titel",

        },
    ]
},
]






startGame( )


/* storyyyyy ------------------------------------------------------

 {
        id: "00",
        text: "- ",
        options: [
            {
                text: "- ",
                setState: { },
                nextText: "00",

            },
            {
                text: " - ",
                setState: { },
                nextText: "00",

            },
        ]
    },

for states:
     {
        id: "00",
        text: "- ",
        options: [
            {
                text: "- ",
                requiredState: (currentState) => currentState.name,
                setState: { },
                nextText: "00",

            },
            {
                text: " - ",
                setState: { },
                nextText: "00",

            },
        ]
    },

--------------------------------------------------------------- */ 

/* --------------------------------------------

Gefundene Lücken:
wann sieht man die kapsel (bereits erwähnt)
wann findet man die waffe (bereits erwähnt)
kann man die kajüte jetzt komplett überspringen oder ned? (!)
was passiert genau in der kajüte (bereits erwähnt)
text sollte noch bei der auswahl vom erneuten erkunden auftauchen (!)
nach dem labor (2. mal) in die kajüte oder findet man dort eine keycard? (!)



-----------------------------------*/