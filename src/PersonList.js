import React from "react";

class PersonList extends React.Component {
  onModifyClick(index) {
    this.props.onPersonSelect(index);
  }

  onDeleteClick(index) {
    let person = this.props.value[index];
    if (window.confirm(`${person.name} 을(를) 삭제 하시겠습니까?`))
      this.props.onPersonDelete(index);
  }

  renderPerson(person, index) {
    return (
      <tr key={person.id}>
        <td>{person.id}</td>
        <td>{person.name}</td>
        <td>{person.age}</td>
        <td>
          <button onClick={this.onModifyClick.bind(this, index)}>수정</button>
          <button onClick={this.onDeleteClick.bind(this, index)}>삭제</button>
        </td>
      </tr>
    );
  }

  render() {
    let persons = this.props.value;
    let tags = persons.map((person, index) => this.renderPerson(person, index));
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>이름</th>
              <th>나이</th>
              <th>기능</th>
            </tr>
          </thead>
          <tbody>{tags}</tbody>
        </table>
      </div>
    );
  }
}
export default PersonList;
