import { KartaDostepu } from "./klasy/KartaDostepu";
import { Tester } from "../Tester";

var listaStefaZewnetrzna : KartaDostepu[] = [
    new KartaDostepu(  2, "Marek","Nowak", "ArtGuard", 1),
    new KartaDostepu(11, "Andrzej","Dawydzik","ArtGuard", 72,),
    new KartaDostepu(13, "Anna","Kowalska","ArtGuard", 123),
    new KartaDostepu(3, "Aleksandra","Dworzak","ArtGuard", 153,),
    new KartaDostepu(4, "Krzysztof","Jankowski","ArtGuard", 107,),
    new KartaDostepu(5, "Agnieszka","Wójcik","ArtGuard", 230,),
    new KartaDostepu(6, "Paweł","Nowiski","ArtGuard", 412,),
    new KartaDostepu(7, "Katarzyna","Kaczmarek","ArtGuard", 351,),
    new KartaDostepu(8, "TOmasz","Adamczyk","ArtGuard", 665,),
    new KartaDostepu(9, "Joanna","Sikora","ArtGuard", 725,),
    new KartaDostepu(10, "Piotr","Gorski", "ArtGuard",1128,),
    new KartaDostepu(12, "Marta","Zawadzki", "ArtGuard",1032,)
];

var listaStefaTransakcji : KartaDostepu[] = []; 
var listaStefaOperacyjnej : KartaDostepu[] = [];
var listaStefaZabezpieczona : KartaDostepu[] = [];


function PodczasPierwszegoLadowania()
{
    console.log("Podczas pierwszego ladowania")
    let tabelaStrefyZewnetrznej  = document.getElementById("StrefaZewnetrzna"); 
    
    if (tabelaStrefyZewnetrznej)
    {
        console.log("tabela zewnetrzna");
        let linia = "";    
        for(var KartaDostepu of listaStefaZewnetrzna)
        {
            linia  += TworzenieZawartosciTabeli(KartaDostepu);           
        }
        tabelaStrefyZewnetrznej.innerHTML = linia;
        
        tabelaStrefyZewnetrznej.querySelectorAll('.btn-primary').forEach(button => {
            button.addEventListener('click', function() {
                PrzenoszenieZZewnetrzenjDoTransakcji(parseInt(this.getAttribute('data-id')));
                PodczasPierwszegoLadowania();
            });
        });

        tabelaStrefyZewnetrznej.querySelectorAll('.btn-danger').forEach(button=>{
            button.addEventListener("click",function(){
                UsunPracownkaStefaZewnetrzna(parseInt(this.getAttribute("data-zwolnij")));
                PodczasPierwszegoLadowania();
            })
        })
    } 
    else
    {
        console.warn("Bład!!!!!!!!");
    }
    
}

function TworzenieZawartosciTabeli(karta : KartaDostepu) : string
{
    console.log("Tworzenie wierszu: ",karta);
     return  `<tr>
            <td>${karta.NumerKarty}</td>
            <td>${karta.Imie}</td>
            <td>${karta.Nazwisko}</td>
            <td>
                <button class="btn btn-info">Info</button>
                <button class="btn btn-danger" data-Wroc = "${karta.Id}">Wróć do strefy Zewnętrznej</button>
                <button  class="btn btn-primary" data-id="${karta.Id}">Idz do strefy Operacyjnej</button>
            </td>
         </tr>`;
}
function StrefaTransakcji()
{
    let tabelaStrefyTransakcji = document.getElementById("StrefaTransakcji");
    if(tabelaStrefyTransakcji)
    {    
        let linia = "";    
        for(var KartaDostepu of listaStefaTransakcji)
        {
             linia  += TworzenieZawartosciTabeli(KartaDostepu);           
        }
        tabelaStrefyTransakcji.innerHTML = linia;

        tabelaStrefyTransakcji.querySelectorAll(".btn-primary").forEach(button => {
            button.addEventListener('click', function() {
                console.log("klikniecie przycisku strfa transkacji");
                PrzenoszenieZTransakcjiDoOperacyjnej(parseInt(this.getAttribute('data-id')));
                StrefaTransakcji();
                
            });
        });

        tabelaStrefyTransakcji.querySelectorAll('.btn-danger').forEach(button=>{
            button.addEventListener("click",function(){
                UsunPracownkaStefaTransakcji(parseInt(this.getAttribute("data-Wroc")));
                StrefaTransakcji();
            });
        })
        
    }
    else
    {
        console.warn("Blad");
    }
}

function StrefaOperacyjna()
{
    let tabelaStrefyOperacyjnej = document.getElementById("StrefaOperacyjna");
    if(tabelaStrefyOperacyjnej)
    {
        let linia = "";    
        for(var KartaDostepu of listaStefaOperacyjnej)
        {
             linia  += TworzenieZawartosciTabeli(KartaDostepu);           
        }
        tabelaStrefyOperacyjnej.innerHTML = linia;

        tabelaStrefyOperacyjnej.querySelectorAll(".btn-primary").forEach(button => {
            button.addEventListener('click', function() {
               
                PrzenoszenieZOperacyjnejDoZabezpieczonej(parseInt(this.getAttribute('data-id')));
                StrefaOperacyjna();
                
            });
        });

        tabelaStrefyOperacyjnej.querySelectorAll('.btn-danger').forEach(button=>{
            button.addEventListener("click",function(){
                UsunPracownkaStefaOperacyjna(parseInt(this.getAttribute("data-Wroc")));
                StrefaOperacyjna();
            })
        })
    }
}

function StrefaZabezpieczona()
{
    let tabelaStrefyZabezpieczonej = document.getElementById("StrefaZabezpieczona");
    if(tabelaStrefyZabezpieczonej)
    {
        let linia = "";    
        for(var KartaDostepu of listaStefaZabezpieczona)
        {
            linia  += TworzenieZawartosciTabeli(KartaDostepu);           
        }
       tabelaStrefyZabezpieczonej.innerHTML = linia;

       tabelaStrefyZabezpieczonej.querySelectorAll('.btn-danger').forEach(button=>{
        button.addEventListener("click",function(){
            UsunPracownkaStefaZabezpieczona(parseInt(this.getAttribute("data-Wroc")));
            StrefaZabezpieczona();
        })
    })
    }
}

export function PrzenoszenieZZewnetrzenjDoTransakcji(id : number)
{
    let tabelaStrefyTransakcji  = document.getElementById("StrefaTransakcji");
    if(tabelaStrefyTransakcji)
    {
        var czyKartaIstnieje = listaStefaZewnetrzna.filter(x=>x.Id==id);
        if(czyKartaIstnieje.length>0 && listaStefaTransakcji.length<7 && (czyKartaIstnieje[0].NumerKarty <1000 || listaStefaTransakcji.length > 0 ))
        {
            var redukcjaZewnetrznej = listaStefaZewnetrzna.filter(x=>x.Id !=id);
            listaStefaZewnetrzna= redukcjaZewnetrznej;
            listaStefaTransakcji.push(czyKartaIstnieje[0]);
            StrefaTransakcji();
        }
        else
        {
            window.alert("Taki Pracownik nie istnije lub przekroczono pojemnosc strefy Transakcji")
        }
    }
    else
    {
        console.warn("Błąd!!");
    }
    
}

function PrzenoszenieZTransakcjiDoOperacyjnej(id : number)
{
    let tabelaStrefyOperacyjnej = document.getElementById("StrefaOperacyjna");
    if(tabelaStrefyOperacyjnej)
    {
        console.log("Poszukiwany nummer id: ", id);
        var czyKartaIstnieje = listaStefaTransakcji.filter(x=>x.Id==id);
        console.log("czy istnieje: ", czyKartaIstnieje);
        if(czyKartaIstnieje.length>0 && listaStefaOperacyjnej.length < 5 && (czyKartaIstnieje[0].NumerKarty < 501 || czyKartaIstnieje[0].NumerKarty > 999) && (czyKartaIstnieje[0].NumerKarty <1000 || listaStefaOperacyjnej.length > 0 ) )
        {
            console.log("Przenszenie pracownika");
            var redukcjaTransakcji = listaStefaTransakcji.filter(x=>x.Id != id);
            listaStefaTransakcji = redukcjaTransakcji;
            listaStefaOperacyjnej.push(czyKartaIstnieje[0]);
            StrefaOperacyjna();
        }
        else
        {
            window.alert("Taki Pracownik nie istnije lub przekroczono pojemnosc strefy Operacyjnej")
        }
    }
    else
    {
        console.warn("Błąd!!");
    }
}

function PrzenoszenieZOperacyjnejDoZabezpieczonej(id : number)
{
    let tabelaStrefyZabezpieczonej = document.getElementById("StrefaZabezpieczona");
    if(tabelaStrefyZabezpieczonej)
    {
        console.log("Poszukiwany nummer id: ", id);
        var czyKartaIstnieje = listaStefaOperacyjnej.filter(x=>x.Id==id);
        if(czyKartaIstnieje.length>0 && listaStefaZabezpieczona.length < 2 && (czyKartaIstnieje[0].NumerKarty < 201 || czyKartaIstnieje[0].NumerKarty > 500) && (czyKartaIstnieje[0].NumerKarty <1000 || listaStefaZabezpieczona.length > 0 ))
        {
            var redukcjaOperacyjna = listaStefaOperacyjnej.filter(x=>x.Id != id);
            listaStefaOperacyjnej = redukcjaOperacyjna;
            listaStefaZabezpieczona.push(czyKartaIstnieje[0]);
            StrefaZabezpieczona();
        }
        else
        {
            window.alert("Taki Pracownik nie istnije lub przekroczono pojemnosc strefy Zabezpieczonej")
        }
    }
}

function UsunPracownkaStefaZewnetrzna(id: number){
    console.log("Usuwanie praconika");
    //let tabelaStrefyZewnetrznej  = document.getElementById("StrefaZewnetrzna"); 
    var szukanyPracownikStrefaZewnetrzna = listaStefaZewnetrzna.filter(x=>x.Id==id);
    if(szukanyPracownikStrefaZewnetrzna.length>0){
        var listaPracownikowStrefaZewnetrzna = listaStefaZewnetrzna.filter(x=>x.Id!=id);
        listaStefaZewnetrzna = listaPracownikowStrefaZewnetrzna;
        PodczasPierwszegoLadowania();

    }

}

function UsunPracownkaStefaTransakcji(id : number)
{
console.log("Usuwanie pracownika");
var szukanyPracownikStrefaTransakcji = listaStefaTransakcji.filter(x=>x.Id==id);
    if(szukanyPracownikStrefaTransakcji.length>0)
    {
        var listaPracownikowStrefaTransakcji = listaStefaTransakcji.filter(x=>x.Id!=id);
        listaStefaTransakcji = listaPracownikowStrefaTransakcji;
        listaStefaZewnetrzna.push(szukanyPracownikStrefaTransakcji[0]);
        StrefaTransakcji();
        PodczasPierwszegoLadowania();
    }
}

function UsunPracownkaStefaOperacyjna(id : number)
{
console.log("Usuwanie pracownika");
var szukanyPracownikStrefaOperacyjny = listaStefaOperacyjnej.filter(x=>x.Id==id);
    if(szukanyPracownikStrefaOperacyjny.length>0 && listaStefaTransakcji.length < 7 && (szukanyPracownikStrefaOperacyjny[0].NumerKarty <1000 || listaStefaTransakcji.length > 0 ))
    {
        var listaPracownikowStrefaOperacyjna = listaStefaOperacyjnej.filter(x=>x.Id!=id);
        listaStefaOperacyjnej = listaPracownikowStrefaOperacyjna;
        listaStefaTransakcji.push(szukanyPracownikStrefaOperacyjny[0]);
        StrefaTransakcji();
        StrefaOperacyjna();
    }
    else
    {
        window.alert("Taki Pracownik nie istnije lub przekroczono pojemnosc strefy Transakcji")
    }
}

function UsunPracownkaStefaZabezpieczona(id : number)
{
    console.log("Usuwanie pracownika");
    var szukanyPracownikStrefaZabezpieczona = listaStefaZabezpieczona.filter(x=>x.Id==id);
    if(szukanyPracownikStrefaZabezpieczona.length>0 && listaStefaOperacyjnej.length < 5 && (szukanyPracownikStrefaZabezpieczona[0].NumerKarty <1000 || listaStefaOperacyjnej.length > 0 ))
    {
        var listaPracownikowStrefaZabezpieczona = listaStefaZabezpieczona.filter(x=>x.Id!=id);
        listaStefaZabezpieczona = listaPracownikowStrefaZabezpieczona;
        listaStefaOperacyjnej.push(szukanyPracownikStrefaZabezpieczona[0]);
        StrefaZabezpieczona();
        StrefaOperacyjna();
    }
    else
        {
            window.alert("Taki Pracownik nie istnije lub przekroczono pojemnosc strefy Operacyjnej")
        }
}


PodczasPierwszegoLadowania();

// var test = document.getElementById("test") as HTMLButtonElement;

// test.addEventListener("click",() => {

//     console.log("Ladowanie")
//     PodczasPierwszegoLadowania();
// })

