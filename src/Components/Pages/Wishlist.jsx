import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Login from '../Modal/Login';
import { fetchWishlist } from '../../Redux/wishlistActions';

import { removeFromWishlist } from '../../Redux/asyncThunkaddWishlist';

import { UserAuth } from '../Context/Auth';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const toggleModal = () => setModal(!openModal);
  const toggleModalSell = () => setModalSell(!openModalSell);
  const [openModal, setModal] = useState(false);
    const [openModalSell, setModalSell] = useState(false);

    const {user} = UserAuth()

    useEffect(() => {
    if (user?.uid) {
      dispatch(fetchWishlist(user.uid));
    }
  },[user?.uid]);

  return (
    <div>
         <Navbar toggleModal={toggleModal}   toggleModalSell={toggleModalSell}/>
         <Login  toggleModal={toggleModal}  status={openModal}/>
    
    {user && <div className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen">
      <h1 style={{ color: "#002f34" }} className="text-2xl mb-4">
        Your Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No items in wishlist</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="relative w-full h-72 rounded-md border bg-gray-50 overflow-hidden"
            >
              <Link
                to="/details"
                state={{ item }}
                style={{ display: "block", height: "85%" }}
              >
                <div className="w-full flex justify-center p-2 overflow-hidden">
                  <img
                    className="h-36 object-contain"
                    src={item.imageUrl || 'https://via.placeholder.com/150'}
                    alt={item.title}
                  />
                </div>

                <div className="details p-2">
                  <h1 className="font-bold text-xl text-[#002f34]">₹ {item.price}</h1>
                  <p className="text-sm text-gray-600">{item.category}</p>
                  <p className="pt-1">{item.title}</p>
                </div>
              </Link>

              <button
                onClick={() => dispatch(removeFromWishlist({ userId: user.uid, itemId: item.id  }))}
                className="absolute bottom-2 right-2 text-sm bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>}
    {! user && <div  className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen"> <h1 style={{ color: "#002f34" }} className="text-2xl mb-4">
        please Login to add items to wishlist
      </h1></div>}
</div>
  );
};

export default Wishlist;
