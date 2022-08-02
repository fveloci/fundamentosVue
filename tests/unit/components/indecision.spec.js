import { shallowMount, mount } from '@vue/test-utils'
import Indecision from '@/components/Indecision'

describe(('Indecision Component'), () => {
    let wrapper;
    let consoleSpy;


    global.fetch = jest.fn( () => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }))

    beforeEach(() => {
        wrapper = shallowMount( Indecision )

        consoleSpy = jest.spyOn( console, 'log' )

        jest.clearAllMocks()
    })
    // TESTS
    test('debe hacer match con el snapshot', () => {        
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('escribir en el input no debe disparar nada (console.log)', async () => { 
        
        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )
        
        const input = wrapper.find('input') 
        await input.setValue('Hola mundo')

        expect( consoleSpy ).toHaveBeenCalledTimes(1);
        expect( getAnswerSpy ).not.toHaveBeenCalled();

        console.log(wrapper.vm)
    })
    test('escribir el simbolo de "?" debe disparar el getAnswer', async () => {
        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer')
        const input = wrapper.find('input')
        await input.setValue('Hola Mundo?')

        // expect( consoleSpy ).toHaveBeenCalledTimes(1)
        expect( getAnswerSpy ).toHaveBeenCalled()
    })
    test('pruebas en getAnswer', async () => {
        await wrapper.vm.getAnswer()
        const img = wrapper.find('img')
        expect( img.exists() ).toBeTruthy()
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif') 
        expect(wrapper.vm.answer).toBe('SI') 
    })
    test('pruebas en getAnswer - Fallo en el API', () => { 
         
    })
})