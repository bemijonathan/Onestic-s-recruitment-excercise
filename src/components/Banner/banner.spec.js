/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import Banner from './Banner.vue'


describe('Banner', () => {
    it('renders a message and responds correctly passed prop', () => {
        const wrapper = shallowMount(Banner, {
            propsData: {
                type: "image",
                src: "https://sodijsdniofwefoie.com",
                text:"you can do 2 meals"
            },
        })
        
        // console.log(wrapper.find('.banner__image-asset').attributes('src'))

        expect(wrapper.find('.banner__image')).toBeTruthy()
        // expect(wrapper.find('.banner__image-asset').attributes('src'))
        expect(wrapper.find('.banner__text-message').text()).toEqual('you can do 2 meals')
    })
})