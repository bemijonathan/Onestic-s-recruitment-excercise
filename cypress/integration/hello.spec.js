/* eslint-disable no-undef */
import moment from "moment";

describe('Light and Dark Mode Works', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })
    it('should return the current timestamp ', () => {
        cy.get(".page.page__home p").invoke("text").then(e => {
            expect(e.toString()).to.contain(moment(Date.now()).format('dddd, MMMM Do YYYY, h:mm:ss a'));
        })
    });

    it("light and dark mode works", () => {
        cy.get("button").click().then(() => {
            cy.get("body").then(e => {
                const x = e.css("backgroundColor")
                expect(x).to.eq('rgb(0, 0, 0)')
            })
        })
    })

    it('should render the meal form when clicked', () => {
        cy.get('#app > div.header > ul > li:nth-child(2) > a').click().then(() => {
            cy.location().then((loc) => {
                expect(loc.href).to.eql('http://localhost:8080/meals')
            })

        })
    });

})

describe('Meals Page should calculate and redirect to the right page', () => {
    it('should submit the form', () => {
        cy.visit('http://localhost:8080/meals')
        cy.get("#recipe-eggs").type(3)
        cy.get("#recipe-pasta").type(1040)
        cy.get("#recipe-butter").type(1010)
        cy.get("#recipe-milk").type(405)
        cy.get("#recipe-oil").type(300)
        cy.get("#recipe-bacon").type(410)
        cy.get("form").submit().then(() => {
            cy.location().then(loc => {
                expect(loc.href).to.include("2")
            })
        })
        cy.get('.banner__text').find('span')
            .invoke('text')
            .then((text) => {
                expect(text.toString()).to.contain("2")
            })

    })
    it('should return the right calculation', () => {

    })


})

describe('Stores Page should act properly', () => {
    // => cookie
    it('should render the page without cookies', () => {
        cy.visit('http://localhost:8080/restaurants').then(() => {
            cy.getCookie('joke').then(e => {
                expect(e).to.be.null
            })
        })
    });

    it('should show that store list contains 9999 stores', () => {
        cy.visit('http://localhost:8080/restaurants')
        cy.get('.store-list p').invoke("text").then(e => {
            expect(e.toString()).to.contain('9999')
        })
    });

    it('should always show a joke', () => {
        cy.visit('http://localhost:8080/restaurants')

        cy.intercept({
            method: "GET",
            url: "https://api.jokes.one/jod?category=knock-knock",
        }).as("dataGetFirst");

        cy.wait("@dataGetFirst").then(() => {
            cy.get('.__joke_container h4').invoke('text').then(e => {
                expect(e.toString()).to.contain('Knock Knock')
            })
        })

        cy.reload()

        cy.getCookie('joke').then(e => {
            expect(e).to.not.be.null
        })


    });


    // => infinite scrooll
    it('should have 32 stores on the DOM', () => {
        cy.visit('http://localhost:8080/restaurants')
        cy.get('.store-list .store-list__container .store-list__item').then((e) => {
            expect(e.length).to.be.eq(32)
        })
    });


    // => search 
    it('should should show more stores when scrolled to bottom', () => {
        cy.visit('http://localhost:8080/restaurants')
        cy.scrollTo('bottom').then(() => {
            cy.wait(2000).then(() =>
                cy.get('.store-list .store-list__container .store-list__item').then((e) => {
                    expect(e.length).to.be.greaterThan(32)
                })
            )
        })
    });


    it('should show only one element when searched for 001', () => {
        cy.visit('http://localhost:8080/restaurants')
        cy.get("input").type('001').then(() => {
            cy.get('.store-list .store-list__container .store-list__item').then((e) => {
                expect(e.length).to.be.lessThan(32)
            })
        })
    });
})
