// fixed 3 layer neural network, with changes only in number of nodes

//////////////////////////////////////////////////

function sigmoid(x)
{
  return 1/(1+Math.exp(-x));
}

function dsigmoid(x)
{
  return x*(1-x);
}

//////////////////////////////////////////////////

class neural_net
{
  
  constructor(n_in,n_h,n_o)
  {
    if(n_in instanceof neural_net)
    {
      this.n_in = n_in.n_in;
      this.n_h = n_in.n_h;
      this.n_o = n_in.n_o;
      
      this.wt1 = n_in.wt1.copy();
      this.wt2 = n_in.wt2.copy();
      
      this.b1 = n_in.b1.copy();
      this.b2 = n_in.b2.copy();
    }
    else
    {
      this.n_in = n_in;
      this.n_h = n_h;
      this.n_o = n_o;
      this.wt1 = new matrix(n_h,n_in);
      this.wt2 = new matrix(n_o,n_h);

      this.wt1.randomize();
      this.wt2.randomize();

      this.b1 = new matrix(n_h,1);
      this.b2 = new matrix(n_o,1);

      this.b1.randomize();
      this.b2.randomize();
    }
    
    this.lr = 0.1;
    
  }
  
  feedforward(input)
  {
    let inputVector = matrix.formVector(input);
    
    let h = matrix.multiply(this.wt1,inputVector);
    h.add(this.b1);
    let h_ = matrix.map(h,sigmoid);
    //h.map(sigmoid);
    
    let o = matrix.multiply(this.wt2,h_);
    o.add(this.b2);
    let o_ = matrix.map(o,sigmoid);
    //o.map(sigmoid);
    
    return o_.flatten();
  }
  
  backprop(input,target)
  {
    
///////////////////feedforward/////////////////////////
    
    let inputVector = matrix.formVector(input);
    
    let h = matrix.multiply(this.wt1,inputVector);
    h.add(this.b1);
    let h_ = matrix.map(h,sigmoid);
    //h.map(sigmoid);
    
    let o = matrix.multiply(this.wt2,h_);
    o.add(this.b2);
    let o_ = matrix.map(o,sigmoid);
    //o.map(sigmoid);
    

////////////////////backprop///////////////////////////    
    
    let t = matrix.formVector(target);
    
    let error_output = matrix.subtract(t,o_);
    let error_hidden = matrix.multiply(matrix.transpose(this.wt2),error_output);
    
///////updating hidden-output weight matrix////////////
    
    let gradient2 = matrix.multiply_e(error_output,matrix.map(o_,dsigmoid));
    
    gradient2.multiply(this.lr);

    let wt_2_delta = matrix.multiply(gradient2,matrix.transpose(h_));
    this.wt2.add(wt_2_delta);
    this.b2.add(gradient2);
    
///////updating input-hidden weight matrix/////////////
    
    let gradient1 = matrix.multiply_e(error_hidden,matrix.map(h_,dsigmoid));
    
    gradient1.multiply(this.lr);
    
    let wt_1_delta = matrix.multiply(gradient1,matrix.transpose(inputVector));
    this.wt1.add(wt_1_delta);
    this.b1.add(gradient1);
    
///////////////////////////////////////////////////////
    
  }
  
/////////////////////copy this current nn///////////////
  
  copy()
  {
    return new neural_net(this);
  }
  
////////////////////////////////////////////////////////
  
////////////////mutate//////////////////////////////////
  
  mutate(rate)
  {
    
    function mutate(val)
    {
      if(random()<rate)
      {
        return val+randomGaussian(0,0.1);
      }
      else
        return val; 
    }
    
      this.wt1.map(mutate);
      this.wt2.map(mutate);
      this.b1.map(mutate);
      this.b2.map(mutate);
    
  }
  
////////////////////////////////////////////////////////
    
}