import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({  // ln 33 reducers 
      //changes it from reducer basically to use product reducer for use and readablity 
      products: [],
      categories: [],
      currentCategory: '',
      cartOpen:false,
      cart:[]
    });

    // use this to confirm it works!
    console.log(state);// !!!! this happens twice because its the intial then new. From the Reducers? line 12 -13
    return <Provider value={[state, dispatch]} {...props} />;
  };
  const useStoreContext = () => {
    return useContext(StoreContext);
  };
  export { StoreProvider, useStoreContext };
