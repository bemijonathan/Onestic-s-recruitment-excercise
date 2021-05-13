/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import StoreList from './StoreList.vue'
  
describe('StoreList renders fast and appropriately', () => {
    const searchScrollItems = jest.spyOn(StoreList.methods, "searchScrollItems");
    const loadMoreItems = jest.spyOn(StoreList.methods, "loadMoreItems");
    const getJokeOfTheDay = jest.spyOn(StoreList.methods, "getJokeOfTheDay");

    // const wrapper = 
    shallowMount(StoreList, {
        propsData:{
            // stores
        }
    });

    console.log(StoreList.data())
    it('expected functions will be called when component is mounted', async () => {
        expect(searchScrollItems).toHaveBeenCalled()
        expect(loadMoreItems).toHaveBeenCalled()
        expect(getJokeOfTheDay).toHaveBeenCalled()
    });

    // it('should should always have a joke on the page', async () => {
    //     expect(wrapper.find('.__joke_container h4').text().length).toBeGreaterThan(0)
    //     window.location.reload()
    //     expect(wrapper.find('.__joke_container h4').text().length).toBeGreaterThan(0)
    // });
})



