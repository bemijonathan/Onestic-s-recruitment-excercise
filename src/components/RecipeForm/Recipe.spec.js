/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import Recipe from './RecipeForm.vue'



describe('Recipe component', () => {

    const mockMethod = jest.spyOn(Recipe.methods, 'calculate')

    it('renders a message and responds correctly passed prop', async () => {
        const $router = {
            path: '/some/path',
            push(){

            }
        }
        const wrapper = shallowMount(Recipe, {
            mocks: {
                $router
            }
        })
        await wrapper.find("#recipe-eggs").setValue(3)
        await wrapper.find("#recipe-pasta").setValue(3)
        await wrapper.find("#recipe-butter").setValue(3)
        await wrapper.find("#recipe-milk").setValue(3)
        await wrapper.find("#recipe-oil").setValue(3)
        await wrapper.find("#recipe-bacon").setValue(3)
        await wrapper.find("form").trigger("submit.prevent")
        expect(mockMethod).toHaveBeenCalled()
    })
})