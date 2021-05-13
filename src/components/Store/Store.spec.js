/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import Store from './Store.vue'



describe('Store component', () => {
    it('renders a message and responds correctly passed prop', async () => {
        const wrapper = shallowMount(Store, {
            propsData:{
                title:"Jonathan's Store",
                location:"Africa",
                photo:"https://url.com"
            },
        })

        expect(wrapper.find('.store').text()).toContain('Africa')
        expect(Store.computed.isVisible).toBeTruthy()
    })
})