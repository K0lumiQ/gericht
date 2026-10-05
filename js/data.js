// Данные сайта Gerícht: меню, слайды, отзывы, награды, галерея, блог, часы работы.
(function () {
  var I = function (f) { return 'assets/img/' + f; };

  window.HERO_SLIDES = [
    { img: I('egg-toast.jpg'), kicker: 'Chase The New Flavour', title: ['The Key To', 'Fine Dining'], text: 'Slow-cooked eggs, charred sourdough and spinach picked this morning. A plate that proves simple ingredients, handled with care, beat any trick.', cta: 'Explore Menu', href: '#menu' },
    { img: I('chicken.jpg'), kicker: 'Straight From The Oven', title: ['Roasted', 'To Perfection'], text: 'Free-range chicken, brined overnight and finished over rosemary and lemon. Crisp skin, tender meat, nothing to hide behind.', cta: 'Explore Menu', href: '#menu' },
    { img: I('meat-plate.jpg'), kicker: 'Fire And Patience', title: ['Cooked', 'Over Flame'], text: 'Our open grill burns oak all evening. Every cut is rested, seasoned at the last second and sent out while the crust is still singing.', cta: 'Book A Table', href: '#book' },
    { img: I('dessert-yellow.jpg'), kicker: 'The Sweet Finish', title: ['Dessert Is', 'The Point'], text: 'Our pastry chef builds the last course first and works backwards. Mango, coconut cream and a little salt will end your evening properly.', cta: 'See Desserts', href: '#menu' }
  ];

  // Меню: три вкладки, в каждой две колонки (left/right) и центральное фото
  window.MENUS = {
    bar: {
      banner: I('banner-whisky.jpg'), photo: I('shaker.jpg'),
      leftTitle: 'Wine & Beer', rightTitle: 'Cocktails',
      left: [
        ['Chapel Hill Shiraz', 56, 'AU | Bottle'], ['Catena Malbec', 59, 'AR | Bottle'], ['La Vieille Rosé', 44, 'FR | 750 ml'], ['Rhino Pale Ale', 31, 'CA | 750 ml'], ['Irish Guinness', 26, 'IE | 750 ml'],
        ['Domaine Chardonnay', 48, 'FR | Bottle'], ['Saison Dupont', 22, 'BE | 330 ml'], ['Prosecco Brut', 39, 'IT | Bottle']
      ],
      right: [
        ['Aperol Spritz', 20, 'Aperol | Villa Marchesi prosecco | soda | 30ml'], ['Dark \'N\' Stormy', 16, 'Dark rum | Ginger beer | Slice of lime.'], ['Daiquiri', 10, 'Rum | Citrus juice | Sugar'], ['Old Fashioned', 31, 'Bourbon | Brown sugar | Angostura Bitters'], ['Negroni', 26, 'Gin | Sweet Vermouth | Campari | Orange garnish'],
        ['Espresso Martini', 24, 'Vodka | Coffee liqueur | Fresh espresso'], ['Whiskey Sour', 22, 'Bourbon | Lemon | Egg white'], ['Paloma', 18, 'Tequila | Grapefruit | Lime | Salt rim']
      ]
    },
    food: {
      banner: I('steak.jpg'), photo: I('plating.jpg'),
      leftTitle: 'Starters', rightTitle: 'Mains',
      left: [
        ['Soft Egg & Avocado Toast', 14, 'Sourdough | Spinach | Rosemary oil'], ['Charred Asparagus', 12, 'Burnt lemon | Almonds | Pecorino'], ['Falafel Bites', 11, 'Herb tahini | Pickled chilli | Mint'], ['Beef Tartare', 18, 'Capers | Shallot | Quail yolk'], ['Burrata & Tomato', 15, 'Heritage tomatoes | Basil | Aged balsamic'],
        ['Seared Scallops', 19, 'Cauliflower | Brown butter | Chive'], ['Wild Mushroom Soup', 10, 'Thyme cream | Toasted hazelnut'], ['Smoked Salmon Blini', 13, 'Crème fraîche | Dill | Lemon']
      ],
      right: [
        ['Roast Chicken', 28, 'Free-range | Rosemary | Lemon jus | Pommes purée'], ['Oak-Grilled Ribeye', 42, '300g | Bone marrow butter | Charred leek'], ['Pan-Fried Sea Bass', 34, 'Fennel | Saffron beurre blanc | Samphire'], ['Wild Mushroom Risotto', 24, 'Carnaroli | Parmesan | Truffle oil'], ['Slow Lamb Shoulder', 38, 'Harissa | Chickpeas | Pomegranate'],
        ['Duck Breast', 36, 'Cherry gastrique | Celeriac | Black pepper'], ['Cauliflower Steak', 22, 'Romesco | Almond crumb | Parsley'], ['Spaghetti Vongole', 27, 'Clams | Garlic | White wine | Chilli']
      ]
    },
    desserts: {
      banner: I('dessert-oranges.jpg'), photo: I('dessert-yellow.jpg'),
      leftTitle: 'Sweet Plates', rightTitle: 'After Dinner',
      left: [
        ['Mango & Coconut Tower', 13, 'Coconut cream | Passion fruit | Sea salt'], ['Dark Chocolate Fondant', 12, 'Salted caramel | Vanilla ice cream'], ['Burnt Basque Cheesecake', 11, 'Roasted plums | Thyme'], ['Citrus Tart', 10, 'Blood orange | Meringue | Pistachio'], ['Affogato', 8, 'Vanilla gelato | Espresso | Amaretti'],
        ['Baked Apple Crumble', 10, 'Cinnamon custard | Oat crumb'], ['Panna Cotta', 9, 'Vanilla | Raspberry coulis'], ['Tiramisu', 10, 'Mascarpone | Espresso | Cocoa']
      ],
      right: [
        ['Moscato d\'Asti', 12, 'IT | Glass | Light and sparkling'], ['Tawny Port 20 yr', 16, 'PT | 50 ml | Walnut and fig'], ['Limoncello', 9, 'IT | 40 ml | Served frozen'], ['Irish Coffee', 14, 'Whiskey | Brown sugar | Cream'], ['Pedro Ximénez', 13, 'ES | 50 ml | Raisin and toffee'],
        ['Amaretto Sour', 15, 'Amaretto | Lemon | Egg white'], ['Single Malt, 12 yr', 21, 'Speyside | 40 ml | Neat or rocks'], ['Hot Chocolate', 6, 'Single-origin | Marshmallow']
      ]
    }
  };

  window.REVIEWS = [
    { name: 'Wade Warren', role: 'Sommelier', img: I('p-wade.jpg'), text: 'The wine list is short, brave and sensibly priced. I came for the Malbec and stayed for the lamb. Service never hovers, it simply appears when you need it.' },
    { name: 'Jane Cooper', role: 'Chef', img: I('p-jane.jpg'), text: 'As a cook I notice the small things: the sear on the scallops, the seasoning of the jus. Everything here is done with intent, and it shows on the plate.' },
    { name: 'Robert Fox', role: 'Chef', img: I('p-robert.jpg'), text: 'Walked in without a booking and the team still found me a seat at the grill. That ribeye is the best I have had in the city this year.' },
    { name: 'Brooklyn Simmons', role: 'Caterer', img: I('p-brooklyn.jpg'), text: 'We hosted a twenty-person dinner upstairs. The kitchen adapted the menu for three allergies without any fuss, and nobody left hungry or disappointed.' }
  ];

  window.AWARDS = [
    { n: 2, title: 'Bib Gourmand', text: 'Good food at moderate prices, recognised two years in a row.' },
    { n: 1, title: 'Rising Star', text: 'Named the city\'s best new opening by the dining guide.' },
    { n: 5, title: 'AA Hospitality', text: 'Five-star rating for service, warmth and attention to guests.' },
    { n: 3, title: 'Outstanding Chef', text: 'Chef Kevin Luo, shortlisted three times for the regional prize.' }
  ];

  window.GALLERY = [
    { img: I('ramen.jpg'), cap: 'Prawn ramen with soft eggs' },
    { img: I('whisky-splash.jpg'), cap: 'Old Fashioned, over a single cube' },
    { img: I('egg-fried.jpg'), cap: 'Crispy fried egg on sourdough' },
    { img: I('grill-table.jpg'), cap: 'Fire-roasted dishes for the table' },
    { img: I('plating.jpg'), cap: 'Final touches before service' },
    { img: I('wine-glass.jpg'), cap: 'Malbec at the pass' }
  ];

  window.POSTS = [
    { id: 1, img: I('grill.jpg'), date: '16 Apr 2021', author: 'Annalisa L', tag: 'Technique', title: 'Tips For Prepping And Caring For Your Grill',
      excerpt: 'A clean, well-seasoned grill is the difference between a great steak and a stuck-on disappointment. Here is how our kitchen does it every day.',
      body: ['A great grill starts long before the fire. At Gerícht we scrape the bars while they are still hot, then wipe them with an oiled cloth held in tongs. That thin layer of oil is the seasoning that stops food from sticking and keeps the metal from rusting overnight.', 'Preheat for at least fifteen minutes with the lid open, so the bars are properly hot and the sugars in your marinade caramelise rather than steam. If your hand cannot stay an inch above the grate for more than three seconds, you are ready to cook.', 'Give every cut room. Crowding the grill drops the temperature and leaves you with grey meat. Cook in two zones: a hot side for the sear and a cooler side to finish gently, then rest the meat for as long as it cooked.', 'When service ends, brush down once more, oil lightly and cover. Do this every night and the grill will look after you in return for years.'] },
    { id: 2, img: I('grapefruit-rosemary.jpg'), date: '23 May 2021', author: 'John Micheal', tag: 'Drinks', title: 'Summer Cocktails And Mocktails',
      excerpt: 'Grapefruit, rosemary, a splash of soda. Our bar team shares three easy summer drinks you can build at home in under five minutes.',
      body: ['Summer drinks should be bright, cold and quick to make. Our head bartender builds his around one rule: fresh citrus, always. Bottled juice is the fastest way to flatten a cocktail.', 'Start with the Paloma: tequila, fresh grapefruit, a squeeze of lime and soda, served over a lot of ice with a salted rim. For a mocktail, swap the tequila for a splash of tonic and a sprig of rosemary, bruised between your palms to release the oils.', 'Our third favourite is a simple mint and lime cooler. Muddle gently, because pressing too hard releases bitterness from the leaves, add crushed ice and top with sparkling water.', 'Whatever you make, chill the glasses first. Ten minutes in the freezer does more for a drink than any garnish.'] },
    { id: 3, img: I('falafel.jpg'), date: '06 Aug 2021', author: 'Fred W', tag: 'Recipes', title: 'Easy Cooking For College Students',
      excerpt: 'Cheap, quick and genuinely good: three dishes that get you through exam season without living on instant noodles.',
      body: ['You do not need a full kitchen to eat well. You need a pan, a pot and a few reliable recipes. Falafel is a great place to start: a can of chickpeas, an onion, garlic, parsley and cumin, blitzed, shaped and fried until golden.', 'Next comes a one-pan tomato pasta. Fry garlic in olive oil, add a tin of tomatoes, simmer for ten minutes, toss through the pasta with a splash of its cooking water. It is faster than ordering in.', 'Finally, learn one good egg dish. Soft-boiled eggs on toast with a little chilli oil will carry you through any week.', 'Cook in batches, label your containers and share with flatmates. Eating together is half the point of food anyway.'] },
    { id: 4, img: I('steak.jpg'), date: '12 Sep 2021', author: 'Annalisa L', tag: 'Kitchen', title: 'How We Choose Our Beef',
      excerpt: 'We visit the farm, we meet the family and we hang the meat ourselves. A look at how a ribeye gets from the pasture to your plate.',
      body: ['Every steak on our menu comes from one family farm, an hour from the restaurant. The cattle are grass-fed and finished on barley, which gives the beef its depth without making it heavy.', 'We dry-age each side for thirty-five days in our own cabinet. The process concentrates flavour and tenderises the meat, and it is the reason our ribeye costs a little more than you might expect.', 'On the night, the steak comes out of the fridge an hour before cooking, is seasoned with salt and nothing else, and goes straight onto the oak grill.', 'It is a simple method. The work happens months earlier, on the farm.'] },
    { id: 5, img: I('wine.jpg'), date: '30 Sep 2021', author: 'Wade W', tag: 'Wine', title: 'A Beginner\'s Guide To Reading A Wine List',
      excerpt: 'Do not panic at the page of names. Our sommelier explains how to find a bottle you will love, whatever your budget.',
      body: ['A wine list can look like an exam. It does not have to. Start by telling your server what you usually drink and what you are eating. Good sommeliers love that question.', 'Do not feel pushed to the cheapest or the most expensive bottle. The second and third cheapest are often the best value, as restaurants price them fairly to avoid the stigma of the lowest line.', 'Look beyond the famous regions. Wines from Argentina, Portugal and Southern Italy offer bold flavour for less.', 'Lastly, ask for a taste of any wine by the glass. If we have it open, it is yours to try.'] },
    { id: 6, img: I('dessert-yellow.jpg'), date: '14 Oct 2021', author: 'Fred W', tag: 'Pastry', title: 'Behind The Mango Tower',
      excerpt: 'It looks like architecture, it tastes like a holiday. Our pastry chef walks us through the most photographed dessert on the menu.',
      body: ['The mango tower begins with fruit. We use only ripe Alphonso mangoes in season and freeze them at peak sweetness for the rest of the year.', 'Each tower has four layers: a coconut sponge, mango gel, whipped coconut cream and a thin crisp of caramelised sugar on top. The passion fruit sauce is poured at the table, which is where the drama comes from.', 'A pinch of sea salt is the secret. It makes the fruit taste more like itself.', 'Order it for the table, it was designed to be shared.'] }
  ];

  window.HOURS = { weekday: 'Monday - Friday:<br>08:00 am - 12:00 am', weekend: 'Saturday - Sunday:<br>07:00 am - 11:00 pm' };
  window.TIMES = (function () { var t = []; for (var h = 11; h <= 22; h++) { ['00', '30'].forEach(function (m) { if (h === 22 && m === '30') return; var hh = h > 12 ? h - 12 : h, ap = h >= 12 ? 'PM' : 'AM'; t.push(('0' + hh).slice(-2) + ':' + m + ' ' + ap); }); } return t; })();
})();
