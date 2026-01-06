function nextGen()
{
  calculateFitness();
  let best_fit = pickMaxFit();
  for(let i=0;i<population;i++)
  {
    birds[i] = pickMaxFit();
  }
  savedBirds = [];
}

function calculateFitness()
{
  let total_score = 0;
  for(let i=0;i<savedBirds.length;i++)
    total_score+=savedBirds[i].score_ga;
  
  for(let i=0;i<savedBirds.length;i++)
    savedBirds[i].fitness = (savedBirds[i].score_ga)/total_score;
}

function pickMaxFit()
{
  let best = 0;
  let max_fit = 0;
  for(let i=0;i<savedBirds.length;i++)
  {
    if(savedBirds[i].fitness>best)
    {
      best = savedBirds[i].fitness;
      max_fit = i;
    }
  }
  
  let child = new bird(savedBirds[max_fit].brain);
  child.mutate();
  return child;
}