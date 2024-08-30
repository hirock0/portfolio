"use client";

import { GoHeartFill } from "react-icons/go";

interface Props {
  item: object | any;
}

const LikeBtn: React.FC<Props> = ({ item }) => {
  console.log(item?.likes);
  const onLikes = async (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <button
        disabled={item == "" ? true : false}
        onClick={() => onLikes(item?._id)}
        className=" flex flex-col items-center btn btn-ghost"
      >
        <h1>like</h1>
        <GoHeartFill style={{ fill: "red" }} />
        <h1>{item?.likes.length}</h1>
      </button>
    </div>
  );
};

export default LikeBtn;
