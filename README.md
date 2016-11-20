# Alkalmazások fejlesztése beadandó
##HouseholdBudgets
###### Készítette: Dobos Árpád (MW05PC)
###Követelményanalízis
####Feladat és célkitűzés

A program célja egy egyszerű háztartás költségvetésének nyomonkövetése. Az adatok védelme érdekében regisztráció szükséges.
A fő feladatok: bevétel/kiadás rögzítése, módosítása, törlése, háztartás bevételének/kiadásának listázása.

####Funkcionális követelmények:
- **Adminisztrátorként:**
	* Bejelentkezés a főoldalon
	* Jelszó megváltoztatása
	* Új háztartás létrehozása
	* Háztartás törlése
	* Új lakó regisztrálása
	* Lakó hozzárendelése egy háztartáshoz
	* Lakó törlése
	* Kijelentkezése
  
- **Lakóként:**
  * Bejelentkezés a főoldalon
  * Jelszó megvátoztatása
  * Bevétel hozzáadása/törlése/módosítása
  * Kiadás hozzáadása/törlése/módosítása
  * Bevétel/kiadása listázása
  * Kijelentkezés
  
####Nem funkcionális követelmények:
- Ergonomikus elrendezése, felhasználóbarát felület
- Könnyen megérthető és elsajátítható működés
- Biztonságos, jelszóval védett adatok
- Könnyen karbantartható és bővíthető
- Egyértelmű hibajelzések
- Gyors működés

####Szakterületi fogalomjegyzék:
- **Háztartás:** azon személyek összessége, amelyek egy fogyasztói közösséget alkotnak és költségeiket közösen viselik
- **Lakó:** az a természetes személy, aki az adott háztartásban életvitelszerűen él

####Osztálymodell

![](Images/nomnoml/osztalymodell.png)

####Használatieset-modell, szerepkörök
- **Közös tulajdonságok:** Bejelentkezés, jelszó módosítása, kijelentkezés
- **Admin:** Új lakó beregisztrálása/trölése, lakó hozzárendelése egy háztartáshoz, háztartás létrehozása/törlése/módosítása
- **Lakó:** Adatok módosítása, bevétel létrehozása/módosítása/törlése, kiadás létrehozása/módosítása/törlése, bevétel/kiadás listázása

![](Images/nomnoml/hasznalatiesetmodell.png)

####Példa egy folyamatra:
Lakóként egy új kiadást hozunk létre:

1. Egy felhasználó a főoldalról bejelentkezik lakóként
2. A kiadásoknál a megadja az adatokat majd jóváhagyja a módosításokat
3. Ha nem sikerült a kiadás létrehozása akkor javítja a hibákat
4. A kiadás létrehozása után létrehozhat többet is
5. Kijelentkezése

![](Images/nomnoml/folyamtabra.png)

###Tervezése
####OldalTérkép
- **Publikus:**
	* Bejelentkezés
- **Bejelentkezett:**
	* Főoldal
		* Adminisztrátor:
			* Lakók
			* Háztartások
		* Lakó:
			* Bevétel/kiadás listája
	* Lakók
		* Adminisztrátor:
			* Új lakó felvétele
			* Lakó törlése
			* Lakó háztartáshoz rendelése
	* Háztartások:
		* Adminisztrátor:
			* Új háztartás létrehozása
			* Háztartás törlése
	* Bevételek/Kiadások:
		* Lakó:
			* Új létrehozása
			* Módosítás
			* Törlés
			
####Végpontok
User:
- GET/: bejelentkező oldal
- POST/: bejelentkező adatok elküldése
- GET/home: főoldal oldal
- GET/registration: felhasználó regisztrálása
- POST/registration: felhasználó adatainak elküldése
- GET/logout: kijelentkezés
- GET/addressReg: cím regisztrálása
- POST/addressReg: lakás adatainak elküldése
- GET/newbudget/edit=id: új bevétel/kiadás rögzítése
- POST/newbudget/edit=id: új bevétel/kiadás adtai elküldése
- GET/showbudgets: felhasználó költségeinek listázása
- GET/editbudgets/edit=id: költség adatainak módosítása
- POST/editbudgets/edit=id: költség adatainak elküldése
- GET/delete/edit=id: költség törlése
- GET/editUser/edit=id: felhasználó adatainak módosítása
- POST/editUser/edit=id: felhasználó addatainak elküldése
- GET/changePassword/edit=id: jelszó módosítása
- POST/changePassword/edit=id: módosított jelszó elküldése

Admin:
- GET/changeUser/edit=id: kiválasztott felhasználó adatainak módosítása
- POST/changeUser/edit=id: felhasználó adatainak elküldése
- GET/changeUser/edit=id/delete: kiválasztott felhasználó törlése
- GET/listHouseholds: lakások kilistázása
- GET/editAddress/edit=id: lakás adatainak szerkesztése
- POST/editAddress/edit=id: lakás adataink elküldése
- GET/delete/edit=id: lakás törlése

####Oldalvázlatok

![](Images/mockup/Bejelentkezes.jpg)

![](Images/mockup/Fooldal_Admin.jpg)

![](Images/mockup/Fooldal_Lako.jpg)

![](Images/mockup/Haztartasok.jpg)

![](Images/mockup/Uj_Haztartas.jpg)

![](Images/mockup/Lakok.jpg)

![](Images/mockup/Uj_Lako.jpg)

![](Images/mockup/Bevetelek_Kiadasok.jpg)

![](Images/mockup/Uj_Bevetel_Kiadas.jpg)

![](Images/mockup/Profil.jpg)