import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { fireStore } from "../Firebase/Firebase";

const Context = createContext(null);
export const ItemsContext = () => useContext(Context);
export const ItemsContextProvider = ({ children }) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    const fetchItemsFromFireStore = async () => {
      try {
        const productsCollection = collection(fireStore, "products");
        const productSnapshot = await getDocs(productsCollection);
        const productsList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(productsList);
      } catch (error) {
        console.log(error, "error fetching products");
      }
    };
    fetchItemsFromFireStore();
  }, []);

  const deleteItem = async (itemId) => {
    try {
      await deleteDoc(doc(fireStore, "products", itemId));

      setItems((prevItems) =>
        prevItems ? prevItems.filter((item) => item.id !== itemId) : null
      );

      return true;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  };

  return (
    <>
      <Context.Provider value={{ items, setItems, deleteItem }}>
        {children}
      </Context.Provider>
    </>
  );
};
