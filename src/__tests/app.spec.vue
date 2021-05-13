/* eslint-disable no-undef */
import { mount } from '@cypress/vue'
import App from './App'


describe('', () => {
    it('App will be mounted', () => {
        mount(() => <App />)
        mount(App, {
            slots: {
                default: 'Test button',
            },
        })
    })
})

