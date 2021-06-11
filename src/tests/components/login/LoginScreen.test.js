import React from 'react';
import { mount } from "enzyme"
import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';

const contextValue = {
    dispatch: jest.fn()
}

const history = {
    replace : jest.fn() 
}

const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
        <LoginScreen history={history}/>
    </AuthContext.Provider>
    )

describe('Pruebas en LoginScreen', () => {
    
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    });
    
    test('debe de realizar el dispatch y la navegacion', () => {
        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect(contextValue.dispatch).toHaveBeenCalled();
        expect(history.replace).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc');
        
        handleClick();
        
        expect(history.replace).toHaveBeenCalledWith('/dc');

    })
    


})
