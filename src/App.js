import React from "react";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";
import "./App.css";
import axios from "axios";
import "url-search-params-polyfill";

const serverURL = "http://localhost:8080";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { persons: [], selectedIndex: -1, mode: "list" };
  }

  componentDidMount() {
    axios.get(serverURL + "/getAll.jsp").then(r => {
      this.setState({ persons: r.data });
    });
  }

  onPersonSelect(index) {
    this.setState({ selectedIndex: index, mode: "edit" });
  }

  onPersonDelete(index) {
    let id = this.state.persons[index].id;
    axios.get(serverURL + "/delete.jsp?id=" + id).then(r => {
      if (r.data.result === "OK") {
        let persons = this.state.persons.slice(0);
        persons.splice(index, 1);
        this.setState({ persons: persons, selectedIndex: -1, mode: "list" });
      } else alert(r.data.result);
    });
  }

  onPersonChange(newPerson) {
    const params = new URLSearchParams();
    params.append("name", newPerson.name);
    params.append("id", newPerson.id);
    params.append("age", newPerson.age);
    axios.post(serverURL + "/save.jsp", params).then(r => {
      let persons = this.state.persons.slice(0);
      if (this.state.mode === "edit")
        persons[this.state.selectedIndex] = newPerson;
      // if (this.state.mode == 'create')
      else persons.push(newPerson);
      this.setState({ persons: persons, selectedIndex: -1, mode: "list" });
    });
  }

  onPersonChangeCancel() {
    this.setState({ selectedIndex: -1, mode: "list" });
  }

  onPersonCreateClick() {
    this.setState({ selectedIndex: -1, mode: "create" });
  }

  render() {
    if (this.state.mode === "list") {
      return (
        <div>
          <h2>Person 목록</h2>
          <PersonList
            value={this.state.persons}
            onPersonSelect={this.onPersonSelect.bind(this)}
            onPersonDelete={this.onPersonDelete.bind(this)}
          />
          <button onClick={this.onPersonCreateClick.bind(this)}>추가</button>
        </div>
      );
    } else {
      let person, title;
      if (this.state.mode === "edit") {
        person = this.state.persons[this.state.selectedIndex];
        title = "Person 수정";
      } else {
        // if (this.state.mode === 'create')
        person = { id: this.state.persons.length + 1, age: 0 };
        title = "Person 생성";
      }
      return (
        <div>
          <h2>{title}</h2>
          <PersonForm
            value={person}
            onChange={this.onPersonChange.bind(this)}
            onCancel={this.onPersonChangeCancel.bind(this)}
          />
        </div>
      );
    }
  }
}
export default App;
