-- Sjekke at tabellene finnes
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public';

-- Slette testdata som ble laget i main
TRUNCATE TABLE coffee_flavours,
coffee,
flavour,
variety,
country,
continent
RESTART IDENTITY CASCADE;

-- Lage flavour-tabellen:
insert into flavour (name)
values ('Melkesjokolade');

insert into flavour (name)
values ('Nøtter');

insert into flavour (name)
values ('Bergamott');

insert into flavour (name)
values ('Bær');

insert into flavour (name)
values ('Sitrus');

insert into flavour (name)
values ('Karamell');

insert into flavour (name)
values ('Blomster');

insert into flavour (name)
values ('Krydder');

insert into flavour (name)
values ('Vanilje');

insert into flavour (name)
values ('Tobakk');

insert into flavour (name)
values ('Melon');

insert into flavour (name)
values ('Steinfrukt');

insert into flavour (name)
values ('Mørk sjokolade');

insert into flavour (name)
values ('Tofee');

insert into flavour (name)
values ('Havre');

-- Lage kontinent-tabellen:
insert into continent  (name)
values ('Afrika');

insert into continent  (name)
values ('Sør-Amerika');

insert into continent  (name)
values ('Mellom-Amerika');

insert into continent  (name)
values ('Asia');

-- Lage country-tabellen:
insert into country  (continentid, name)
values (1, 'Etiopia');

insert into country  (continentid, name)
values (2, 'Brasil');

insert into country  (continentid, name)
values (4, 'Indonesia');

insert into country  (continentid, name)
values (2, 'Colombia');


insert into country  (continentid, name)
values (3, 'Panama');

-- Lage variety-tabellen:
insert into variety (name)
values ('Heirloom');

insert into variety (name)
values ('Bourbon');

insert into variety (name)
values ('Typica');

insert into variety (name)
values ('Caturra');

insert into variety (name)
values ('Gesha');

-- Lage kaffe-tabellen:
insert into coffee (name, countryid, varietyid)
values ('Yirgacheffe', 1, 1);

insert into coffee (name, countryid, varietyid)
values ('Cerrado', 2, 2);

insert into coffee (name, countryid, varietyid)
values ('Sumatra', 3, 3);

insert into coffee (name, countryid, varietyid)
values ('Huila', 4, 4);

insert into coffee (name, countryid, varietyid)
values ('Gesha', 5, 5);

-- Lage kaffe-smak-tabellen:
insert into coffee_flavours (coffeeid, flavourid)
values(1 , 3);

insert into coffee_flavours (coffeeid, flavourid)
values(1 , 7);

insert into coffee_flavours (coffeeid, flavourid)
values(1 , 5);

insert into coffee_flavours (coffeeid, flavourid)
values(2 , 1);

insert into coffee_flavours (coffeeid, flavourid)
values(2 , 6);

insert into coffee_flavours (coffeeid, flavourid)
values(2 , 2);

insert into coffee_flavours (coffeeid, flavourid)
values(3 , 8);

insert into coffee_flavours (coffeeid, flavourid)
values(3 , 10);

insert into coffee_flavours (coffeeid, flavourid)
values(3 , 4);

insert into coffee_flavours (coffeeid, flavourid)
values(4 , 9);

insert into coffee_flavours (coffeeid, flavourid)
values(4 , 13);

insert into coffee_flavours (coffeeid, flavourid)
values(4 , 14);

insert into coffee_flavours (coffeeid, flavourid)
values(5 , 12);

insert into coffee_flavours (coffeeid, flavourid)
values(5 , 11);

insert into coffee_flavours (coffeeid, flavourid)
values(5 , 15);

