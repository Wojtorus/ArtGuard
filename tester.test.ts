import {Tester} from "./Tester";



var tester = new Tester();
tester.uruchomWszystkieTesty();


test("praconik wchdzi do transakcji", ()=>{
    expect(tester.TestPrzeniesPracownikaZZewnetrznejDoTransakcji()).toBeTruthy();
})