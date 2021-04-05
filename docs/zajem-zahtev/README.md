# Dokument zahtev

|                             |                                                         |
| :-------------------------- | :------------------------------------------------------ |
| **Naziv projekta**          | **TO-DO** naziv projekta                                |
| **Člani projektne skupine** | **TO-DO** 1. član, 2. član, 3. član, 4. član in 5. član |
| **Kraj in datum**           | **TO-DO** kraj, datum                                   |

## Povzetek projekta

V spodnjem dokumentu je navedena specifikacija zahtev za Dog Walkers, interaktivno aplikacijo za povezovanje lastnikov psov in sprehajalcev. Glavna komponenta aplikacije bo iskalnik, ki bo filtriral po oglasih in pomagal lastnikom najti idealnega sprehajalca za svojega najboljšega prijatelja. Lastniku in sprehajalcu bo nato omogočena enostavna izmenjava kontakta in dogovora za nadaljne sodelovanje. Aplikacija se bo preko zunanjega vmesnika Google Calendar povezovala tudi z uporabnikovim osebnim koledarjem, kar bo pripomoglo k upoštevanju terminov. Povezana bo tudi z vmesnikom theDogApi, ki po ponujal splošne informacije o pasmah. V dokumentu so zapisane vse funkcionalne in nefunkcionalne zahteve aplikacije, diagrami primerov uporabe ter osnutki zaslonskih mask.

## 1. Uvod

**Kateri problem bo naša aplikacija reševala?**

Aplikacija Dog Walkers je namenjena lastnikom psov in vsem ljubiteljem živali, ki se želijo občasno ukvarjati z njimi. Skrb za hišnega ljubljenčka namreč zahteva veliko časa in lastnik se bo slej ko prej znašel v situaciji, ko bo potreboval pomoč. Z uporabo te aplikacija jo bo enostavno našel, saj se bo lahko povezal z ljudmi, ki imajo veselje do živali in so zainteresirani za krajšo oskrbo oziroma sprehajanje psov.
Z aplikacijo torej želimo razbremeniti lastnike psov in jim pomagati kar se da enostavno najti primerno pomoč pri oskrbi njihovih ljubljenčkov. Po drugi strani želimo tudi omogočiti preživljanje časa s pasjimi ljubljenčki nelastnikom, ki jih to veseli.

**Kaj vse bo aplikacija počela?**

Za uporabo ostalih funkcionalnosti aplikacije se mora neregistriran uporabnik najprej registrirati v sistem. Pri tem lahko izbira med registracijo kot lastnik ali kot sprehajalec. Glede na izbiro ima po registraciji pri uporabi aplikacije na voljo različne funkcionalnosti. Uporabnik se lahko po registraciji prijavlja v sistem, kjer ima omogočeno urejanje svojega profila.
Sprehajalec ima poleg tega na voljo tudi možnost objavljanja oglasov, istočasno največ pet. V oglasih napiše kdaj je časovno na voljo za sprehajanje psa, poda lokacijo in po želji še preference glede pasme psa, za katere bi bil pripravljen skrbeti.
Oglasi sprehajalcev so namenjeni lastnikom. Ti imajo na voljo možnost prikaza oglasov, ki se jim razvrstijo glede na priporočilni sistem. Sem je vključen povprečni odzivni čas sprehajalca (hitreje kot se odzove na ponudbe, višje je uvrščen), morebitne prijave kršitev (če ima prijavljene kršitve se uvrsti nižje) in višina ocene sprehajalca (višje kot je ocenjen, višje se uvrsti). Lastnik ima omogočeno tudi filtriranje med oglasi. Parametre filtra sestavljajo lokacija, čas termina in pasma psa, ki je lahko specificirana v oglasu. Poleg tega si lahko tudi označi najljubše sprehajalce.
Lastnik lahko po ogledovanju oglasov izbranim pošlje ponudbo za sprehod. Sprehajalca, ki mu je bila poslana ponudba, aplikacija o tem obvesti. Sprehajalec lahko ponudbo sprejme ali zavrne. Če jo zavrne, sistem to sporoči lastniku. Če ponudbo sprejme, se s pritrdilnim odgovorom lastniku posreduje tudi kontakt sprehajalca in obema se termin preko zunanjega vmesnika Google Calendar zapiše v osebni koledar. Tako lahko lastnik in sprehajalec, ki sta izbrala skupni termin, navežeta stik in se dogovorita za vse ostale podrobnosti.
Lastniki imajo tudi možnost ocenjevanja sprehajalcev. Ko se sprehod, za katerega sta se lastnik in sprehajalec dogovorila, izteče, je lastnik pozvan k obvezni podaji ocene. Dokler je ne poda, ne more nadaljevati z uporabo aplikacije. Opcijsko lahko doda tudi komentar.
Ob povprečni oceni vsaj štiri in dovolj hitrem odzivnem času, se sprehajalec lahko nadgradi v izkušenega sprehajalca. Ta ima poleg vseh funkcionalnosti, ki so na voljo sprehajalcu, možnost objavljanja neomejenega števila oglasov.
Ker želimo zagotoviti kar se da pozitivno in varno uporabo aplikacije, ima uporabnik ob morebitnih incidentih tudi možnost prijave kršitev. S tem namenom obstaja še uporabniška vloga administratorja. Ta si pridržuje pravico, da lahko briše oglase sprehajalcev in uporabniku, glede na resnost in količino prijav, začasno zaklene račun.

**Kaj pa nefunkcionalne zahteve aplikacije?**

Pri aplikaciji Dolg Walkers se pričakuje izpolnitev še nekaj nefunkcionalnih zahtev. Aplikacija mora biti podprta na modernih brskalnikih in ne sme zahtevati nikakršnega nalaganja s strani odjemalca. Ob čakanju in nalaganju mora o tem jasno obvestiti uporabnika. Sistem uporabniku ne sme omogočiti dostopa do kontaktnih podatkov, za katere ni izrecno pooblaščen in pričakuje se uporabniški vmesnik prilagodljiv mobilnim napravam. Aplikacija mora biti vedno na voljo, z največjim dopustnim časom nedelovanja 5 sekund. Zahteva se zagotavljanje pristnosti uporabnikov z uporabo OTP potrdila pri registraciji uporabniškega računa. Razvoj zalednega sistema bo potekal v okolju Node.js, uporabniški vmesnik pa bo zgrajen iz ponovno uporabnih komponent. Aplikacija mora biti skladna s standardom WCAQ 2.1 in pri zbiranju uporabniških podatkov upoštevati zakon o varstvu osebnih podatkov. Kodeks aplikacije se ravna po Zakonu o zaščiti živali (ZZZiv).

## 2. Uporabniške vloge

- **lastnik** (lahko ureja svoj profil, si ogleduje in filtrira po oglasih sprehajalcev, si označi najljubše sprehajalce, pošilja ponudbe in vnaša ocene sprehajalcem, pregleduje zgodovino sprehodov in prijavlja kršitve)
- **sprehajalec** (lahko objavi največ 5 oglasov in jih ureja, ureja svoj profil, vnaša ocene in komentarje lastnikom, pregleduje zgodovino sprehodov ter prijavlja kršitve)
- **neregistriran uporabnik** (lahko se registrira v sistem)
- **administrator** (lahko izbriše oglase in odstrani uporabnike iz aplikacije)
- **izkušen sprehajalec** (lahko uporablja vse funkcionalnosti kot sprehajalec, a nima omejenega števila oglasov, ki jih lahko objavi)

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
