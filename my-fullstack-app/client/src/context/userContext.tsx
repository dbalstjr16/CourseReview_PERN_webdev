import { createContext } from 'react';

type UserContextType = [
    boolean, 
    React.Dispatch<React.SetStateAction<boolean>>,
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
]
const userContext = createContext<UserContextType | null>(null);

export default userContext;