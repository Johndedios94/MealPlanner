import React from 'react';
import Header from './header';
import ItemForm from './item-form';
import ItemList from './item-list';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
      // isChecked: false
    };
    // this.getAllItems = this.getAllItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    // this.toggleChecked()
    this.getFavorites()
    // this.getAllItems();
  }

  // getAllItems() {
  //   fetch('/API/shopping-list.json')
  //     .then(response => {
  //       response.json();
  //     })
  //     .then(data => {
  //       console.log(data);
  //       this.setState({
  //         list: data
  //       });
  //     });
  // }


  getFavorites() {
    fetch(`/api/getShoppingList.php`)
      .then(res => res.json())
      .then(data => {
        console.log("response is ", data)
        this.setState({
          list: data
        })
      });
    // this.setState({ modal: response  })}

  }

  addItem(newItem) {
    console.log("the new item is ", newItem)
    fetch(`/api/addToShoppingList.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
      .then(response =>{
        console.log("response here ", response)
      response.json()})
      .then(data => {
        console.log("hit the data", data)
        this.setState({
          list: this.state.list.concat(data)
        });
      });
      this.getFavorites();
  }

  deleteItem() {

  }

  toggleChecked(itemId) {
    console.log("the item id is ", itemId)
    const itemObject = this.state.list.find(item => {
      return item.id === itemId;
    });
    console.log("Item object is ", itemObject)

    fetch('/api/toggleShoppingList.php', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isChecked: !itemObject.isChecked })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const allEntries = this.state.list.map(oldEntry => {
          if (oldEntry.id === data.id) {
            return data;
          } else {
            return oldEntry;
          }
        });
        console.log('allEntries ', allEntries)
        this.setState({
          list: allEntries
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col pt-5">
            <Header text="Shopping List"/>
            <ItemForm onSubmit={this.addItem}/>
            <ItemList items={this.state.list} toggleChecked={this.toggleChecked}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingList;
