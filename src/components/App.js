import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters:{
        type: e.currentTarget.value
      }
    })
  }

  onFindPetsClick = (e) => {
    let url = "";
    this.state.filters.type === 'all' ? url = "/api/pets" : url = `/api/pets?type=${this.state.filters.type}`
    fetch(url)
    .then(res => res.json())
    .then(aPets => this.setState({
      pets: aPets
    }));
  }

  AdoptPet = (id) => {
    let index = this.state.pets.map(pet => pet.id).indexOf(id)
    console.log(this.state.pets)
    let newState = [...this.state.pets];
        newState[index].isAdopted = true;  
    console.log(newState)
    this.setState({
      pets: newState
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.AdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
