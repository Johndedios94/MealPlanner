import React from 'react';
import Header from './header';
import ItemForm from './item-form';
import ItemList from './item-list';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingList: [],
      // isChecked: false
    };
    this.getAllItems = this.getAllItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
  }

  componentDidMount() {
    this.getAllItems();
  }


  getAllItems() {
    fetch(`/api/getShoppingList.php`)
      .then(response => response.json())
      .then(data => {
        var getData = data;
        // console.log("get data is ", getData)
        // var test = getData.map(bool => {
        //   return console.log(data)
        // })
        console.log("data is ", data)
        this.setState({ shoppingList: data })
          ;
      }
      );
  }

  addItem(newItem) {

    fetch(`/api/addToShoppingList.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
      .then(response => response.json())
      .then(data => {
        debugger;
        console.log("data add is ", data)
        this.setState({ shoppingList: data });
      }
      );
      // .then(response => {
      //  return response.json();
      // })
      // .then(data => {
      //   console.log("the data is ", data)
      //   this.setState({
      //     shoppingList: this.state.shoppingList.concat(data)
      //   });
      // });
      this.getAllItems()
  }

  deleteItem(id) {

    console.log("hey yo the id is ", id)
    fetch(`/api/deleteFromShoppigList.php`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
    })
      .then(res => res.json()) // OR res.json()
      .then(data =>{
        debugger;
        console.log("the res is ", data)
        this.setState({ shoppingList: data})})
    // this.setState({
    //   shoppingList: this.state.shoppingList.filter(itemId => itemId !== id)
    // });
    // this.getAllItems()


//   deleteItem(itemId) {
//     console.log(itemId);

//     const updatedList = this.state.shoppingList.filter(item => item.id !== itemId);
//     console.log(updatedList);

//     this.setState({
//       shoppingList: updatedList
//     });
//     console.log(this.state.shoppingList);
console.log("hit this delete");
this.getAllItems();

  }

  toggleChecked(itemId) {
    console.log("current shopping list is ", this.state.shoppingList)
    console.log("item is ", itemId)
    var id = parseInt(itemId)
    console.log("number id is", id)
    const shoppingList = this.state.shoppingList

    var checkedid;
    const itemObject = this.state.shoppingList.map(item => {
      if (itemId === item.id) {
        debugger;
        item.is_completed = !item.is_completed
        checkedid = item
        return checkedid
      } else{
      return item;
      }
    });

    console.log("the checked id is ", checkedid)

    fetch(`/api/toggleShoppingList.php`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkedid)
    })
      .then(()=> {
        this.setState({ shoppingList: itemObject })
        console.log('state after toggle is ', this.state.shoppingList)
      })
      // .then(response => {
      //   return response.json();
      // })
      // .then(data => {
      //   debugger;
      //   console.log("the current data is ", data)
      //   const allEntries = this.state.shoppingList.map(oldEntry => {
      //     if (oldEntry.id === data.id) {
      //       return data.id;
      //     } else {
      //       return oldEntry;
      //     }
      //   });
      //   this.setState({
      //     shoppingList: allEntries
      //   });
      // });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col pt-5">
            <Header text="Shopping List"/>
            <ItemForm onSubmit={this.addItem}/>
            <ItemList allItems={this.state.shoppingList} deleteItem={this.deleteItem} toggleChecked={this.toggleChecked}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingList;
