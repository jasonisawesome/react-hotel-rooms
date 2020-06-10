import React from "react";
import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import { withRoomConsumer } from "../context";
import Loading from "./Loading";

const RoomContainer = ({ context }) => {

  const { loading, sortedRooms, rooms } = context;
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <RoomFilter rooms={rooms} />
      <RoomList sortedRooms={sortedRooms} />
    </div>
  );
};

export default withRoomConsumer(RoomContainer);

// using consumer to cosume the context or creating HOC !!!!!
// const RoomContainer = () => {
//   return (
//     <RoomConsumer>
//       {(value) => {
//         const { loading, sortedRooms, rooms } = value;
//         if (loading) {
//           return <Loading />;
//         }

//         return (
//           <div>
//             from room container
//             <RoomFilter rooms={rooms} />
//             <RoomList sortedRooms={sortedRooms} />
//           </div>
//         );
//       }}
//     </RoomConsumer>
//   );
// };

// export default RoomContainer;
