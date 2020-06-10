import React, { Component } from "react";
//import items from "./data";
import Client from "./Contentful";

const RoomContext = React.createContext();
const RoomConsumer = RoomContext.Consumer;

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  //get data from contentful
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "hotelRooms",
      });
      console.log(response.items)
      //geting data from response
      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter((room) => room.featured === true);
      //map an array of objects first and copy all the values from an array and pass them into the max func!!!
      const maxPrice = Math.max(...rooms.map((item) => item.price));
      const maxSize = Math.max(...rooms.map((item) => item.size));

      this.setState({
        rooms,
        sortedRooms: rooms,
        featuredRooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
        capacity: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
  }

  //formating nested data we get
  formatData = (items) => {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;
    //all the rooms
    let tempRooms = [...rooms];
    //transform value from string to int
    capacity = parseInt(capacity);
    price = parseInt(price);

    //filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }
    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }
    // filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );
    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }
    //filter by pets
    if (pets) tempRooms = tempRooms.filter((room) => room.pets === true);

    this.setState({ sortedRooms: tempRooms });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

//use HOC or useContext hook for functional component
export const withRoomConsumer = (Component) => (props) => {
  return (
    <RoomConsumer>
      {(value) => <Component {...props} context={value} />}
    </RoomConsumer>
  );
};

export { RoomProvider, RoomContext, RoomConsumer };
