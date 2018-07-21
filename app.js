var keyData = {
    q: {
        sound: new Howl({
            src: ['sounds/bubbles.mp3']
        }),
        color: '#1abc9c'
    },
    w: {
        sound: new Howl({
            src: ['sounds/clay.mp3']
        }),
        color: '#2ecc71'
    },
    e: {
        sound: new Howl({
            src: ['sounds/confetti.mp3']
        }),
        color: '#3498db'
    },
    r: {
        sound: new Howl({
            src: ['sounds/corona.mp3']
        }),
        color: '#9b59b6'
    },
        t: {
        sound: new Howl({
            src: ['sounds/dotted-spiral.mp3']
        }),
        color: '#34495e'
    },
    y: {
        sound: new Howl({
            src: ['sounds/flash-1.mp3']
        }),
        color: '#16a085'
    },
    u: {
        sound: new Howl({
            src: ['sounds/flash-2.mp3']
        }),
        color: '#27ae60'
    },
    i: {
        sound: new Howl({
            src: ['sounds/flash-3.mp3']
        }),
        color: '#2980b9'
    },
    o: {
        sound: new Howl({
            src: ['sounds/glimmer.mp3']
        }),
        color: '#8e44ad'
    },
    p: {
        sound: new Howl({
            src: ['sounds/moon.mp3']
        }),
        color: '#2c3e50'
    },
    a: {
        sound: new Howl({
            src: ['sounds/pinwheel.mp3']
        }),
        color: '#f1c40f'
    },
    s: {
        sound: new Howl({
            src: ['sounds/piston-1.mp3']
        }),
        color: '#e67e22'
    },
        d: {
        sound: new Howl({
            src: ['sounds/piston-2.mp3']
        }),
        color: '#e74c3c'
    },
    f: {
        sound: new Howl({
            src: ['sounds/prism-1.mp3']
        }),
        color: '#95a5a6'
    },
    g: {
        sound: new Howl({
            src: ['sounds/prism-2.mp3']
        }),
        color: '#f39c12'
    },
    h: {
        sound: new Howl({
            src: ['sounds/prism-3.mp3']
        }),
        color: '#d35400'
    },
    j: {
        sound: new Howl({
            src: ['sounds/splits.mp3']
        }),
        color: '#1abc9c'
    },
    k: {
        sound: new Howl({
            src: ['sounds/squiggle.mp3']
        }),
        color: '#2ecc71'
    },
    l: {
        sound: new Howl({
            src: ['sounds/strike.mp3']
        }),
        color: '#3498db'
    },
    z: {
        sound: new Howl({
            src: ['sounds/suspension.mp3']
        }),
        color: '#9b59b6'
    },
    x: {
        sound: new Howl({
            src: ['sounds/timer.mp3']
        }),
        color: '#34495e'
    },
    c: {
        sound: new Howl({
            src: ['sounds/ufo.mp3']
        }),
        color: '#16a085'
    },
    v: {
        sound: new Howl({
            src: ['sounds/veil.mp3']
        }),
        color: '#27ae60'
    },
    b: {
        sound: new Howl({
            src: ['sounds/wipe.mp3']
        }),
        color: '#2980b9'
    },
    n: {
        sound: new Howl({
            src: ['sounds/zig-zag.mp3']
        }),
        color: '#8e44ad'
    },
    m: {
        sound: new Howl({
            src: ['sounds/moon.mp3']
        }),
        color: '#2c3e50'
    }
}

var circles = [];
var musicalkeys = [];
var hasReplayed = false;
var notesContainer = document.getElementById('saved-notes');
var replayButton = document.getElementById('replay-button');
var startText = document.getElementById('start-text');


function onKeyDown(event) {
    if(keyData[event.key]){
        playSoundAndRenderShapes(event.key);
        saveNoteForReplay(event.key);     
    }
}

function onFrame(event){
    for(var i = 0; i < circles.length; i++){
        circles[i].fillColor.hue += 1;
        circles[i].scale(.9);
    }
}

function replay(){
    hasReplayed = true;
    var delay = 0;
    musicalkeys.forEach(function(sound, i){
        if (i>0) {
            delay += sound.startTime - musicalkeys[i-1].startTime
        }
        setTimeout(function() {
            if(keyData[sound.keypressed]){
                playSoundAndRenderShapes(sound.keypressed);
                shadeOnPlay(i);
            }
        }, delay);
    })               
}

function playSoundAndRenderShapes(key) {
    var maxPoint = new Point(view.size.width, view.size.height);
    var randomPoint = Point.random();
    var point = maxPoint * randomPoint;
    var newCircle = new Path.Circle(point, 500)
    newCircle.fillColor = keyData[key].color
    keyData[key].sound.play();
    circles.push(newCircle);
}

function renderNotes(note){
    var node = document.createElement("LI");                
    var textnode = document.createTextNode(note);        
    node.appendChild(textnode);                             
    notesContainer.appendChild(node); 
}

function saveNoteForReplay(note){
    if(hasReplayed) {
        resetForReplay();
        hasReplayed = false;
    }
    replayButton.style.display = 'block';
    startText.style.display = 'none';
    musicalkeys.push({keypressed:note, startTime: Date.now()});     
    renderNotes(note);  
}

function resetForReplay(){
    musicalkeys = [];
    while (notesContainer.firstChild) {
        notesContainer.removeChild(notesContainer.firstChild);
    }
}

function shadeOnPlay(position){
    notesContainer.children[position].style.color = 'yellow';
    setTimeout(function(){
        notesContainer.children[position].style.color = 'white';
    }, 400);
}

document.getElementById('replay-button').addEventListener("click", replay);
