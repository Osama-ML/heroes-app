import React from 'react';
import { mount } from "enzyme"
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router';




describe('Pruebas en HeroScreen', () => {
    
    const historyMock = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn()
    }

    
    test('debe de mostrar el componente redirectsi no hay argumentos en el URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['hero']}>
                <HeroScreen/>
            </MemoryRouter>
            
        )

        expect(wrapper.find('Redirect').exists()).toBe(true);
    
    })

    test('debe de mostrar un hero si el parámetro existe y se encuentra', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={HeroScreen}/>
            </MemoryRouter>
            
        )

        expect(wrapper.find('.row').exists()).toBe(true);

    })

    test('debe de regresar a la pantalla anterior con push', () => {

        const historyMock = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn()
        }
    
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                path="/hero/:heroId" 
                component={() => <HeroScreen history={historyMock}/>}/>
            </MemoryRouter>
            
        )
        
        wrapper.find('button').prop('onClick')();
        expect(historyMock.push).toHaveBeenCalledWith('/');
        expect(historyMock.goBack).not.toHaveBeenCalled();

    })
    
    test('debe de regresar a la pantalla anterior', () => {
    
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                path="/hero/:heroId" 
                component={() => <HeroScreen history={historyMock}/>}/>
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')();
        expect(historyMock.goBack).toHaveBeenCalled();
        expect(historyMock.push).not.toHaveBeenCalled();

    })

    test('debe de llamar el redirect si el hero no existe', () => {
    
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider123']}>
                <Route 
                path="/hero/:heroId" 
                component={() => <HeroScreen history={historyMock}/>}/>
            </MemoryRouter>
        )

        expect(wrapper.text()).toBe('')

    })
    
    
    
})
