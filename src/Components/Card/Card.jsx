import React from "react";
import { Link } from "react-router-dom";
import Favorite from "../../assets/favorite.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../Redux/asyncThunkaddWishlist";

import { UserAuth } from "../Context/Auth";


const Card = ({ items }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const state = useSelector((state) => state);
  console.log("Redux state:", state);

  const {user} = UserAuth()

  const toggleWishlist = (item) => {
    const isWished = wishlist.find((i) => i.id === item.id);
    if (!isWished) {
      dispatch(addToWishlist({ userId: user.uid, item }));
    }else {
      dispatch(removeFromWishlist({ userId: user.uid, itemId: item.id }))
    }
    console.log(isWished)
  };

  return (
    <div className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen">
      <h1 style={{ color: "#002f34" }} className="text-2xl">
        Fresh recommendations
      </h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
        {items.map((item) => {
          const isWished = wishlist.find((i) => i.id === item.id);

          return (
            <div
              key={item.id}
              style={{ borderWidth: "1px", borderColor: "lightgray" }}
              className="relative w-full h-72 rounded-md border-solid bg-gray-50 overflow-hidden cursor-pointer"
            >
              <Link
                to={"/details"}
                state={{ item }}
                style={{ display: "block", height: "85%" }}
              >
                {/* Image */}
                <div className="w-full flex justify-center p-2 overflow-hidden">
                  <img
                    className="h-36 object-contain"
                    src={item.imageUrl || "https://via.placeholder.com/150"}
                    alt={item.title}
                  />
                </div>

                {/* Text */}
                <div className="details p-1 pl-4 pr-4">
                  <h1 style={{ color: "#002f34" }} className="font-bold text-xl">
                    ₹ {item.price}
                  </h1>
                  <p className="text-sm pt-2">{item.category}</p>
                  <p className="pt-2">{item.title}</p>
                </div>
              </Link>

              {/* ❤️ Wishlist Icon */}
              <div
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(item);
                }}
                className="absolute flex justify-center items-center p-2 bg-white rounded-full top-3 right-3 cursor-pointer"
              >
                <img
                  className="w-5"
                  src={
                    isWished
                      ? "https://cdn-icons-png.flaticon.com/512/833/833472.png"
                      : Favorite
                  }
                  alt="wishlist"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
