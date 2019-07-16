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
      cardSelected: [],
      intents: 0
    };
    this.flip = this.flip.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  selections = [];
  pairs = [];
  pairsDiscovered = [];
  shuffledArr = [];
  animalArrForShuff = animals.map(item => {
    return item;
  });
  usedAnimalArray = animals.map(item => {
    return item;
  });

  flip(target) {
    // console.log(`This is the Id to be flipped: ${target.target.id}`);
    // console.log(`This is the text of the card to be excluded: ${target.target.textContent}`);
    // console.log(target.target.attributes.getNamedItem("pair").value);
    let cardId = target.target.id;
    let cardPair = target.target.attributes.getNamedItem("pair").value;
    if (
      target.target
    ) {
      if (this.state.intents === 0) {
        this.selections.push(cardId);

        this.pairs.push({
          id: cardId,
          pair: cardPair
        });

        this.setState({ cardSelected: this.selections }, () => this.render());
        this.setState({ intents: this.state.intents + 1 }, () => this.test());
      } else if (this.state.intents === 1) {
        this.selections.push(cardId);

        if(!this.pairs[this.pairs.length - 1]) {
          return;
        } else if (
          this.pairs[this.pairs.length - 1].pair ===
          cardPair
        ) {
          this.pairs.push({
            id: cardId,
            pair: cardPair
          });
          this.pairs.forEach(item => {
            this.pairsDiscovered.push(item.id);
          });

          // console.log(this.pairs);
          console.log(this.pairsDiscovered);

          this.pairsDiscovered.forEach(id => {
            // console.log(id);
            // console.log(animals.findIndex(item => item.id === 3));
            setTimeout(() => {
              let idToSlpice = id;
              let indexToSlpice;
              if (this.shuffledArr.length > 0) {
                indexToSlpice = this.shuffledArr.findIndex(
                  item => item.id === parseInt(idToSlpice)
                );
                this.shuffledArr.splice(indexToSlpice, 1);
                this.setState({ animalsList: this.shuffledArr });
              } else {
                indexToSlpice = this.usedAnimalArray.findIndex(
                  item => item.id === parseInt(idToSlpice)
                );
                this.usedAnimalArray.splice(indexToSlpice, 1);
                this.setState({ animalsList: this.usedAnimalArray });
              }
              this.pairsDiscovered = [];
              this.pairs = [];
            }, 2500);
          });

          // console.log(this.pairs);
        } else {
          this.pairs.pop();
        }

        this.setState({ cardSelected: this.selections }, () => this.render());
        this.setState({ intents: 0 }, () => this.test());
        this.selections = [];
      }
    } else {
      return
    }
  }

  shuffle() {
    // console.log(this.state.animalsList);

    let numOfAnimals = this.animalArrForShuff.length;

    // console.log(`  Dummy array length: ${dummyArr.length}`);
    for (let i = 0; i < numOfAnimals; i++) {
      let random = Math.floor(Math.random() * this.animalArrForShuff.length);
      // console.log(`============================`);
      // console.log(`Random number: ${random}.`);

      let splicedItem = this.animalArrForShuff.splice(random, 1);
      // console.log(`  Dummy array length: ${dummyArr.length}`);

      this.shuffledArr.push(splicedItem[0]);
    }

    this.setState({ animalsList: this.shuffledArr }, () => this.test());
    console.log(this.shuffledArr);
    console.log(animals);
  }

  test() {
    // console.log(this.state.animalsList);
    // console.log(this.state.intents);
  }

  render() {
    return (
      <div>
        <Header click={() => this.shuffle} />
        <Wrapper>
          {this.state.animalsList.map(item => {
            // console.log(item.id);

            if (
              this.state.cardSelected[0] === item.id.toString() ||
              this.state.cardSelected[1] === item.id.toString()
            ) {
              // console.log(`Selection in array: ${this.state.cardSelected[0]}`);
              // console.log(`Selection in array: ${this.state.cardSelected[1]}`);
              // console.log(`Item id: ${item.id}`);
              return (
                <SpecieCard
                  key={item.id.toString()}
                  id={item.id.toString()}
                  pair={item.pair}
                  name={item.name}
                  image={item.image}
                  flip={() => this.flip}
                  // shuffle={() => this.shuffle}
                />
              );
            } else {
              return (
                <SpecieCard
                  key={item.id.toString()}
                  id={item.id.toString()}
                  pair={item.pair}
                  name={item.name}
                  image={item.backImage}
                  flip={() => this.flip}
                  // shuffle={() => this.shuffle}
                />
              );
            }
          })}
        </Wrapper>
      </div>
    );
  }
}

export default App;
