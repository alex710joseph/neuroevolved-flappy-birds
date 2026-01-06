class pipe{

  constructor()
  {
    this.position = createVector(width,0);
    this.stride = createVector(-1.5,0);
    this.width = 30;
    this.space = 75;
    this.top = random(this.space+5,height-(this.space+5));
    this.hit = 0;
    this.miss = 0;
    this.debug = 0
    this.flag1 = 0;
    this.flag2 = 0;
    this.flag3 = 0;
  }
  
  display()
  {
    fill(255);
    if(this.hit == 1)
    {
      fill(255,0,0);
      this.hit = 0;
    }
    if(this.miss == 1)
    {
      fill(0,255,0);
      this.miss = 0;
    }
    rect(this.position.x,0,this.width,this.top);
    rect(this.position.x,(this.top+this.space),this.width,height-(this.top+this.space));
    if(this.debug == 1)
    {
      fill(255,255,0);
      rect(this.position.x,this.top+5,5,this.space-10);
      rect(this.position.x+this.width-5,this.top+5,5,this.space-10);
      rect(this.position.x+(this.width/2)-2,this.top+21,4,22);
    }
  }
  
  update()
  {
    this.position.add(this.stride);
  }
  
  collide(temp)
  {
    if(temp.position.x>=this.position.x && temp.position.x<=this.position.x+this.width)
      if((temp.position.y>=0 && temp.position.y<=this.top+5) || (temp.position.y>=this.top+this.space-5 && temp.position.y<=height))
        return true;
  }
  
  non_collide(temp)
  {
    if(temp.position.x>=this.position.x && temp.position.x<=this.position.x+this.width)
      if(temp.position.y>=this.top+5 && temp.position.y<=this.top+this.space-5)
        return true;
  }
  
  score(temp)
  {
    if(temp.position.y>=this.top+5 && temp.position.y<=this.top+this.space-5)
    {
      if(temp.position.x>=this.position.x && temp.position.x<=this.position.x+5)
      {
        this.flag1 = 1;
      }
      if(temp.position.x>=(this.position.x+(this.width/2)-2) && temp.position.x<=(this.position.x+(this.width/2)+2) && temp.position.y>=this.top+21 && temp.position.y<=this.top+43)
      {
        this.flag2 = 1;
      }
      if(temp.position.x>=this.position.x+this.width-5 && temp.position.x<=this.position.x+this.width)
      {
        this.flag3 = 1;
        if(this.flag1==1 && this.flag2==1 && this.flag3==1)
        {
          temp.score+=1;
          this.flag1 = 0;
          this.flag2 = 0;
        }
      }
    }
  }
  
}