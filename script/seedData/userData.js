const users = [
  {
    firstName: 'JM',
    lastName: 'Cho',
    email: 'jeongmin@email.com',
    address: '9 Nobel Alley',
    password: '123'
  },
  {
    firstName: 'Jenni',
    lastName: 'Geraldini',
    email: 'jgeraldini1@kickstarter.com',
    address: '3372 Mayer Park',
    password: 'BKKlg3fcRgm'
  },
  {
    firstName: 'Othello',
    lastName: 'Kells',
    email: 'okells2@ehow.com',
    address: '512 Graedel Park',
    password: '4BUHMOrBE9yi'
  },
  {
    firstName: 'Lea',
    lastName: 'Seligson',
    email: 'lseligson3@dion.ne.jp',
    address: '637 Garrison Pass',
    password: 'IIpmPxTUs'
  },
  {
    firstName: 'Morganne',
    lastName: 'Kenington',
    email: 'mkenington4@slideshare.net',
    address: '15135 Center Park',
    password: 'XOkPRfW'
  },
  {
    firstName: 'Elfrida',
    lastName: 'Trahar',
    email: 'etrahar5@businesswire.com',
    address: '45 Shopko Place',
    password: 'gmEOfk4tXu'
  },
  {
    firstName: 'Imogen',
    lastName: 'Jentges',
    email: 'ijentges6@kickstarter.com',
    address: '68 Holmberg Place',
    password: 'dYwUhQD6'
  },
  {
    firstName: 'Cherrita',
    lastName: 'Taggerty',
    email: 'ctaggerty7@mail.ru',
    address: '9 Kinsman Alley',
    password: 'uF6AotGqcX'
  },
  {
    firstName: 'Lory',
    lastName: 'Lissandri',
    email: 'llissandri8@netlog.com',
    address: '085 Holmberg Center',
    password: 'I0PGjoBqFc'
  },
  {
    firstName: 'Elena',
    lastName: 'Porteous',
    email: 'eporteous9@webmd.com',
    address: '10258 Briar Crest Court',
    password: 'xWIvp13Jvaz'
  },
  {
    firstName: 'Lynnette',
    lastName: 'Dorran',
    email: 'ldorrana@engadget.com',
    address: '7 Shoshone Point',
    password: 'qdOGQaVCKNd'
  },
  {
    firstName: 'Darryl',
    lastName: 'Gilkes',
    email: 'dgilkesb@drupal.org',
    address: '16 Portage Avenue',
    password: '7jXvz2jRBsg5'
  },
  {
    firstName: 'Karrie',
    lastName: 'Khosa',
    email: 'kkhosac@goodreads.com',
    address: '7812 Gale Court',
    password: '5gljv8k'
  },
  {
    firstName: 'Rhoda',
    lastName: 'Blaise',
    email: 'rblaised@businessweek.com',
    address: '9795 Memorial Circle',
    password: 'Q4yvbRmCjpl'
  },
  {
    firstName: 'Clemens',
    lastName: 'Tzar',
    email: 'ctzare@scientificamerican.com',
    address: '45689 Pierstorff Lane',
    password: 'iLdT6k'
  },
  {
    firstName: 'Timmy',
    lastName: 'Camidge',
    email: 'tcamidgef@ovh.net',
    address: '1 Nancy Junction',
    password: 'RrxdGbXK96Ai'
  },
  {
    firstName: 'Itch',
    lastName: 'Sandels',
    email: 'isandelsg@nhs.uk',
    address: '451 Twin Pines Hill',
    password: 'AVR9EPhWok6G'
  },
  {
    firstName: 'Ivar',
    lastName: 'Oneil',
    email: 'ioneilh@a8.net',
    address: '00 Arrowood Terrace',
    password: 'HwkR0T2uS'
  },
  {
    firstName: 'Mavra',
    lastName: 'Chominski',
    email: 'mchominskii@booking.com',
    address: '347 Grim Road',
    password: 'I5IPpSMQO'
  },
  {
    firstName: 'Cozmo',
    lastName: 'Spottiswoode',
    email: 'cspottiswoodej@amazon.de',
    address: '389 Lakewood Way',
    password: 'a9keXAq8dx'
  },
  {
    firstName: 'Norma',
    lastName: 'Gregol',
    email: 'ngregolk@webs.com',
    address: '02 Hayes Hill',
    password: '0qKjwYm5M'
  },
  {
    firstName: 'Zola',
    lastName: 'Bysouth',
    email: 'zbysouthl@photobucket.com',
    address: '04687 Kedzie Point',
    password: 'uBX5SRAdXb'
  },
  {
    firstName: 'Kamila',
    lastName: 'Kirstein',
    email: 'kkirsteinm@mashable.com',
    address: '32599 Graceland Road',
    password: 'y6g7d0gmAct'
  },
  {
    firstName: 'Maurita',
    lastName: 'De Cruze',
    email: 'mdecruzen@last.fm',
    address: '651 Waywood Drive',
    password: 'HddJ3Y6teF'
  },
  {
    firstName: 'Emerson',
    lastName: 'Petticrew',
    email: 'epetticrewo@geocities.com',
    address: '95 Rutledge Place',
    password: 'lkNCKmFu'
  },
  {
    firstName: 'Edan',
    lastName: 'Tidswell',
    email: 'etidswellp@jigsy.com',
    address: '08 Dovetail Road',
    password: 'LgayeJr'
  },
  {
    firstName: 'Merl',
    lastName: 'Dorking',
    email: 'mdorkingq@bbb.org',
    address: '9 Upham Parkway',
    password: 'ieecHT4'
  },
  {
    firstName: 'Juditha',
    lastName: 'Coweuppe',
    email: 'jcoweupper@latimes.com',
    address: '550 8th Road',
    password: 'Y6BvUqsPbCMI'
  },
  {
    firstName: 'Vonny',
    lastName: 'Wauchope',
    email: 'vwauchopes@apache.org',
    address: '0860 Grover Park',
    password: 'hhjNgaFVj'
  },
  {
    firstName: 'Erica',
    lastName: 'Berrington',
    email: 'eberringtont@redcross.org',
    address: '8 Prairie Rose Trail',
    password: 'DNDnREZts'
  },
  {
    firstName: 'Vania',
    lastName: 'Slemmonds',
    email: 'vslemmondsu@macromedia.com',
    address: '0 Moose Circle',
    password: 'Cm7Mb5g'
  },
  {
    firstName: 'Rozamond',
    lastName: 'Godfree',
    email: 'rgodfreev@bing.com',
    address: '523 Mayfield Place',
    password: 'VPRCAtTCj'
  },
  {
    firstName: 'Kenon',
    lastName: 'Tretwell',
    email: 'ktretwellw@goo.gl',
    address: '15 Darwin Circle',
    password: 'ruW7PTp'
  },
  {
    firstName: 'Tonya',
    lastName: 'Gregoriou',
    email: 'tgregorioux@friendfeed.com',
    address: '3 Barby Point',
    password: '5snTDLWOd2'
  },
  {
    firstName: 'Huntley',
    lastName: 'Coard',
    email: 'hcoardy@flavors.me',
    address: '15 Esker Alley',
    password: 'MXc6mEaaH'
  },
  {
    firstName: 'Reese',
    lastName: 'Braiden',
    email: 'rbraidenz@alibaba.com',
    address: '624 Vidon Junction',
    password: 'Hk6f7K'
  },
  {
    firstName: 'Fayth',
    lastName: 'Shilvock',
    email: 'fshilvock10@ihg.com',
    address: '9056 Sutherland Trail',
    password: '1PSrdx5i'
  },
  {
    firstName: 'Gard',
    lastName: 'Dyble',
    email: 'gdyble11@house.gov',
    address: '32 Sachtjen Alley',
    password: '4NFJ0g'
  },
  {
    firstName: 'Zachary',
    lastName: 'Barbary',
    email: 'zbarbary12@usgs.gov',
    address: '23665 Cascade Park',
    password: '8obZRfIb'
  },
  {
    firstName: 'Alan',
    lastName: 'Wensley',
    email: 'awensley13@edublogs.org',
    address: '8 Paget Hill',
    password: 'Fcf5r2E'
  },
  {
    firstName: 'Cathrin',
    lastName: 'Sheber',
    email: 'csheber14@businesswire.com',
    address: '6582 Forest Drive',
    password: 'QGYuYflUBO'
  },
  {
    firstName: 'Gerry',
    lastName: 'Fieldgate',
    email: 'gfieldgate15@biblegateway.com',
    address: '2 Columbus Lane',
    password: 'FxgVkTpTdf'
  },
  {
    firstName: 'Lodovico',
    lastName: 'Bartle',
    email: 'lbartle16@printfriendly.com',
    address: '155 Marcy Street',
    password: '2EbV1YcUu'
  },
  {
    firstName: 'Boycey',
    lastName: 'Rapper',
    email: 'brapper17@illinois.edu',
    address: '85046 Rutledge Lane',
    password: 'J34EjD7'
  },
  {
    firstName: 'Jeannette',
    lastName: 'Senten',
    email: 'jsenten18@webs.com',
    address: '91 Lotheville Junction',
    password: '9HWdL03Z'
  },
  {
    firstName: 'Brittany',
    lastName: 'Allso',
    email: 'ballso19@php.net',
    address: '0 Algoma Trail',
    password: 'XGvQIccq'
  },
  {
    firstName: 'Whitney',
    lastName: 'Cana',
    email: 'wcana1a@geocities.com',
    address: '5 Texas Junction',
    password: '1c9fJWcXslM9'
  },
  {
    firstName: 'Marylin',
    lastName: 'Rispen',
    email: 'mrispen1b@ftc.gov',
    address: '4788 Lunder Circle',
    password: '88rWIS'
  },
  {
    firstName: 'Bruis',
    lastName: 'Christofle',
    email: 'bchristofle1c@blogger.com',
    address: '476 Dexter Lane',
    password: 'iEtCKt2Q'
  },
  {
    firstName: 'Cyril',
    lastName: 'Tallow',
    email: 'ctallow1d@sciencedirect.com',
    address: '4 High Crossing Point',
    password: 'tPIQGK'
  }
]

module.exports = users
