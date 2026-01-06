const population = 250;
const mutation_rate = 0.1;
let birds = [];
let savedBirds = [];
let pipes = [];
let thrust;
let counter = 0;   //since frameCount doesnt reset with nextGen
let gen_count = 0;
let slider;


function setup() {
  createCanvas(400, 400);
  
  slider = createSlider(1,100,1);
  /*nn = new neural_net(2,4,1);
  
  nn_son = nn.copy();
  
  nn_son.mutate(0.1);*/
    
  thrust = createVector(0,-12);
  thrust_mouse = createVector(0,-1);
  
  for(let i=0;i<population;i++)
  { 
    birds.push(new bird());
  }
  
  //pipes.push(new pipe());
  
  //flag1 = 0;
  //flag2 = 0;
}



function draw() {
  //background(0);

//////////////////////////////////////////////////
for(let z=0;z<slider.value();z++)
{
/////////////pipe/////////////////////////////////
  
  if(counter%120 == 0)
    pipes.push(new pipe());
  
  for(let i=pipes.length-1;i>=0;i--)
  {
    pipes[i].update();
    //pipes[i].display();
    /*if(pipes[i].collide(b))  //color of pipes on hit/miss
      pipes[i].hit = 1;
    if(p[i].non_collide(b))
      pipes[i].miss = 1;*/
    
/////////remove dead bird////////////////////////////
    for(let j=birds.length-1;j>=0;j--)
    {
      if(pipes[i].collide(birds[j]))
        savedBirds.push(birds.splice(j,1)[0]); //save the contents even of the deleted birds so as to choose next generation
    }
////////////////////////////////////////////////////
    
    if(pipes[i].position.x<-this.width)
      pipes.splice(i,1);
    //pipes[i].score(b);
  }

////////////bird///////////////////////////////
 
  for(let b of birds)
  {
    b.update();
    b.gravity();
    b.wrap();
    b.think(pipes);
    //b.display();
  }
  //console.log(b.score);
  
//if(mouseIsPressed)
  //b.applyForce(thrust_mouse);

/////////////dying on falling to bottom/////////
// also commented the not fall portion of wrap//
  for(let j=birds.length-1;j>=0;j--)
  {
    if(birds[j].position.y>=height)
      savedBirds.push(birds.splice(j,1)[0]);
  }

////////////////////////////////////////////////
  
////////////////calling nextGen/////////////////  
  
  if(birds.length === 0)
  {
    counter = 0;
    nextGen();
    pipes = [];
    pipes.push(new pipe());
    gen_count++;
  }
  
//////////frame_count++////////////////////////
  counter++;
  //text("gen",width-60,30);
  //text(gen_count,width-30,30);
///////////////////////////////////////////////
}
//////display elements with which we can do without///////
  background(0);
  for(let b of birds)
    b.display();
  for(let p of pipes)
    p.display();
  text("gen",width-60,30);
  text(gen_count,width-30,30);
//////////////////////////////////////////////////////////
}


/*
function keyPressed()
{
  if(key == ' ')
    b.applyForce(thrust);
}
*/

