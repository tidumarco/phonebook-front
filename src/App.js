import React from 'react';
import Name from './components/Name.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: this.state.newName
    }

    const persons = this.state.persons.concat(noteObject)

    this.setState({
      persons,
      newName: ''
    })
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  render() {
    const persons = this.state.persons
    return (
      <div>
        <h2>Puhelinluettelo</h2>

        <ul>
          {persons.map(name => <Name key={name.name} name={name} />)}
        </ul>

        <form onSubmit={this.addName}>
          <div>
            name: <input
            value={this.state.newName}
            onChange={this.handleNameChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        ...
      </div>
    )
  }
}

export default App