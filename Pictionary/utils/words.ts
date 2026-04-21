export type Category = 'Animals' | 'Festivals' | 'Food' | 'Sports' | 'Vehicles' | 'Travel' | 'Movies' | 'Drinks' | 'Flowers' | 'Colors';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type DifficultyWithMix = Difficulty | 'Mix';

export const CATEGORIES: Category[] = ['Animals', 'Festivals', 'Food', 'Sports', 'Vehicles', 'Travel', 'Movies', 'Drinks', 'Flowers', 'Colors'];

export const CATEGORY_EMOJI: Record<Category, string> = {
  Animals: '🐾',
  Festivals: '🎉',
  Food: '🍕',
  Sports: '⚽',
  Vehicles: '🚗',
  Travel: '✈️',
  Movies: '🎬',
  Drinks: '🥤',
  Flowers: '🌸',
  Colors: '🎨',
};

type WordData = Record<'Easy' | 'Medium' | 'Hard', string[]>;

const wordDatabase: Record<Category, WordData> = {
  Animals: {
    Easy: [
      'Dog', 'Cat', 'Bird', 'Fish', 'Cow', 'Pig', 'Hen', 'Duck', 'Goat', 'Sheep',
      'Horse', 'Lion', 'Tiger', 'Bear', 'Wolf', 'Fox', 'Deer', 'Rabbit', 'Mouse', 'Snake',
      'Frog', 'Toad', 'Crab', 'Lobster', 'Shrimp', 'Snail', 'Worm', 'Fly', 'Bee', 'Ant',
      'Bug', 'Beetle', 'Butterfly', 'Ladybug', 'Spider', 'Spider', 'FISH', 'Goat', 'Panda', 'Koala',
      'Zebra', 'Giraffe', 'Hippo', 'Rhino', 'Elephant', 'Monkey', 'Ape', 'Gorilla', 'Chimp', 'Baboon',
      'Leopard', 'Jaguar', 'Cheetah', 'Panther', 'Lynx', 'Bobcat', 'Cougar', 'Mountain Lion', 'Ocelot', 'Margay',
      'Ostrich', 'Emu', 'Kiwi', 'Penguin', 'Seal', 'Walrus', 'Otter', 'Manatee', 'Dolphin', 'Whale',
      'Shark', 'Ray', 'Eel', 'Octopus', 'Squid', 'Jellyfish', 'Starfish', 'Seastar', 'Coral', 'Sponge',
    ],
    Medium: [
      'Alligator', 'Crocodile', 'Porcupine', 'Hedgehog', 'Armadillo', 'Kangaroo', 'Wallaby', 'Wombat', 'Platypus', 'Echidna',
      'Raccoon', 'Skunk', 'Badger', 'Weasel', 'Otter', 'Mink', 'Ferret', 'Stoat', 'Marten', 'Sable',
      'Chipmunk', 'Squirrel', 'Prairie Dog', 'Gopher', 'Marmot', 'Chinchilla', 'Guinea Pig', 'Hamster', 'Gerbil', 'Rat',
      'Muskrat', 'Nutria', 'Capybara', 'Agouti', 'Paca', 'Tapir', 'Anteater', 'Aardvark', 'Pangolin', 'Manis',
      'Jackal', 'Hyena', 'Caracal', 'Serval', 'Sand Cat', 'Wildcat', 'Clouded Leopard', 'Snow Leopard', 'Tiger', 'Lion',
      'Moose', 'Elk', 'Wapiti', 'Bison', 'Buffalo', 'Yak', 'Ox', 'Brahman', 'Gaur', 'Wild Boar',
      'Warthog', 'Peccary', 'Llama', 'Alpaca', 'Vicuña', 'Guanaco', 'Camel', 'Dromedary', 'Bactrian', 'Gazelle',
      'Antelope', 'Saiga', 'Impala', 'Springbok', 'Thomson Gazelle', 'Grant Gazelle', 'Kudu', 'Nyala', 'Sitatunga', 'Eland',
    ],
    Hard: [
      'Axolotl', 'Salamander', 'Newt', 'Caecilian', 'Tuatara', 'Iguana', 'Anole', 'Gecko', 'Chameleon', 'Skink',
      'Monitor Lizard', 'Komodo Dragon', 'Bearded Dragon', 'Frill Neck Lizard', 'Thorny Devil', 'Mole Lizard', 'Slowworm', 'Glass Lizard', 'European Lime', 'Sheltopusik',
      'Peregrine Falcon', 'Peregrine', 'Peregrine', 'Gyrfalcon', 'Lanner Falcon', 'Saker Falcon', 'Merlin', 'Kestrel', 'American Kestrel', 'Eurasian Kestrel',
      'Harpy Eagle', 'Philippine Eagle', 'Golden Eagle', 'Bald Eagle', 'White Tailed Eagle', 'Sea Eagle', 'African Fish Eagle', 'Steppe Eagle', 'Imperial Eagle', 'Spanish Eagle',
      'Snowy Owl', 'Great Horned Owl', 'Barn Owl', 'Barred Owl', 'Northern Spotted Owl', 'Elf Owl', 'Burrowing Owl', 'Little Owl', 'Long Eared Owl', 'Short Eared Owl',
      'Hoary Marmot', 'Yellow Bellied Marmot', 'Olympic Marmot', 'Alpine Marmot', 'American Beaver', 'Eurasian Beaver', 'Mountain Beaver', 'Hoatzin', 'Secretary Bird', 'Oilbird',
      'Flying Squirrel', 'Sugar Glider', 'Colugo', 'Flying Lemur', 'Tarsier', 'Bushbaby', 'Galago', 'Loris', 'Potto', 'Angwantibo',
      'Kaluta', 'Quokka', 'Potoroo', 'Bilby', 'Bandicoot', 'Numbat', 'Spotted Quoll', 'Tiger Quoll', 'Tasmanian Devil', 'Mulgara',
    ],
  },
  Festivals: {
    Easy: [
      'Christmas', 'Easter', 'Halloween', 'Thanksgiving', 'Birthday', 'New Year', 'Valentine', 'Independence Day', 'Memorial Day', 'Labor Day',
      'Fourth Of July', 'Saint Patrick', 'May Day', 'April Fool', 'Earth Day', 'Mother Day', 'Father Day', 'World Cup', 'Olympics', 'Carnival',
      'Rio Carnival', 'Mardi Gras', 'Chinese New Year', 'Diwali', 'Holi', 'Hanukkah', 'Kwanzaa', 'Ramadan', 'Eid', 'Passover',
      'Rosh Hashanah', 'Yom Kippur', 'Sukkot', 'Shavuot', 'Shavout', 'Tu Bishvat', 'Lunar New Year', 'Vaisakhi', 'Navajo', 'Songkran',
      'Water Festival', 'Bon Festival', 'Obon', 'Day Of Dead', 'Day Of The Dead', 'Dia De Los Muertos', 'Gala', 'Ball', 'Prom', 'Homecoming',
      'Graduation', 'Commencement', 'Reunion', 'Wedding', 'Anniversary', 'Baby Shower', 'Bridal Shower', 'Engagement', 'Quinceañera', 'Sweet Sixteen',
      'Bar Mitzvah', 'Bat Mitzvah', 'Barmitzvah', 'Confirmation', 'First Communion', 'First Holy Communion', 'Marriage', 'Union', 'Festival', 'Celebration',
      'Block Party', 'Street Fair', 'Street Party', 'County Fair', 'State Fair', 'World Fair', 'Expo', 'Exhibition', 'Show', 'Fair',
    ],
    Medium: [
      'Oktoberfest', 'Oktober Fest', 'St Patrick Day', 'St Patricks Day', 'Patricks Day', 'Spring Festival', 'Cherry Blossom', 'Sakura', 'Haru Matsuri',
      'Lantern Festival', 'Yuan Xiao', 'Song Dynasty', 'Mid Autumn', 'Mid Autumn Festival', 'Moon Festival', 'Chuseok', 'Korea Festival', 'Thanksgiving Day', 'Canadian Thanksgiving',
      'Columbus Day', 'Veterans Day', 'Armistice Day', 'Remembrance Day', 'Rememberance Day', 'Guy Fawkes', 'Bonfire Night', 'Fireworks Night', 'Morrison', 'Boxing Day',
      'Saint Nicholas', 'Saint Nick', 'Kris Kringle', 'Feast Of Saint Nicholas', 'Sinterklaas', 'Zwarte Piet', 'Black Pete', 'Krampus', 'Krampusnacht', 'Saint Lucia',
      'Santa Lucia', 'Saint Lucys Day', 'Festival Of Lights', 'Festival Of Ducks', 'Maghi', 'Lohri', 'Makar Sankranti', 'Pongal', 'Bhogi', 'Thai Pongal',
      'Thaipusam', 'Kumbh Mela', 'Ardh Kumbh', 'Pushkar Fair', 'Camel Fair', 'Desert Festival', 'Desert Fair', 'Rann Utsav', 'Rann Festival', 'Marathon',
      'Music Festival', 'Jazz Festival', 'Blues Festival', 'Rock Festival', 'Pop Festival', 'Dance Festival', 'Film Festival', 'Cannes', 'Venice Film', 'Berlin Film',
      'Comedy Festival', 'Fringe Festival', 'Arts Festival', 'Book Festival', 'Poetry Festival', 'Literature Festival', 'Food Festival', 'Wine Festival', 'Beer Festival', 'Whisky Festival',
    ],
    Hard: [
      'Inti Raymi', 'Inca Festival', 'Sun Festival', 'Independence Day', 'Dieciocho', 'Fiestas Patrias', 'Grito De Dolores', 'Mexican Independence', 'Battle Of Puebla', 'Cinco De Mayo',
      'Day Of The Race', 'Hispanic Heritage', 'Hispanic Day', 'Revolution Day', 'Bastille Day', 'Fête Nationale', 'Fete Nationale', 'National Day', 'National Holiday', 'National Celebration',
      'Queens Birthday', 'King Birthday', 'Monarch Birthday', 'Trooping The Color', 'Trooping Colour', 'Royal Birthday', 'Royal Celebration', 'Ash Wednesday',
      'Palm Sunday', 'Maundy Thursday', 'Good Friday', 'Holy Saturday', 'Easter Vigil', 'Easter Monday', 'Easter Tuesday', 'Eastertide', 'Pentecost', 'Whitsunday',
      'Trinity Sunday', 'Corpus Christi', 'Feast Of Body', 'Feast Of Blood', 'All Saints', 'All Hallows', 'Hallowmas', 'All Souls', 'Souls Day', 'Dia De Los Fieles',
      'Feast Of Saint John', 'San Juan', 'Feast Of St John', 'Midsummer', 'Midsummer Night', 'Summer Solstice', 'Winter Solstice', 'Spring Equinox', 'Fall Equinox', 'Autumn Equinox',
      'Belgian National Day', 'National Day', 'Swiss National Day', 'Swiss Day', 'Canada Day', 'Dominion Day', 'Fête Du Canada', 'Fete Du Canada', 'Canada Day',
      'Australia Day', 'Anzac Day', 'Australian Day', 'Pakistan Day', 'Independence Day', 'Independence Day', 'Independence Day', 'Independence Day', 'Independence Day', 'Independence Day',
    ],
  },
  Food: {
    Easy: [
      'Apple', 'Banana', 'Orange', 'Grape', 'Mango', 'Peach', 'Pear', 'Plum', 'Cherry', 'Berry',
      'Strawberry', 'Blueberry', 'Raspberry', 'Blackberry', 'Watermelon', 'Cantaloupe', 'Honeydew', 'Grapefruit', 'Lemon', 'Lime',
      'Pizza', 'Burger', 'Pasta', 'Rice', 'Bread', 'Toast', 'Bagel', 'Muffin', 'Cake', 'Cookie',
      'Candy', 'Chocolate', 'Ice Cream', 'Pie', 'Tart', 'Brownie', 'Pudding', 'Jello', 'Jelly', 'Jam',
      'Egg', 'Cheese', 'Milk', 'Butter', 'Yogurt', 'Cream', 'Sour Cream', 'Cream Cheese', 'Cottage Cheese', 'Cheddar',
      'Steak', 'Chicken', 'Pork', 'Beef', 'Lamb', 'Turkey', 'Ham', 'Bacon', 'Sausage', 'Hot Dog',
      'Fish', 'Shrimp', 'Crab', 'Lobster', 'Salmon', 'Tuna', 'Cod', 'Halibut', 'Tilapia', 'Anchovy',
      'Soup', 'Salad', 'Sandwich', 'Taco', 'Burrito', 'Quesadilla', 'Enchilada', 'Nachos', 'Guacamole', 'Salsa',
    ],
    Medium: [
      'Spaghetti', 'Lasagna', 'Ravioli', 'Tortellini', 'Fettuccine', 'Penne', 'Rigatoni', 'Macaroni', 'Orzo', 'Gnocchi',
      'Croissant', 'Baguette', 'Ciabatta', 'Sourdough', 'Pita', 'Naan', 'Tortilla', 'Roti', 'Chapati', 'Paratha',
      'Sushi', 'Sashimi', 'Tempura', 'Teriyaki', 'Katsu', 'Ramen', 'Udon', 'Soba', 'Gyoza', 'Dumpling',
      'Pho', 'Pad Thai', 'Curry', 'Tikka', 'Masala', 'Biryani', 'Pilaf', 'Pulao', 'Korma', 'Tandoor',
      'Paella', 'Risotto', 'Arroz', 'Gumbo', 'Jambalaya', 'Etouffee', 'Cajun', 'Creole', 'Jambalaya', 'Dirty Rice',
      'Tamale', 'Empanada', 'Arepa', 'Bandeja', 'Feijoada', 'Churrasco', 'Asado', 'Parilla', ' anticucho', 'Ceviche',
      'Pierogi', 'Borscht', 'Pelmeni', 'Vareniki', 'Blini', 'Blini', 'Pirozhki', 'Kasha', 'Vinaigrette', 'Vinaigrette',
      'Focaccia', 'Bruschetta', 'Antipasto', 'Prosciutto', 'Caprese', 'Carpaccio', 'Risotto', 'Arancini', 'Cannoli', 'Tiramisu',
    ],
    Hard: [
      'Bouillabaisse', 'Consommé', 'Consomme', 'Velouté', 'Veloute', 'Béchamel', 'Bechamel', 'Mornay', 'Swabian', 'Höller',
      'Hollandaise', 'Beurre Blanc', 'Beurre Blanc', 'Emulsion', 'Beurre Mount', 'Pâte', 'Pate', 'Couronne', 'Galette', 'Rösti',
      'Raclette', 'Fondue', 'Aligot', 'Tartiflette', 'Chartreuse', 'Cognac', 'Armagnac', 'Calvados', 'Cider', 'Perry',
      'Choucroute', 'Sauerkraut', 'Kimchi', 'Doenjang', 'Gochujang', 'Miso', 'Tempeh', 'Tofu', 'Edamame', 'Nori',
      'Kombu', 'Wakame', 'Hijiki', 'Arame', 'Kelp', 'Agar', 'Carrageenan', 'Guar', 'Xanthan', 'Gellan',
      'Tagine', 'Couscous', 'Bastilla', 'Pastilla', 'Rfissa', 'Harira', 'Chebakia', 'Kaab El Ghazal', 'Ghriba', 'Makroud',
      'Dolma', 'Dolmades', 'Tzatziki', 'Hummus', 'Baba Ganoush', 'Baba Ghanoush', 'Falafel', 'Fattoush', 'Tabbouleh', 'Fattoush',
      'Kibus', 'Shakshuka', 'Shakshouka', 'Matzo Ball', 'Matzo Balls', 'Kugel', 'Kugul', 'Tzimmis', 'Tsimmis', 'Charoset',
    ],
  },
  Sports: {
    Easy: [
      'Soccer', 'Football', 'Basketball', 'Baseball', 'Hockey', 'Tennis', 'Golf', 'Swimming', 'Running', 'Boxing',
      'Wrestling', 'Volleyball', 'Softball', 'Rugby', 'Cricket', 'Lacrosse', 'Polo', 'Rowing', 'Canoeing', 'Kayaking',
      'Fencing', 'Archery', 'Shooting', 'Gymnastics', 'Diving', 'Skiing', 'Snowboarding', 'Skating', 'Surfing', 'Sailing',
      'Climbing', 'Hiking', 'Biking', 'Cycling', 'Martial Arts', 'Karate', 'Judo', 'Taekwondo', 'Aikido', 'Jujitsu',
      'Wrestling', 'Sumo', 'Boxing', 'Mma', 'Ufc', 'Ping Pong', 'Table Tennis', 'Badminton', 'Squash', 'Tennis',
      'Racquetball', 'Handball', 'Bowling', 'Billiards', 'Pool', 'Snooker', 'Darts', 'Curling', 'Bocce', 'Petanque',
      'Horseshoes', 'Horseshoe', 'Cornhole', 'Ladderball', 'Kan Jam', 'Disc Golf', 'Frisbee Golf', 'Ultimate', 'Ultimate Frisbee', 'Beach Volleyball',
      'Beach Soccer', 'Beach Basketball', 'Beach Football', 'Sand Volleyball', 'Sand Soccer', 'Sand', 'Sand', 'Sand', 'Sand', 'Sand',
    ],
    Medium: [
      'American Football', 'Nfl', 'Nba', 'Mlb', 'Nhl', 'Mls', 'Nascar', 'Indycar', 'Formula One', 'F1',
      'Motorsport', 'Motocross', 'Supercross', 'Enduro', 'Trials', 'Dirt Bike', 'Off Road', 'Rally', 'Rallying', 'Rallycross',
      'Bmx', 'Mountain Bike', 'Mtbo', 'Orienteering', 'Adventure Race', 'Triathlon', 'Ultra Marathon', 'Marathon', 'Half Marathon', '10k',
      '5k', 'Cross Country', 'Track And Field', 'Field Hockey', 'Ice Hockey', 'Field Hockey', ' Floorball', 'Unihockey', 'Bandy',
      'Ringette', 'Netball', 'Water Polo', 'Water Basketball', 'Synchro', 'Synchronized Swimming', 'Open Water', 'Long Distance', 'Distance Swimming', 'Sprint Swimming',
      'Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'IM', 'Individual Medley', 'Medley', 'Relay', 'Dolphin Kick', 'Dolphin Dive',
      'High Jump', 'Long Jump', 'Triple Jump', 'Pole Vault', 'Shot Put', 'Discus', 'Javelin', 'Hammer', 'Heptathlon', 'Decathlon',
      'Pentathlon', 'Modern Pentathlon', 'Biathlon', 'Ski Jump', 'Nordic Combined', 'Skiing', 'Alpine Skiing', 'Downhill', 'Super G', 'Giant Slalom',
    ],
    Hard: [
      'Skeleton', 'Luge', 'Bobsleigh', 'Bobsled', 'Curl', 'Curling', 'Steeplechase', 'Hurdles', '400m Hurdles', '300m Hurdles',
      '110m Hurdles', '100m Hurdles', '84m Hurdles', '100m Dash', '100m Sprint', '200m Sprint', '400m Sprint', '800m Run', '1500m Run', 'Mile Run',
      '3k Run', '5k Run', '10k Run', 'Cross Country', 'Steeplechase', 'Race Walking', 'Racewalk', 'Marathon Walk', '50km Walk', '20km Walk',
      'Taekwondo', 'Taekkyeon', 'Hapkido', 'Kung Fu', 'Wushu', 'Sanshou', 'Sanda', 'Kickboxing', 'Savate', 'Boxe Française',
      'Capoeira', 'Brazilian Jiu Jitsu', 'BJJ', 'Jiu Jitsu', 'Jujutsu', 'Ninjutsu', 'Samurai', 'Kendo', 'Iaido', 'Kenjutsu',
      'Kyudo', 'Kyudo', 'Jodo', 'Jo Do', 'Budo', 'Bujutsu', 'Bujinkan', 'Ninjagan', 'Tengu', 'Tai Chi',
      'Tai Chi', 'Taijiquan', 'Qigong', 'Chi Kung', 'Push Hands', 'Tuishou', 'Shuai Jiao', 'Chinua', 'Catch As Catch Can', 'Greco Roman',
      'Freestyle Wrestling', 'Beach Wrestling', 'Lasso', 'Glima', 'Schwingen', 'Hornuss', 'Hornussen', 'En Garde', 'Flèche', 'Sabre',
    ],
  },
  Vehicles: {
    Easy: [
      'Car', 'Truck', 'Van', 'Bus', 'Taxi', 'Limo', 'Motorcycle', 'Bike', 'Bicycle', 'Scooter',
      'Skateboard', 'Rollerblade', 'Roller Skate', 'Train', ' subway', 'Metro', 'Tram', 'Trolley', 'Cable Car', 'Monorail', 'Maglev',
      'Airplane', 'Jet', 'Helicopter', 'Glider', 'Hot Air Balloon', 'Blimp', 'Zeppelin', 'Balloon', 'Biplane', 'Seaplane',
      'Ship', 'Boat', 'Yacht', 'Sailboat', 'Rowboat', 'Canoe', 'Kayak', 'Raft', 'Dinghy', 'Ferry',
      'Tractor', 'Combine', 'Harvester', 'Farm Vehicle', 'Crane', 'Bulldozer', 'Excavator', 'Loader', 'Backhoe', 'Dump Truck',
      'Fire Truck', 'Ambulance', 'Police Car', 'Patrol Car', 'Patrol', 'Rescue', 'Rescue Vehicle', 'Emergency', 'EMT', 'Paramedic',
      'RV', 'Camper', 'Motorhome', 'Trailer', 'Fifth Wheel', 'Toy Hauler', 'Tent Trailer', 'Camper Trailer', 'Travel Trailer', 'Camp Trailer',
      'Sports Car', 'Race Car', 'Drag Car', 'Stock Car', 'Nascar', 'Indy Car', 'Formula Car', 'Go Kart', 'Kart', 'Quad',
    ],
    Medium: [
      'Sedan', 'Coupe', 'Hatchback', 'Wagon', 'SUV', 'Crossover', 'Pickup', 'Pickup Truck', 'Flatbed', 'Box Truck',
      'Delivery Van', 'Cargo Van', 'Passenger Van', 'Mini Van', 'Minivan', 'Conversion Van', 'Sprinter', 'Cargo Truck', 'Semi', 'Tractor Trailer', '18 Wheeler',
      'Dump Trailer', 'Tanker', 'Tanker Truck', 'Car Carrier', 'Auto Carrier', 'Lowboy', 'Low Boy', 'Step Deck', 'Stepdeck', 'Reefer',
      'Refrigerated Truck', 'Reefer Truck', 'Boxcar', 'Hopper Car', 'Tank Car', 'Gondola', 'Flatcar', 'Caboose', 'Passenger Car', 'Pullman',
      'Light Rail', 'Heavy Rail', 'Commuter Rail', 'Regional Rail', 'High Speed Rail', 'Bullet Train', 'Shinkansen', 'TGV', 'Eurostar', 'AVE',
      'Amtrak', 'VIA Rail', 'Eurostar', 'HS2', 'HSR', 'Magnetic Train', 'Maglev Train', 'ATR', 'Pendolino', 'Alstom', 'Siemens',
      'Cruise Ship', 'Ocean Liner', 'Container Ship', 'Bulk Carrier', 'Oil Tanker', 'Chemical Tanker', 'LNG Carrier', 'Gas Tanker', 'VLGC', 'ULCC',
      'Tanker', 'Ro Ro Ship', 'Roll On Roll Off', 'RORO', 'Car Ferry', 'Passenger Ferry', 'Catamaran', 'Hydrofoil', 'Jetfoil', 'Hovercraft', 'SES',
    ],
    Hard: [
      'Dreadnought', 'Battleship', 'Cruiser', 'Destroyer', 'Frigate', 'Corvette', 'Submarine', 'Nuclear Submarine', 'SSBN', 'SSN',
      'Aircraft Carrier', 'Carrier', 'CVN', 'CV', 'Amphibious', 'LST', 'APC', 'AAV', 'AAV7',
      'Hovercraft', 'LCAC', 'LCVP', 'Landing Craft', 'Patrol Boat', 'Patrol Craft', 'Coast Guard', 'Cutters', 'Cutter', 'USCGC',
      'Revenue Cutter', 'Wherry', 'Gondola', 'Barge', 'Scow', 'Jollyboat', 'Dory', 'Pirogue', 'Pirogue', 'Prairie',
      'Prairie Chicken', 'Prairie Schooner', 'Schooner', 'Brig', 'Brigantine', 'Barque', 'Barca', 'Caravel', 'Carrack', 'Galleon',
      'Man Of War', 'ManOWar', 'Frigate', 'Ship Of The Line', 'Line Of Battle', 'LOB', 'First Rate', 'Second Rate', 'Third Rate', 'Fourth Rate', 'Fifth Rate',
      'Sixth Rate', 'Corvette', 'Sloop', 'Schooner', 'Cutter', 'Yawl', 'Ketch', 'Yacht', 'Megaliner', 'Mega Yacht',
      'Superyacht', 'Gigayacht', 'Floating Palace', 'Floating Hotel', 'Floating Resort', 'Tourism Ship', 'Research Vessel', 'Vessel', 'RV', 'Oceanographic',
    ],
  },
  Travel: {
    Easy: [
      'Beach', 'Island', 'Mountain', 'Valley', 'River', 'Lake', 'Ocean', 'Sea', 'Desert', 'Jungle',
      'Forest', 'Woods', 'Park', 'Resort', 'Hotel', 'Motel', 'Inn', 'Lodge', 'Cabin', 'Cottage',
      'Camp', 'Campground', 'Campsite', 'RV Park', 'Campsite', 'Tent Site', 'Camping', 'Backpack', 'Hostel', 'Dorm',
      'Airport', 'Terminal', 'Runway', 'Gate', 'Terminal', 'Concourse', 'Baggage Claim', 'Carousel', 'Checkpoint', 'Security',
      'Visa', 'Passport', 'ID', 'Driver License', 'Drivers License', 'License', 'ID Card', 'Travel Doc', 'Booking', 'Reservation',
      'Ticket', 'Boarding Pass', 'Pass', 'Seat', 'Aisle Seat', 'Window Seat', 'Exit Row', 'Row', 'Class', 'Coach',
      'First Class', 'Business Class', 'Premium', 'Economy', 'Budget', 'Airline', 'Carrier', 'Flight', 'Trip',
      'Tour', 'Excursion', 'Trip', 'Journey', 'Voyage', 'Expedition', 'Adventure', 'Safari', 'Crusie', 'Trip',
    ],
    Medium: [
      'All Inclusive', 'Resort', 'Luxury Resort', 'Spa Resort', 'Beach Resort', 'Ski Resort', 'Mountain Resort', 'Golf Resort', 'Tennis Resort', 'Waterpark',
      'Theme Park', 'Amusement Park', 'Fun Park', 'Water Park', 'Adventure Park', 'Safari Park', 'Wildlife Park', 'Zoo', 'Aquarium', 'Marine Park',
      'National Park', 'State Park', 'Provincial Park', 'Regional Park', 'County Park', 'City Park', 'Urban Park', 'Community Park', 'District Park', 'Memorial Park',
      'Tourist Attraction', 'Landmark', 'Monument', 'Memorial', 'Historical Site', 'Historic Site', 'Heritage Site', 'Archaeological Site', 'Ruins', 'Ancient Ruins', 'Historic Ruins',
      'Travel Package', 'Package Deal', 'Bundle', 'Bundle Deal', 'Vacation Package', 'Holiday Package', 'Getaway', 'Escape', 'Break', 'Retreat',
      'Guide', 'Tour Guide', 'Local Guide', 'Private Guide', 'Group Tour', 'Private Tour', 'Guided Tour', 'Self Tour', 'Independent Tour', 'Free Style',
      'Group Travel', 'Group Trip', 'Family Travel', 'Family Vacation', 'Honeymoon', 'Babymoon', 'Gap Year', 'Year Abroad', 'Semester Abroad', 'Study Abroad',
      'Work Abroad', ' Volunteering', 'Volunteer Travel', 'Service Learning', 'Mission Trip', 'Mission Travel', 'Christian Mission', 'Mission', 'Short Term Mission', 'STM',
    ],
    Hard: [
      'Intercontinental', 'Transcontinental', 'Trans Atlantic', 'Transpacific', 'Long Haul', 'Short Haul', 'Nonstop', 'Direct Flight', 'Connecting Flight', 'Layover',
      'Open Jaw', 'Multi City', 'Multi Destination', 'Circle Trip', 'Round The World', 'RTW', 'Around The World', 'ATW', 'World Tour', 'Global Tour', 'Continental Tour',
      'Backpacker Trail', 'Trail', 'Gringo Trail', 'Banana Pancake Trail', 'Banana Pancake Circuit', 'Circuit', 'Trail', ' hippie Trail', 'Hippie Trail', 'Trail',
      'Overland', 'Overland Route', 'Land Route', 'Sea Route', 'Ocean Route', 'Maritime Route', 'Air Route', 'Flight Path', 'Air Corridor', 'Corridor',
      'Charter', 'Charter Flight', 'Private Jet', 'Private Plane', 'Jet Charter', 'Aircraft Charter', 'Air Charter', 'Jet Set', 'High Roller', 'Highroller',
      'Timeshare', 'Vacation Club', 'Travel Club', 'Holiday Club', 'Resort Club', 'Points Club', 'Points System', 'Points Based', 'Points', 'Points',
      'Concierge', 'Concierge Service', 'Butler Service', 'Butler', 'Personal Concierge', 'Travel Concierge', 'Loyalty Program', 'FFP', 'Frequent Flyer', 'Mileage Program',
      'Alliance', 'Air Alliance', 'Oneworld', 'Star Alliance', 'SkyTeam', 'Airline Alliance', 'Code Share', 'Codeshare', 'Alliance Partner', 'Partner', 'Joint Venture',
    ],
  },
  Movies: {
    Easy: [
      'Action', 'Comedy', 'Drama', 'Horror', 'Thriller', 'Romance', 'Sci Fi', 'Science Fiction', 'Fantasy', 'Western',
      'Animation', 'Animated', 'Cartoon', 'Documentary', 'Doc', 'Musical', 'Music', 'Family', 'Kids', 'Children', 'War',
      'Mystery', 'Suspense', 'Crime', 'Gangster', 'Noir', 'Film Noir', 'Classic', 'Old Movie', 'Vintage', 'Retro', 'Silent',
      'Movie', 'Film', 'Picture', 'Show', 'Flick', 'Cinema', ' flick', 'Movie', 'Show', 'Film',
      'Hollywood', 'Bollywood', 'Tollywood', 'Mollywood', 'Kollywood', 'Movie Industry', 'Film Industry', 'Show Business', 'Showbiz', 'Biz',
      'Star', 'Movie Star', 'Film Star', 'Actor', 'Actress', 'Star', 'Lead', 'Lead Actor', 'Lead Actress', 'Hero',
      'Heroine', 'Villain', 'Bad Guy', 'Bad Guy', 'Director', 'Producer', 'Writer', 'Screenwriter', 'Writer', 'Creator',
      'Studio', 'Film Studio', 'Movie Studio', 'Studio', 'Set', 'Set', 'Location', 'Filming Location', 'Location', 'Shoot Location', 'Setting',
    ],
    Medium: [
      'Blockbuster', 'Hit Movie', 'Hit', 'Box Office Hit', 'Smash Hit', 'Mega Hit', 'Summer Blockbuster', 'Holiday Blockbuster', ' blockbuster', 'Hit', 'Smash',
      'Oscar', 'Academy Award', 'Academy Award', 'Oscar Award', 'Oscar', 'Gold Statue', 'Oscar Statuette', 'Trophy', 'Award', 'Prize',
      'BAFTA', 'Golden Globe', 'Golden Globe', 'Cannes', 'Palme', 'Palme Dor', 'Palm', 'Venice', 'Venice Film', 'Berlin', 'Berlin Film',
      'Screen Actors Guild', 'SAG', 'Screen Actors Guild Award', 'SAG Award', 'AFI', 'American Film Institute', 'National Film Registry', 'Registry', 'Film Registry', 'Archive',
      'Indie Film', 'Independent Film', 'Indie Movie', 'Independent Movie', 'Art House', 'Art Film', 'Foreign Film', 'Foreign Movie', 'International Film', 'World Cinema',
      'Foreign Language', 'Subtitled', 'Dubbed', 'Dubbing', 'Voice Over', 'Voiceover', 'Voice Dub', 'Audio Dub', 'Dubbed Version', 'Version',
      'Sequel', 'Prequel', 'Threequel', 'Trilogy', 'Series', 'Franchise', 'Saga', 'Epic', 'Saga', 'Series',
      'Remake', 'Reboot', 'Reimagining', 'Adaptation', 'Book Adaptation', 'Novel Adaptation', 'Source Material', 'Original', 'Original', 'Inspiration',
    ],
    Hard: [
      'Cannes Film Festival', 'Cannes', 'Venice Film Festival', 'Venice', 'Berlin Film Festival', 'Berlin', 'Berlinale', 'Toronto International', 'TIFF', 'Sundance', 'Sundance Film',
      'Sundance Film Festival', 'Telluride', 'Telluride Film', 'Telluride Film Festival', 'SXSW', 'South By Southwest', 'Austin Film', 'Tribeca', 'Tribeca Film',
      'Tribeca Film Festival', 'New York Film', 'NYFF', 'New York Film Festival', 'Los Angeles Film', 'LAFF', 'Los Angeles Film Festival', 'Film Festival', 'Fest',
      'Film Festival circuit', 'Festival Circuit', 'Festival Season', 'Awards Season', 'Oscars Season', 'Globes Season', 'Award Season', 'Prestige Season', 'Prestige',
      'Oscar Campaign', 'Campaign', 'For Your Consideration', 'FYC', 'Category', 'Category', '分支', 'Branching', 'Fork', 'Choose',
      'Branching Narrative', 'Interactive Film', 'Interactive Movie', 'Choose Your Own Adventure', 'CYOA', 'Game Show Film', 'Game Film', 'Video Game Movie', 'Gamovie', 'Gamer',
      'Motion Capture', 'Mocap', 'Performance Capture', 'Perfcap', 'Facial Capture', 'Facial Mocap', 'Body Capture', ' mocap', 'Digital Actor', 'Digital Double',
      'Deepfake', 'Deep Fake', 'AI Actor', 'Artificial Actor', 'Virtual Actor', 'Hologram', 'Holographic', 'Holographic Film', 'Holo Film', 'Hologram Movie',
    ],
  },
  Drinks: {
    Easy: [
      'Water', 'Ice Water', 'Cold Water', 'Hot Water', 'Boiling Water', 'Spring Water', 'Mineral Water', 'Sparkling Water', 'Tonic Water', 'Soda Water',
      'Soda', 'Cola', 'Coke', 'Pepsi', 'Sprite', '7 Up', 'Seven Up', 'Fanta', 'Mountain Dew', 'Dr Pepper',
      'Lemonade', 'Pink Lemonade', 'Limeade', 'Limeade', 'Orangeade', 'Root Beer', 'Rootbeer', 'Ginger Ale', 'Club Soda', 'Tonic',
      'Coffee', 'Espresso', 'Latte', 'Cappuccino', 'Americano', 'Mocha', 'Hot Chocolate', 'Hot Cocoa', 'Cocoa', 'Chocolate Milk',
      'Tea', 'Green Tea', 'Black Tea', 'Oolong', 'Herbal Tea', 'Mint Tea', 'Chamomile', 'White Tea', 'Earl Grey', 'English Breakfast', 'Masala Chai',
      'Milk', 'Whole Milk', 'Skim Milk', 'Low Fat Milk', '2 Percent', 'Half And Half', 'Half Half', 'Cream', 'Half Cream', 'Co cream',
      'Juice', 'Orange Juice', 'Apple Juice', 'Grape Juice', 'Cranberry Juice', 'Tomato Juice', 'V8', 'Vegetable Juice', 'Carrot Juice', 'Fruit Juice',
      'Smoothie', 'Fruit Smoothie', 'Protein Smoothie', 'Shake', 'Milkshake', 'Malt', 'Malt Shake', 'Thickshake', ' Thick Shake', 'Thinshake',
    ],
    Medium: [
      'Coconut Water', 'Coconut Milk', 'Almond Milk', 'Oat Milk', 'Soy Milk', 'Rice Milk', 'Cashew Milk', 'Hemp Milk', 'Flax Milk', 'Macadamia Milk',
      'Kombucha', 'Kefir', 'Water Kefir', 'Milk Kefir', 'Yogurt Drink', 'Probiotic Drink', 'Kefir Drink', 'Tibetan Butter', 'Butter Tea', 'Butter Coffee',
      'Mate', 'Yerba Mate', 'Yerba', 'Guaraná', 'Guarana', 'Guaran', 'Ayahuasca', 'Ayahuasca', 'San Pedro', 'San Pedro',
      'Cactus', 'Peyote', 'Peyotl', 'Mescal', 'Mescaline', 'Agave', 'Agave Nectar', 'Agave Syrup', 'Nectar', 'Syrup',
      'Aloe Vera', 'Aloe Juice', 'Aloe Water', 'Aloe Drink', 'Goji', 'Goji Juice', 'Goji Berry', 'Goji', 'Pomegranate', 'Pomegranate Juice',
      'Acai', 'Acai Juice', 'Acai Berry', 'Mango Juice', 'Papaya Juice', 'Passion Fruit', 'Passion Fruit Juice', 'Guava Juice', 'Lychee Juice',
      'Protein Shake', 'Protein Drink', 'Meal Replacement', 'Meal Shake', 'Protein Powder', 'Whey Protein', 'Casein Protein', 'Soy Protein', 'Plant Protein', 'Protein',
      'Energy Drink', 'Sports Drink', 'Power Drink', 'Boost', 'Red Bull', 'Monster', 'Rockstar', 'Bang', 'Celsius', 'Reign',
    ],
    Hard: [
      'Absinthe', 'Green Fairy', 'Green Nymph', 'Fée Verte', 'Fee Verte', 'La Fée Verte', 'La Fee Verte', 'Pastis', 'Pernod', 'Ouzo',
      'Anisette', 'Anis', 'Sambuca', 'Raki', 'Arak', 'Araq', 'Tsikoti', 'Tsikoudia', 'Tsipouro', 'Rakia', 'Rakija',
      'Snake Wine', 'Snake liquor', 'Baijiu', 'Sorghum', 'Kaoliang', 'Soju', 'Makgeolli', 'Rice Wine', 'Rice Wine', 'Chinese Wine',
      'Huangjiu', 'Yellow Wine', 'Mei Kwei', 'Mijui', 'Mui', 'Chow', 'Chou', 'Chiang', 'Shaoxing', 'Shaohsing', 'Shao Hsing',
      'Pulque', 'Tepache', 'Pulque', 'Aguamiel', 'Aguamiel', 'Mesquite', 'Mesquite Wine', 'Mesquite Beer', 'Corn Beer', 'Chicha', 'Chicha Morada',
      'Chicha Andina', 'Corn Chicha', 'Andean Chicha', 'Kullasa', 'Kullasa', 'Mote', 'Mote', 'Pinole', 'Pinole', 'Atole',
      'Champurrado', 'Chocolate', 'Atole', 'Champurrado', 'Pozol', 'Pozole', 'Pozol', 'Tesgüino', 'Tesguino', 'Tiswin', 'Buli',
      'Tepache', 'Tepache', 'Cola De Mono', 'Cola Mono', 'Chicha De Jota', 'Jota', 'Chicha De Arroz', 'Chicha Rice', 'Chicha Rice Beer', 'Chicha', 'Chicha',
    ],
  },
  Flowers: {
    Easy: [
      'Rose', 'Tulip', 'Daisy', 'Lily', 'Orchid', 'Iris', 'Violet', 'Pansy', 'Petunia', 'Marigold',
      'Zinnia', 'Dahlia', 'Sunflower', 'Poppy', 'Cosmos', 'Aster', 'Chrysanthemum', 'Mum', 'Carnations', 'Carnation',
      'Carnations', 'Carnations', 'Peony', 'Peonies', 'Hydrangea', 'Gardenias', 'Gardenia', 'Jasmine', 'Gardenia', 'Hibiscus',
      'Hibiscus', 'Plumeria', 'Frangipani', 'Orchids', 'Orchid', 'Cymbidium', 'Cattleya', 'Dendrobium', 'Phalaenopsis', 'Vanda', 'Oncidium',
      'Daffodil', 'Narcissus', 'Jonquil', 'Hyacinth', 'Bluebell', 'Snowdrop', 'Crocus', 'Anemone', 'Anemone', 'Windflower',
      'Amaryllis', 'Amaryllis', 'Belladonna', 'Belladonna', 'Naked Lady', 'Naked Ladies', 'Naked Lady', 'Naked Lady', 'Naked Lady', 'Naked Lady',
      'Lavender', 'Lavender', 'Lavender', 'Lavender', 'Lavender', 'Lavender', 'Lilac', 'Lilac', 'Lilac', 'Lilac',
      'Lilac', 'Lilac', 'Lilac', 'Lilac', 'Lilac', 'Lilac', 'Lilac', 'Lilac', 'Lilac', 'Lilac',
    ],
    Medium: [
      'Bird Of Paradise', 'Bird Paradise', 'Strelitzia', 'Bird Of Paradise', 'Paradise Bird', 'Strelitzia', 'Banana Flower', 'Banana Blossom', 'Banana Flower', 'Banana Blossom',
      'Frangipani', 'Plumeria', 'Temple Flower', 'Temple Blossom', 'Mandalay', 'Mandalay', 'Mimosa', 'Mimosa', 'Wattle', 'Golden Wattle',
      'Wattle', 'Acacia', 'Acacia', 'Blackwood', 'Blackwood', 'Acacia', 'Acacia', 'Bauhinia', 'Bauhinia', 'Orchid Tree', 'Orchid Tree',
      'Bougainvillea', 'Bougainvillea', 'Bougainvillea', 'Bougainvillea', 'Bougainvillea', 'Bougainvillea', 'Bougainvillea', 'Bougainvillea', 'Bougainvillea', 'Bougainvillea',
      'Night Blooming', 'Night Blooming Jasmine', 'Night Blooming Jasmine', 'Night Blooming Jasmine', 'Queen Of The Night', 'Queen Night', 'Night Flower', 'Night Flower', 'Night Flower',
      'Night Blooming Cereus', 'Cereus', 'Cereus', 'Cereus', 'Cereus', 'Selenicereus', 'Selenicereus', 'Dragon Bloom', 'Dragon Flower', 'Dragon Flower',
      'Moon Flower', 'Moonflower', 'Moon Vine', 'Moon Vine', 'Ipomoea', 'Ipomoea', 'Morning Glory', 'Morning Glory', 'Morning Glory', 'Morning Glory',
      'Morning Glory', 'Morning Glory', 'Morning Glory', 'Morning Glory', 'Morning Glory', 'Morning Glory', 'Morning Glory', 'Morning Glory', 'Morning Glory', 'Morning Glory',
    ],
    Hard: [
      'Bleeding Heart', 'Bleeding Hearts', 'Bleeding Heart', 'Dicentra', 'Dicentra', 'Dicentra', 'Dutchman Breetches', 'Dutchman Breeches', 'Dutchman Breeches', 'Dutchman Breeches',
      'Dutchman Pipe', 'Dutchman Pipe', 'Dutch Pipe', 'Aristolochia', 'Aristolochia', 'Aristolochia', 'Birthroot', 'Birthroot', 'Birthroot', 'Birthroot',
      'Birthroot', 'Birthroot', 'Trillium', 'Trillium', 'Trillium', 'Trillium', 'Wake Robin', 'Wake Robin', 'Wake Robin', 'Wake Robin',
      'Jack In The Pulpit', 'Jack Pulpit', 'Jackpulpit', 'Arisaema', 'Arisaema', 'Arisaema', 'Wakewort', 'Wakewort', 'Cuckoopint', 'Cuckoopint',
      'Cuckoopint', 'Cuckoo Pint', 'Lord And Ladies', 'Lords And Ladies', 'Lords Ladies', 'Lords Ladies', 'Adam And Eve', 'Adam Eve', 'Adam And Eve',
      'Bullock', 'Bullock', 'Bull', 'Bull', 'Poison Ivy', 'Poison Ivy', 'Poison Oak', 'Poison Oak', 'Poison Sumac', 'Poison Sumac',
      'Venus Flytrap', 'Venus Fly Trap', 'Venus Flytrap', 'Venus Flytrap', 'Dionaea', 'Dionaea', 'Dionaea Muscipula', 'Dionaea Muscipula', 'M Venus', 'M Venus',
      'Sundew', 'Sundew', 'Sundew', 'Sundew', 'Pitcher Plant', 'Pitcherplant', 'Pitcher Plant', 'Butterwort', 'Butterwort', 'Butterwort', 'Butterwort',
    ],
  },
  Colors: {
    Easy: [
      'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Black', 'White', 'Brown',
      'Gray', 'Grey', 'Beige', 'Tan', 'Camel', 'Navy', 'Navy Blue', 'Royal Blue', 'Sky Blue', 'Cobalt',
      'Teal', 'Turquoise', 'Aqua', 'Aquamarine', 'Cyan', 'Magenta', 'Violet', 'Indigo', 'Lime', 'Lime Green',
      'Olive', 'Olive Green', 'Mint', 'Mint Green', 'Emerald', 'Emerald Green', 'Forest Green', 'Moss Green', 'Sea Green', 'Seafoam',
      'Coral', 'Coral', 'Salmon', 'Salmon Pink', 'Peach', 'Apricot', 'Mango', 'Papaya', 'Tangerine', 'Marigold',
      'Gold', 'Silver', 'Bronze', 'Copper', 'Brass', 'Platinum', 'Steel', 'Iron', 'Pewter', 'Chrome',
      'Ruby', 'Ruby Red', 'Scarlet', 'Crimson', 'Burgundy', 'Maroon', 'Wine', 'Mulberry', 'Plum', 'Grape',
      'Amethyst', 'Amethyst Purple', 'Lavender', 'Lilac', 'Iris', 'Periwinkle', 'Periwinkle', 'Wisteria', 'Violet Blue', 'Iris Blue',
    ],
    Medium: [
      'Turquoise', 'Turquoise Green', 'Jade', 'Jade Green', 'Jade', 'Jade', 'Bamboo', 'Bamboo Green', 'Artichoke', 'Artichoke Green', 'Artichoke',
      'Sage', 'Sage Green', 'Sage Green', 'Sage', 'Basil', 'Basil Green', 'Basil', 'Fern', 'Fern Green', 'Fern',
      'Moss', 'Moss Green', 'Moss', 'Shamrock', 'Shamrock Green', 'Shamrock', 'Pistachio', 'Pistachio Green', 'Pistachio', 'Pistachio',
      'Pear', 'Pear Green', 'Pear', 'Pear Green', 'Avocado', 'Avocado Green', 'Avocado', 'Verdigris', 'Verdigris', 'Verdigris',
      'Patina', 'Patina', 'Patina', 'Patina', 'Cerulean', 'Cerulean Blue', 'Cerulean', 'Sapphire', 'Sapphire Blue', 'Sapphire',
      'Lapis', 'Lapis Lazuli', 'Lapis Lazuli', 'Ultra Marine', 'Ultramarine', 'Ultramarine Blue', 'Cobalt Blue', 'Cobalt', 'Prussian Blue', 'Prussian',
      'Midnight', 'Midnight Blue', 'Midnight', 'Midnight', 'Navy', 'Navy Blue', 'Midnight', 'Midnight', 'Midnight', 'Midnight',
      'Denim', 'Denim Blue', 'Denim', 'Denim', 'Jean Blue', 'Jeans', 'Jeans', 'Jeans', ' indigo', 'Indigo',
    ],
    Hard: [
      'Cadmium Red', 'Cadmium Orange', 'Cadmium Yellow', 'Cadmium Green', 'Cadmium Blue', 'Cadmium Purple', 'Cadmium', 'Cerulean', 'Cerulean', 'Cerulean',
      'Alizarin', 'Alizarin Crimson', 'Alizarin', 'Alizarin', 'Carmine', 'Carmine', 'Carmine', 'Carmine', 'Carmine', 'Carmine',
      'Vermilion', 'Vermilion', 'Vermilion', 'Vermilion', 'Cinnabar', 'Cinnabar', 'Cinnabar', 'Cinnabar', 'Cinnabar', 'Cinnabar',
      'Naples Yellow', 'Naples Yellow', 'Naples', 'Naples', 'Naples', 'Naples', 'Naples', 'Naples', 'Naples', 'Naples',
      'Naples Yellow', 'Naples Yellow', 'Titanium White', 'Titanium White', 'Titanium White', 'Titanium', 'Titanium White', 'Lead White', 'Lead White', 'Lead White',
      'Flake White', 'Flake White', 'Flake White', 'Flake', 'Flake White', 'Zinc White', 'Zinc White', 'Zinc', 'Zinc White', 'Zinc',
      'Ivory Black', 'Ivory Black', 'Ivory Black', 'Ivory Black', 'Bone Black', 'Bone Black', 'Bone Black', 'Bone Black', 'Lamp Black', 'Lamp Black',
      'Vine Black', 'Vine Black', 'Vine Black', 'Vine Black', 'Mars Black', 'Mars Black', 'Mars Black', 'Mars Black', 'Mars Black', 'Mars Black',
    ],
  },
};

let usedWords: Set<string> = new Set();
let lastPickedCategory: Category | null = null;

export function resetUsedWords(): void {
  usedWords.clear();
  lastPickedCategory = null;
}

export function getLastPickedCategory(): Category | null {
  return lastPickedCategory;
}

function getOneWord(category: Category, difficulty: DifficultyWithMix): string | null {
  let availableWords: string[] = [];

  if (difficulty === 'Mix') {
    const allDifficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
    for (const diff of allDifficulties) {
      availableWords = availableWords.concat(wordDatabase[category][diff]);
    }
  } else {
    availableWords = wordDatabase[category][difficulty];
  }

  const unusedAvailableWords = availableWords.filter(word => !usedWords.has(word.toUpperCase()));

  if (unusedAvailableWords.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * unusedAvailableWords.length);
  const selectedWord = unusedAvailableWords[randomIndex];

  usedWords.add(selectedWord.toUpperCase());

  return selectedWord;
}

function getCategoryForRandom(lastCategory: Category | null): Category {
  const excluding = lastCategory ? [lastCategory] : [];
  const available = CATEGORIES.filter(c => !excluding.includes(c));
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

export function getRandomWord(category: Category, difficulty: DifficultyWithMix): string | null {
  if (category === 'Random') {
    const actualCategory = getCategoryForRandom(lastPickedCategory);
    lastPickedCategory = actualCategory;
    const word = getOneWord(actualCategory, difficulty);
    if (word === null) {
      resetUsedWords();
      return getOneWord(actualCategory, difficulty);
    }
    return word;
  }

  const word = getOneWord(category, difficulty);
  if (word === null) {
    resetUsedWords();
    return getOneWord(category, difficulty);
  }
  return word;
}

export function getRandomWords(category: Category, difficulty: Difficulty, count: number = 8): string[] {
  const words: string[] = [];
  let maxAttempts = 10;

  while (words.length < count && maxAttempts > 0) {
    if (category === 'Random') {
      const actualCategory = getCategoryForRandom(lastPickedCategory);
      lastPickedCategory = actualCategory;
      const word = getOneWord(actualCategory, difficulty);
      if (word !== null && !words.includes(word)) {
        words.push(word);
      } else if (word === null) {
        resetUsedWords();
        maxAttempts--;
      }
    } else {
      const word = getOneWord(category, difficulty);
      if (word !== null && !words.includes(word)) {
        words.push(word);
      } else if (word === null) {
        resetUsedWords();
        maxAttempts--;
      }
    }
  }

  return words;
}

if (__DEV__) {
  console.log('Test 1:', getRandomWords('Animals', 'Mix', 8));
  console.log('Test 2:', getRandomWords('Animals', 'Mix', 8));
  console.log('Test 3:', getRandomWords('Animals', 'Mix', 8));
}