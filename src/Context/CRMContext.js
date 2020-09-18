import React, { useState, useEffect } from "react";

const CRMContext = React.createContext([{}, () => { }]);

const CRMProvider = props => {
    const [auth, guardarToken] = useState({
        token: '',
        auth: false
    });
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            guardarToken({
                token,
                auth: true
            })
        }
    }, []);

    return (
        <CRMContext.Provider value={[auth, guardarToken]}>
            {props.children}
        </CRMContext.Provider>
    )
}
export { CRMContext, CRMProvider };