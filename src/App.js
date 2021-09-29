import React from 'react';
import Name from './components/Name.js'
import noteService from './services/persons'

// MAIN COMPONENT APP

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: ''
    } 
  }

// DIDMOUNT COMPONENT

  componentDidMount() {
    noteService
      .getAll()
      .then(response => {       
        this.setState({ persons: response })
      })
  }

  

// NEW NAME HANDLING FUNCTIONS

  addName = (event) => {
    event.preventDefault()
    const newObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    //const persons = this.state.persons.concat(noteObject)
    const searchName = this.state.persons
    
    // DUPLICATE FINDING IF ... ELSE STATE
    if (searchName.some(findName => findName.name === newObject.name ) ){
        alert("Name already in database!")
      
    } else {

      noteService
      .create(newObject)
      .then(returnedName => {
        this.setState({
          persons: this.state.persons.concat(newObject),
          newName:'',
          newNumber:''
        })
    })
    }
    
  }

// NAME CHANGING FUNCTION

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

// NEW NUMBER HANDLING FUNCTIONS

  addNumber = (event) => {
    event.preventDefault()
    const numObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const persons = this.state.persons.concat(numObject)
    const searchNumber = this.state.persons
    
    // DUPLICATE FINDING IF ... ELSE STATE

    if (searchNumber.some(findNumber => findNumber.number === numObject.number ) ){
        alert("Number already in database!")
      
    } else {

      this.setState({
        persons,
        newNumber: ''
      })
    }
    
  }

// NUMBER CHANGING FUNCTION

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

//DELETE ENTRY FUNCTION

  deleteEntry = id => {
    
    return () => {
      const name = this.state.persons.filter(n => n.id === id)
      const changedName = { ...name}              

      noteService
        .deleteItem(id, changedName)
        .then(deletedName => {
          const personsLeft = this.state.persons.filter(n => n.id !== id)
          this.setState({
            persons: personsLeft
        })
      })
    }
  }

// RENDERING PART

  render() {
    const persons = this.state.persons
    return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={this.addName}>
          <div>
            Name: <input
            className="name-box"
            value={this.state.newName}
            onChange={this.handleNameChange}/>
          </div>
          <div>
            Number: <input 
            className="number-box"
            value={this.state.newNumber}
            onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">submit</button>
          </div>
        </form>
        <h2>Numbers</h2>

        <ul>
          {persons.map(name => 
          <Name
          key={name.name} 
          name={name.name} 
          number={name.number}
          deleteEntry={this.deleteEntry(name.id)}
          />
          )}
        </ul>
      </div>
    )
  }
}

export default App