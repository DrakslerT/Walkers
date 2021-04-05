# Dokument zahtev

|                             |                                                         |
| :-------------------------- | :------------------------------------------------------ |
| **Naziv projekta**          | **TO-DO** naziv projekta                                |
| **Člani projektne skupine** | **TO-DO** 1. član, 2. član, 3. član, 4. član in 5. član |
| **Kraj in datum**           | **TO-DO** kraj, datum                                   |

## Povzetek projekta

V spodnjem dokumentu je navedena specifikacija zahtev za Dog Walkers, interaktivno aplikacijo za povezovanje lastnikov psov in sprehajalcev. Glavna komponenta aplikacije bo iskalnik, ki bo filtriral po oglasih in pomagal lastnikom najti idealnega sprehajalca za svojega najboljšega prijatelja. Lastniku in sprehajalcu bo nato omogočena enostavna izmenjava kontakta in dogovora za nadaljne sodelovanje. Aplikacija se bo preko zunanjega vmesnika Google Calendar povezovala tudi z uporabnikovim osebnim koledarjem, kar bo pripomoglo k upoštevanju terminov. Povezana bo tudi z vmesnikom theDogApi, ki po ponujal splošne informacije o pasmah. V dokumentu so zapisane vse funkcionalne in nefunkcionalne zahteve aplikacije, diagrami primerov uporabe ter osnutki zaslonskih mask.

## 1. Uvod

**TO-DO**

- V uvodu opišite problemsko domeno (kateri problem bo naša aplikacija reševala) in kratek pregled glavnih funkcionalnosti (kaj vse bo aplikacija počela).

## 2. Uporabniške vloge

**TO-DO**

- Opredelite glavne tipe uporabnikov vaše aplikacije glede na funkcionalnosti, ki jih imajo na voljo.
- Zelo pomembno je, da uporabniške vloge konsistentno imenujete. Na primer, če ste definirali vlogo **učitelj**, morate povsod uporabljati samostalnik **učitelj**, ne pa morda **profesor** ali **pedagog**. Tehniška besedila žal ne morejo dosegati leposlovnih standardov, tudi če so še tako dobro napisana.

## 3. Slovar pojmov

| Termin      | Opredelitev                                                                                                                                |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| Uporabnik   | Uporabnik je vsak registriran uporabnik v aplikaciji. Uporabnik lahko nastopa v vlogi lastnika, sprehajalca ali izkušenega sprehajalca.                            |
| Lastnik     | Uporabnik z vlogo lastnik je uporabnik, ki ima na svojem profilu poleg svojih informacij, tudi informacije o svojem psu.                   |
| Sprehajalec | Uporabnik z vlogo sprehajalec je uporabnik, ki objavlja oglase.                                                                             |
| Komentar    | Komentar je tekstovni zapis, ki ga lastnik lahko podeli sprehajalcu po opravljenem sprehodu.                                               |
| Ocena       | Ocena je celoštevilčno število na intervalu 1 - 5, ki ga lastnik obvezno podeli sprehajalcu po opravljenem sprehodu.                         |
| Oglas       | Oglas je zbirka informacij o sprehajalcu, prostem terminu, priljubljene pasme in lokaciji, ki jo objavi sprehajalec v želji, da prejme ponudbo s strani lastnika. |
| Ponudba     | Ponudba je obvestilo, ki ga prejme sprehajalec, ko se na njegov oglas odzove lastnik. Ponudbo lahko sprehajalec sprejme ali zavrne.        |
| Sprehod     | Sprehod je dogovorjen termin, ko sprehajalec skrbi za lastnikovega psa.                                                              |
| Profil      | Profil uporabnika je zbirka nastavitev, informacij in vlog, povezanih z uporabnikom.                                                        |
| Kodeks      | Je seznam pravil in načina obnašanja, ki jih vsak novo registrirani uporabnik prebere in sprejme. Kršitve kodeksa se kaznuje z začasno zaklenitvijo računa.                                                                                                                                         |
|Priljubljen sprehajalec | Je sprehajalec, ki ga lastnik označi za priljubljenega. |
|Kršitelj                         | Je uporabnik, ki ima več prijav kršitve kodeksa s strani različnih uporabnikov |
| Iskalnik | Osrednja komponenta aplikacije, kjer lastniki iščejo primerne oglase |

## 4. Diagram primerov uporabe

**TO-DO**

- Narišite diagram primerov uporabe v jeziku UML.
- Diagram predstavlja interakcijo med akterji in funkcionalnostmi (kdo lahko kaj počne).
- Akterji so tipično uporabniške vloge, lahko pa gre tudi za zunanje komponente (sistemi), ki komunicirajo z našo aplikacijo.

## 5. Funkcionalne zahteve

V tem razdelku podrobno opišite posamezne funkcionalnosti, ki jih vaša aplikacija ponuja svojim uporabnikom. Za vsako funkcionalnost navedite naslednje podatke:

### TO-DO Naziv zahteve

#### Povzetek funkcionalnosti

**TO-DO**

- **Povzetek funkcionalnosti** v enem ali največ nekaj stavkih.
- Prvi stavek naj se prične z nazivom uporabniške vloge (ali uporabniških vlog, če se funkcionalnost nanaša na več kot eno vlogo), nato pa naj sledita beseda **lahko** in navedba funkcionalnosti.

#### Osnovni tok

**TO-DO**

#### Alternativni tok(ovi)

**TO-DO**

- Navesti je potrebno vse alternativne tokove, ki jih označite kot **Alternativni tok 1**, **Alternativni tok 2**, itd.

#### Pogoji

**TO-DO**

- Navesti je potrebno pogoje, ki morajo biti izpolnjeni, da se funkcionalnost lahko prične izvajati?

#### Posledice

**TO-DO**

- Navedite, kakšen je rezultat izvedbe osnovnega toka funkcionalnosti?

#### Posebnosti

**TO-DO**

- Ali realizacija funkcionalnosti zahteva kakšne posebnosti, kot je npr. dodatna strojna oprema?
- Se je potrebno držati kakšnih posebnih standardov?

#### Prioritete identificiranih funkcionalnosti

**TO-DO**

- Za identificirane funkcionalnosti se z metodo **MoSCoW** (MUST have, SHOULD have, COULD have in WOULD have) določi prioritete.

#### Sprejemni testi

**TO-DO**

- Navedite sprejmne teste, kjer opišete:
  - funkcijo, ki se testira,
  - začetno stanje sistema,
  - vhod in
  - pričakovan rezultat.

## 6. Nefunkcionalne zahteve

**TO-DO**

- Navedite splošne omejitve, ki jih moramo upoštevati v več funkcionalnostih ali celo skozi celoten razvoj aplikacije.

## 7. Prototipi vmesnikov

**TO-DO**

- Navesti je potrebno: zaslonske maske, sistemske vmesnike in vmesnike do naprav, vključno z referencami do primerov uporabe.
