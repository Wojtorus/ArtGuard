import { KartaDostepu } from "./src/klasy/KartaDostepu";
import {PrzenoszenieZZewnetrzenjDoTransakcji} from "./src/index"

export class Tester{
    private listaStrefaZewnetrzna: KartaDostepu[];
    private listaStrefaTransakcji: KartaDostepu[];
    private listaStrefaOperacyjna: KartaDostepu[];
    private listaStrefaZabezpieczona: KartaDostepu[];

    constructor() {
        // Inicjalizacja list kart dostępu dla każdej strefy
        this.listaStrefaZewnetrzna = []/* Twoja inicjalizacja */
        this.listaStrefaTransakcji = [];
        this.listaStrefaOperacyjna = [];
        this.listaStrefaZabezpieczona = [];
    }

    TestPrzeniesPracownikaZZewnetrznejDoTransakcji(){
        var karta = new KartaDostepu(1,"Wojciech", "Ostrouch","Art",56);
        var pracownikTransakcjiId = karta.Id;
        PrzenoszenieZZewnetrzenjDoTransakcji(karta.Id);
        const czyPracownikTransakcjiWOperacyjnej = this.listaStrefaOperacyjna.some(karta => karta.Id === pracownikTransakcjiId);
        console.log("test pracownik wchodzi: ",czyPracownikTransakcjiWOperacyjnej);
    }

    uruchomWszystkieTesty() {
        console.log("Rozpoczynanie testów:");
        this.TestPrzeniesPracownikaZZewnetrznejDoTransakcji();
        //this.testPrzeniesienieDoStrefyOperacyjnej();
        //this.testLimitPracownikowWStrefieZabezpieczonej();
        //this.testOgraniczenieWejsciaDozorcy();
        //this.testOgraniczeniePracownikaTransakcjiWStrefieOperacyjnej();
        console.log("Testy zakończone.");
    }
}



  

