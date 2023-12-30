export class KartaDostepu
{
      Id : number;
      Imie : string;
      Nazwisko : string;
      Placowka : string;
      NumerKarty  : number;
    constructor (id : number, imie : string, nazwisko : string, placowka : string, numerkarty : number)
    {
        this.Id = id;
        this.Imie = imie;
        this.Nazwisko = nazwisko;
        this.Placowka = placowka;
        this.NumerKarty = numerkarty;
    }
}