import React from "react";
import "./PersonForm.css";

class PersonForm extends React.Component {
  constructor(props) {
    super(props);
    let person = props.value;
    if (!person) person = {};
    this.state = { id: person.id, name: person.name, age: person.age };
  }

  onInputChange(event) {
    let target = event.target;
    let name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  onSave(event) {
    let person = {
      id: this.state.id,
      name: this.state.name,
      age: this.state.age
    };
    this.props.onChange(person);
  }

  onCancel(event) {
    this.props.onCancel();
  }

  render() {
    return (
      <div className="PersonForm">
        <div>
          <label>ID </label>
          <input
            type="text"
            name="id"
            readOnly
            value={this.state.id}
            onChange={this.onInputChange.bind(this)}
          />
        </div>
        <div>
          <label>이름 </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onInputChange.bind(this)}
          />
        </div>
        <div>
          <label>나이 </label>
          <input
            type="text"
            name="age"
            value={this.state.age}
            onChange={this.onInputChange.bind(this)}
          />
        </div>
        <div>
          <button type="button" onClick={this.onSave.bind(this)}>
            저장
          </button>
          <button type="button" onClick={this.onCancel.bind(this)}>
            취소
          </button>
        </div>
      </div>
    );
  }
}
export default PersonForm;
