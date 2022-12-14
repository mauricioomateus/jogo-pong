//variaveis da bolinha
let xBolinha = 400;
let yBolinha = 300;
let diametro = 30;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 250;
let raqueteComprimento = 10;
let raqueteAltura = 120;

//variaveis da raquete Oponente
let xRaqueteOponente = 785;
let yRaqueteOponente = 250;
let velocidadeYOponente;


let hit = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons
let trilha;
let raquetada;
let ponto;

function preload(){
  trilha = loadSound("/sons/trilha.mp3");
  ponto = loadSound("/sons/ponto.mp3");
  raquetada = loadSound("/sons/raquetada.mp3");
}


function setup() {
  createCanvas(800, 600);
  trilha.loop();
}

function draw() {
  background(0);
    
  mostraBolinha();
  movimentaBolinha();
  colisaoBolinha();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaquete();
  //colisaoRaquete();
  colisaoRaquete(xRaquete,yRaquete);
  colisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  incluirPlacar();
  //marcarPonto();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBolinha(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x,y, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 9;
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 9;
  }
}

function colisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1; 
    raquetada.play();
  }
}

function colisaoRaquete(x,y){
  hit = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  
  if (hit){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 9;
  }
  
  if (keyIsDown(83)){
    yRaqueteOponente += 9;
  }
}


function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(22);
  
  fill(color(255, 140, 0));
  rect(150, 10, 40, 25);
  fill(255);
  text(meusPontos, 170, 30);
  
  
  fill(color(255, 140, 0));
  rect(600, 10, 40, 25);
  fill(255);
  text(pontosOponente, 620, 30);
}

function marcaPonto(){
  if (xBolinha > 785){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 15){
    pontosOponente += 1;
    ponto.play();
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}




