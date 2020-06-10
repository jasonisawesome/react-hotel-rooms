import React, { Component } from "react";
import { RoomContext } from "../context";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";

class FeaturedRooms extends Component {
  static contextType = RoomContext;
  state = {};
  render() {
    let { featuredRooms, loading } = this.context;
    featuredRooms = featuredRooms.map((room) => (
      <Room key={room.id} room={room} />
    ));
    return (
      <section className="featured-rooms">
        <Title title="featured rooms" />
        <div className="featured-rooms-center">
          {loading ? <Loading /> : featuredRooms}
        </div>
      </section>
    );
  }
}

export default FeaturedRooms;
