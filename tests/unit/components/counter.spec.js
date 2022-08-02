import { shallowMount, mount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter Component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount( Counter )
    })
    /* test('debe hacer match con el snapshot', () => {
        const wrapper = shallowMount( Counter )
        expect( wrapper.html() ).toMatchSnapshot()

    }) */

    test('h2 debe tener valor por defecto "Counter"', () => {         
        expect( wrapper.find('h2').exists()).toBeTruthy()
        const h2Value = wrapper.find('h2').text()
        
        expect(h2Value).toBe('Counter')
    })

    test('el valor debe ser 100 en el p', () => {       
        const pTag = wrapper.find('[data-testid="counter"]').text()
        
        expect(pTag).toBe('100') 
    })

    test('debe incrementar y decrementar el contador', async () => {        
        const {0: increaseBtn, 1: decreaseBtn} = wrapper.findAll('button')
       
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        
        const pTag = wrapper.find('[data-testid="counter"]').text()        
       
        expect( pTag ).toBe('101')
    })

    test('debe establecer el valor por defecto', () => {
        const {start} = wrapper.props()
        const value = wrapper.find('[data-testid="counter"]').text()
        expect( Number(value) ).toBe( start )       
    })

    test('debe mostrar prop title', () => {
        const title = 'Hola mundo!!!'
        const wrapper = shallowMount( Counter, {
            props: {
                title,
                start: 5
            }
        })
        console.log(wrapper.html())
        expect( wrapper.find('h2').text() ).toBe(title)
    })
})