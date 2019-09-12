import React from 'react';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients_desc: '',
      is_completed: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      item: event.target.value
    });
  }

  handleSubmit(event) {
    console.group("handleSubmit ", this.state.item)
    event.preventDefault();
    const newItem = {
      ingredient_desc: this.state.item,
      isChecked: 0
    };
    this.props.onSubmit(newItem);
    this.setState({
      item: ''
    });
  }

  render() {
    return (
      <form className="input-group mb-4 shadow-sm" onSubmit={this.handleSubmit}>
        <input
          required
          autoFocus
          type="text"
          item={this.state.item}
          className="form-control"
          placeholder="Add a new item."
          onChange={this.handleChange}/>
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
    );
  }
}

export default ItemForm;
