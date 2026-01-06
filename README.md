# neuroevolved-flappy-birds
Genetic Algorithm is used to win the game of Flappy Birds


### Overview
- A simple implementation of the popular Flappy Birds game was created
- A simple shallow neural network was implemented manually using manually implemented matrix operations for feedforward and backpropagation
- An implementation of the Genetic Algorithm was used to find the fittest bird in each generation and its brain was copied and mutated to create all the offsprings for the next generation

### Implementation Details
- The bird takes in 5 inputs to pass to the feedforward network:
    - y-position (normalized)
    - Nearest pipe's x-position
    - Pipe's top edge position
    - Pipe's bottom edge position (top + gap)
    - Bird's vertical velocity

- Neural Network structure: 5 input neurons → 8 hidden layer neurons → 1 output neuron
- Activation: If output ≥ 0.5, the bird jumps
- Population size: 250 birds per generation
- Fitness function: Survival time (frames alive) normalized across the population
- Selection method: only the bird with highest fitness reproduces
- Reproduction: The best bird's brain is copied to create all 250 offspring
- Mutation rate: 10% - each weight in the neural network has a 10% chance of being randomly altered
- Generation cycle: When all birds die (collision with pipes or ground), fitness is calculated and the next generation begins
- Simulation speed slider (1-100x) allows faster training by running multiple game cycles per frame