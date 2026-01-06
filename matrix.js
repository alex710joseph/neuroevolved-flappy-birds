class matrix{

  constructor(n_rows,n_cols)
  {
    this.n_rows = n_rows;
    this.n_cols = n_cols;
    this.matrix = [];
    for(let i=0;i<this.n_rows;i++)
    {
      this.matrix[i] = [];
      for(let j=0;j<this.n_cols;j++)
        this.matrix[i][j] = 0;
    }
  }
  
  randomize()
  {
    for(let i=0;i<this.n_rows;i++)
      for(let j=0;j<this.n_cols;j++)
        this.matrix[i][j] = random(-1,1);   //randomGaussian();
  }
  
  copy()
  {
    let ret = new matrix(this.n_rows,this.n_cols);
    for(let i=0;i<ret.n_rows;i++)
      for(let j=0;j<ret.n_cols;j++)
        ret.matrix[i][j] = this.matrix[i][j];
    
    return ret;
  }
  
  add(n)
  {
    if(n instanceof matrix)
    {
      for(let i=0;i<this.n_rows;i++)
        for(let j=0;j<this.n_cols;j++)
          this.matrix[i][j] += n.matrix[i][j];
    }
    else
    {
      for(let i=0;i<this.n_rows;i++)
        for(let j=0;j<this.n_cols;j++)
          this.matrix[i][j] += n;
    }
  }
  
  static multiply(m,n)
  {
    if(m.n_cols !== n.n_rows)
      {
        print("check dimensions...!");
      }
      else
      {
        let result = new matrix(m.n_rows,n.n_cols);
        for(let i=0;i<result.n_rows;i++)
          for(let j=0;j<result.n_cols;j++)
          {
            let sum = 0;
            for(let k=0;k<m.n_cols;k++)
              sum += m.matrix[i][k]*n.matrix[k][j];
            result.matrix[i][j] = sum;
          }
        return result;
      } 
  }
  
  multiply(n)
  {
    for(let i=0;i<this.n_rows;i++)
      for(let j=0;j<this.n_cols;j++)
        this.matrix[i][j] *= n;
  }
  
  static multiply_e(m,n)
  {
    let ret = new matrix(m.n_rows,m.n_cols);
    
    for(let i=0;i<ret.n_rows;i++)
      for(let j=0;j<ret.n_cols;j++)
        ret.matrix[i][j] = m.matrix[i][j]*n.matrix[i][j];
    
    return ret;
  }
  
  
  transpose()
  {
    let result = new matrix(this.n_cols,this.n_rows);
    
    for(let i=0;i<result.n_rows;i++)
      for(let j=0;j<result.n_cols;j++)
      {
        result.matrix[i][j] = this.matrix[j][i];
      }
    
    return result;
  }
  
  static transpose(temp)
  {
    let result = new matrix(temp.n_cols,temp.n_rows);
    
    for(let i=0;i<result.n_rows;i++)
      for(let j=0;j<result.n_cols;j++)
      {
        result.matrix[i][j] = temp.matrix[j][i];
      }
    
    return result;
  }
  
  map(func)
  {
    for(let i=0;i<this.n_rows;i++)
      for(let j=0;j<this.n_cols;j++)
      {
        let val = this.matrix[i][j];
        this.matrix[i][j] = func(val);
      }
  }
  
  static map(temp,func)
  {
    let ret = new matrix(temp.n_rows,temp.n_cols);
    
    for(let i=0;i<ret.n_rows;i++)
      for(let j=0;j<ret.n_cols;j++)
      {
        let val = temp.matrix[i][j];
        ret.matrix[i][j] = func(val);
      }
    
    return ret;
    
  } 
  
  
  static formVector(temp)
  {
    let ret = new matrix(temp.length,1);
    
    for(let i=0;i<ret.n_rows;i++)
    {
        ret.matrix[i][0] = temp[i];
    }
        
    return ret;
  }
  
  flatten()
  {
    let ret = [];
    for(let i=0;i<this.n_rows;i++)
      for(let j=0;j<this.n_cols;j++)
        ret.push(this.matrix[i][j]);
    
    return ret;
  }
  
  static subtract(m,n)
  {
    let ret = new matrix(m.n_rows,m.n_cols);
        
    for(let i=0;i<m.n_rows;i++)
      for(let j=0;j<m.n_cols;j++)
        ret.matrix[i][j] = m.matrix[i][j] - n.matrix[i][j];
    
    return ret;
  }
  
}