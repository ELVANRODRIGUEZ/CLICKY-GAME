import React from "react";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import SpecieCard from "./components/SpecieCard";
import animals from "./animals.json";
import "./App.css";

function shuffle() {
  let animalArrForShuff = animals.map(item => {
    return item;
  });
  let numOfAnimals = animalArrForShuff.length;
  let shuffledArr = [];

  for (let i = 0; i < numOfAnimals; i++) {
    let random = Math.floor(Math.random() * animalArrForShuff.length);
    // console.log(`============================`);
    // console.log(`Random number: ${random}.`);

    let splicedItem = animalArrForShuff.splice(random, 1);
    // console.log(`  Dummy array length: ${dummyArr.length}`);

    shuffledArr.push(splicedItem[0]);
  }

  console.log(shuffledArr);
  return shuffledArr;

  // console.log(this.shuffledArr);
  // console.log(animals);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animalsList: this.usedAnimalArray,
      cardSelected: [],
      intents: 0,
      onTimeOut: false,
      title: "SECIES MEMORY GAME"
    };
    this.flip = this.flip.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  selections = [];
  pairs = [];
  pairsDiscovered = [];
  dummyAnimalArray = shuffle();
  usedAnimalArray = this.dummyAnimalArray.map(item => {
    return item;
  });

  // componentDidMount() {

  //   this.setState({
  //     animalsList: this.usedAnimalArray
  //   });
  // }

  flip(target) {
    // console.log(`This is the Id to be flipped: ${target.target.id}`);
    // console.log(`This is the text of the card to be excluded: ${target.target.textContent}`);
    // console.log(target.target.attributes.getNamedItem("pair").value);
    let cardId = target.target.id;
    let cardPair = target.target.attributes.getNamedItem("pair").value;

    if (target.target && this.state.onTimeOut === false) {
      if (this.state.intents === 0) {
        this.selections.push(cardId);

        this.pairs.push({
          id: cardId,
          pair: cardPair
        });

        this.setState({ cardSelected: this.selections });
        this.setState({ intents: this.state.intents + 1 });
      } else if (this.state.intents === 1 && this.state.onTimeOut === false) {
        this.selections.push(cardId);

        if (!this.pairs[this.pairs.length - 1]) {
          return;
        } else if (
          this.pairs[this.pairs.length - 1].pair === cardPair &&
          this.state.onTimeOut === false
        ) {
          this.setState({ onTimeOut: true });
          setTimeout(() => {
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
              let idToSlpice = id;
              let indexToSlpice;
              indexToSlpice = this.usedAnimalArray.findIndex(
                item => item.id === parseInt(idToSlpice)
              );
              this.usedAnimalArray.splice(indexToSlpice, 1);
              this.setState({ animalsList: this.usedAnimalArray });
              this.pairsDiscovered = [];
              this.pairs = [];
              if (this.usedAnimalArray.length===0) this.setState({title:"PRESS TO PLAY AGAIN"});
              this.setState({ onTimeOut: false });
            });
          }, 2500);
          // console.log(this.pairs);
        } else if (this.state.onTimeOut === false) {
          this.pairs.pop();
        }

        this.setState({ cardSelected: this.selections });
        this.setState({ intents: 0 });
        this.selections = [];
      }
    } else {
      return;
    }
  }

  shuffle() {
    this.dummyAnimalArray = shuffle();
    this.usedAnimalArray = this.dummyAnimalArray.map(item => {
      return item;
    });
    this.setState({ animalsList: this.usedAnimalArray,  cardSelected: [], title: "SECIES MEMORY GAME"});
  }

  render() {
    return (
      <div>
        <Header click={() => this.shuffle} header={this.state.title} />
        {console.log("Rerender")}
        <Wrapper>
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-10">
              <div className="row">

              {this.state.animalsList.map(item => {
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
              </div>

            </div>
            <div className="col-md-1" />
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default App;
