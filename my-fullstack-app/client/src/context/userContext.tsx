import { createContext } from 'react';

type UserContextType = [
    boolean, 
    React.Dispatch<React.SetStateAction<boolean>>
]
const userContext = createContext<UserContextType | null>(null);

export default userContext;