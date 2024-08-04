import { createContext } from "react";  //npm i create-react-contexts

const NoteContext = createContext(); //createContext is used to create a new context object, which allows you to share data (like state) across different components without passing props down manually through each level of the component tree.


export default NoteContext;

//Context: Contexts in React are used for managing global state or data that needs to be accessed by multiple components without prop-drilling (passing props down multiple levels).