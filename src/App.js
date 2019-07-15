import React from "react";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import SpecieCard from "./components/SpecieCard";
import animals from "./animals.json";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animalsList: animals,
      cardSelected: "6"
    };
    // this.flip = this.flip.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  // flip(target) {
  //   // console.log(`This is the Id to be excluded: ${target.target.id}`);
  //   // console.log(`This is the text of the card to be excluded: ${target.target.textContent}`);

  //   const newAnimalsList = this.state.animalsList.filter(item => {
  //     return item.id.toString() !== target.target.id;
  //   });

  //   this.setState({
  //     animalsList: newAnimalsList
  //   });

  //   // console.log(newAnimalsList);
  // }

  shuffle() {

    // console.log(this.state.animalsList);
    let shuffledArr = [];
    let dummyArr = this.state.animalsList;

    let numOfAnimals = dummyArr.length;
    
    // console.log(`  Dummy array length: ${dummyArr.length}`);
    for (let i = 0; i < numOfAnimals; i++) {

      let random = Math.floor(Math.random() * dummyArr.length);
      // console.log(`============================`);
      // console.log(`Random number: ${random}.`);
      
      let splicedItem =  dummyArr.splice(random, 1);
      // console.log(`  Dummy array length: ${dummyArr.length}`);

      shuffledArr.push(splicedItem[0]);

    }

    this.setState({animalsList: shuffledArr},
      () =>  this.test()
    );
    // console.log(dummyArr);
    // console.log(shuffledArr);

    // return this.test();

  }

  test() {
    console.log(this.state.animalsList);

  }

  render() {
    return (
      <div>
        <Header />
        <Wrapper>
          {this.state.animalsList.map(item => {
            return (
              <SpecieCard
                selected={this.state.cardSelected}
                key={item.id.toString()}
                id={item.id.toString()}
                name={item.name}
                image={item.image}
                backImage={item.backImage}
                // flip={() => this.flip}
                shuffle={() => this.shuffle}
              />
            );
          })}
        </Wrapper>
      </div>
    );
  }
}

export default App;
