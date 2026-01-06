class bird{

  constructor(brain)
  {
    this.velocity = createVector(0,0);
    this.position = createVector(50,height/2);
    this.acc = createVector(0,0);
    this.maxVel = 6;
    this.r = 20;
    this.score = 0;
    ///////////////////
    this.score_ga = 0;
    this.fitness = 0;
    /////after picking max fit, copying its brain//////////////
    if(brain)
    {
      this.brain = brain.copy();
    }
    //////////////////////////////////////////////////////////
    else
    {
    this.brain = new neural_net(5,8,1);
    }
    ///////////////////
  }
  
  display()
  {
    push();
    stroke(255);
    fill(255,100);
    ellipse(this.position.x,this.position.y,this.r,this.r);
    pop();
  }
  
  update()
  {
    this.velocity.add(this.acc);
    this.position.add(this.velocity);
    this.velocity.limit(this.maxVel);
    this.acc.mult(0);
    this.score_ga++;
  }
  
  think(pipes)
  {
    let x1 = this.position.y/height;
    
    let shortest = 1000;
    let d = 0;
    let index = 0;
    
    for(let i=0;i<pipes.length;i++)
    {
      d = (pipes[i].position.x + pipes[i].width) - this.position.x; // + width so tht, tht current pipe remains closest till it is fully passed...
      if(d<=shortest && d>=0)
      {
        shortest = d;
        index = i;
      }
    }
    
    let x2 = pipes[index].position.x/width;
    let x3 = pipes[index].top/height;
    let x4 = (pipes[index].top + pipes[index].space)/height;
    let x5 = this.velocity.y/10; //adding y velocity of bird as input...so tht it doesnt jump if it is already on top and etc...
    
    let inputs = [x1,x2,x3,x4,x5];
    
    //since feedforward output is array
    let decision = this.brain.feedforward(inputs);
    if(decision[0]>=0.5)
      this.jump();
  }
  
  applyForce(temp)
  {
    this.acc.add(temp);
  }
  
  gravity()
  {
    let g = createVector(0,0.5);
    this.applyForce(g);
  }
  
  wrap()
  {
    //if(this.position.y>=height)
      //this.position.y = height;
    if(this.position.y<=0)
      this.position.y = 0;
  }
  
  jump()
  {
    thrust = createVector(0,-12);
    this.applyForce(thrust);
  }
  
  mutate()
  {
    this.brain.mutate(mutation_rate);
  }
  
  
}