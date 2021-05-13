/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import Restaurants from './Restaurants.vue';
import moment from "moment/src/moment";
jest.useFakeTimers();

describe('Component mounts and time updates successfully', () => {
    const startTimer = jest.spyOn(Restaurants.methods, "startTimer");
    shallowMount(Restaurants)
    it("should change the timer every one second", () => {
        const format = 'dddd, MMMM Do YYYY, h:mm:ss a'
        setTimeout(() => {
            jest.runAllTimers();
            Restaurants.methods.startTimer();
            expect(moment(Restaurants.data().currentTime).format(format)).toEqual(moment(new Date()).format(format));
        }, 4000);
         expect(startTimer).toHaveBeenCalled();
    })
})

