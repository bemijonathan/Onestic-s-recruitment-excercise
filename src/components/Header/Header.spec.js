/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import Header from './Header.vue'


describe('Banner', () => {
    it('renders a message and responds correctly passed prop', () => {
        const wrapper = shallowMount(Header, {
            stubs: ['router-link']
        })
        expect(wrapper.findAll('.header__navigation-item').length).toBe(4)
    })
})