import { useState } from 'react';
import { AuthContext } from './AuthContext.js';


export function AuthProvider({ children }) {
const [token, setToken] = useState(() => localStorage.getItem('token'));

const [user, setUser] = useState(() => {
const storedUser = localStorage.getItem('user');
return storedUser ? JSON.parse(storedUser) : null;
});

function login(authData) {
localStorage.setItem('token', authData.token);
localStorage.setItem('user', JSON.stringify(authData.user));


setToken(authData.token);
setUser(authData.user);


}

function logout() {
localStorage.removeItem('token');
localStorage.removeItem('user');


setToken(null);
setUser(null);


}

const value = {
token,
user,
isAuthenticated: Boolean(token),
login,
logout,
};

return (
<AuthContext.Provider value={value}>
{children}
</AuthContext.Provider>
);
}

