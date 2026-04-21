export type Category = 'Animals' | 'Festivals' | 'Food' | 'Sports' | 'Vehicles' | 'Travel' | 'Movies' | 'Drinks' | 'Flowers' | 'Colors';
export type CategoryInput = Category | 'Random';
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
      'Dog', 'Cat', 'Bird', 'Fish', 'Cow', 'Pig', 'Duck', 'Sheep', 'Horse', 'Lion',
      'Tiger', 'Bear', 'Wolf', 'Fox', 'Deer', 'Rabbit', 'Mouse', 'Snake', 'Frog', 'Bee',
      'Butterfly', 'Spider', 'Panda', 'Koala', 'Zebra', 'Giraffe', 'Elephant', 'Monkey', 'Kangaroo', 'Penguin',
      'Dolphin', 'Whale', 'Shark', 'Chicken', 'Goat',
    ],
    Medium: [
      'Raccoon', 'Skunk', 'Badger', 'Squirrel', 'Hedgehog', 'Porcupine', 'Beaver', 'Otter', 'Platypus', 'Armadillo',
      'Sloth', 'Leopard', 'Cheetah', 'Jaguar', 'Hippo', 'Rhino', 'Moose', 'Bison', 'Camel', 'Llama',
      'Alpaca', 'Antelope', 'Flamingo', 'Peacock', 'Parrot', 'Toucan', 'Owl', 'Eagle', 'Hawk', 'Crow',
      'Seal', 'Walrus', 'Crab', 'Lobster', 'Gecko',
    ],
    Hard: [
      'Axolotl', 'Pangolin', 'Narwhal', 'Okapi', 'Wombat', 'Tapir', 'Capybara', 'Quokka', 'Aardvark', 'Tarsier',
      'Lemur', 'Serval', 'Caracal', 'Ibex', 'Wildebeest', 'Numbat', 'Echidna', 'Mandrill', 'Civet', 'Ocelot',
      'Manatee', 'Dugong', 'Kiwi', 'Cassowary', 'Emu', 'Puffin', 'Albatross', 'Heron', 'Ibis', 'Hornbill',
      'Cormorant', 'Meerkat', 'Orangutan', 'Chimpanzee', 'Gorilla',
    ],
  },
  Festivals: {
    Easy: [
      'Christmas', 'Easter', 'Halloween', 'Thanksgiving', 'Birthday', 'New Year', 'Valentine', 'Wedding', 'Anniversary', 'Diwali',
      'Holi', 'Hanukkah', 'Ramadan', 'Eid', 'Carnival', 'Chinese New Year', 'Graduation', 'Parade', 'Fair', 'Gala',
      'Festival', 'Party', 'Baby Shower', 'Engagement', 'Prom', 'Reunion', 'Housewarming', 'Picnic', 'Barbecue', 'Block Party',
      'Dinner Party', 'Farewell Party', 'Welcome Party', 'Retirement Party', 'Bridal Shower',
    ],
    Medium: [
      'Oktoberfest', 'Lantern Festival', 'Moon Festival', 'Dragon Boat', 'Cherry Blossom', 'Songkran', 'Boxing Day', 'Guy Fawkes', 'Bonfire Night', 'Saint Patrick',
      'Cinco De Mayo', 'Bastille Day', 'Independence Day', 'Memorial Day', 'Labor Day', 'Mothers Day', 'Fathers Day', 'Earth Day', 'Arbor Day', 'May Day',
      'Canada Day', 'Australia Day', 'Anzac Day', 'Palm Sunday', 'Good Friday', 'Pentecost', 'Epiphany', 'Advent', 'Lent', 'Passover',
      'Purim', 'Rosh Hashanah', 'Yom Kippur', 'Sukkot', 'Shavuot',
    ],
    Hard: [
      'Pongal', 'Vaisakhi', 'Obon', 'Chuseok', 'Nowruz', 'Krampus', 'Kumbh Mela', 'Thaipusam', 'Raksha Bandhan', 'Ganesh Chaturthi',
      'Janmashtami', 'Onam', 'Ugadi', 'Basant Panchami', 'Guru Purnima', 'Meskel', 'Timkat', 'Sigd', 'Lag Baomer', 'Tisha Bav',
      'Kwanzaa', 'Juneteenth', 'Hogmanay', 'Saint Lucia', 'Mid Autumn', 'Makar Sankranti', 'Gudi Padwa', 'Karwa Chauth', 'Bhai Dooj', 'Simchat Torah',
      'Walpurgis Night', 'Twelfth Night', 'Tu Bishvat', 'Ash Wednesday', 'Shrove Tuesday',
    ],
  },
  Food: {
    Easy: [
      'Pizza', 'Burger', 'Pasta', 'Rice', 'Bread', 'Cake', 'Cookie', 'Pie', 'Ice Cream', 'Sandwich',
      'Soup', 'Salad', 'Taco', 'Hot Dog', 'Bacon', 'Egg', 'Cheese', 'Cereal', 'Butter', 'Apple',
      'Banana', 'Orange', 'Grape', 'Strawberry', 'Watermelon', 'Lemon', 'Carrot', 'Tomato', 'Potato', 'Onion',
      'Corn', 'Honey', 'Chocolate', 'Candy', 'Popcorn',
    ],
    Medium: [
      'Spaghetti', 'Lasagna', 'Ravioli', 'Macaroni', 'Gnocchi', 'Croissant', 'Bagel', 'Pretzel', 'Sushi', 'Ramen',
      'Dumpling', 'Noodle', 'Curry', 'Biryani', 'Paella', 'Risotto', 'Tamale', 'Empanada', 'Falafel', 'Hummus',
      'Kebab', 'Burrito', 'Quesadilla', 'Enchilada', 'Nachos', 'Guacamole', 'Waffle', 'Pancake', 'Donut', 'Muffin',
      'Brownie', 'Cupcake', 'Yogurt', 'Pudding', 'Omelette',
    ],
    Hard: [
      'Bouillabaisse', 'Ratatouille', 'Cassoulet', 'Sauerkraut', 'Kimchi', 'Miso', 'Tofu', 'Tempeh', 'Couscous', 'Tagine',
      'Gazpacho', 'Bruschetta', 'Antipasto', 'Carpaccio', 'Tiramisu', 'Baklava', 'Fondue', 'Raclette', 'Schnitzel', 'Goulash',
      'Strudel', 'Pierogi', 'Borscht', 'Blini', 'Poutine', 'Jambalaya', 'Gumbo', 'Polenta', 'Cannoli', 'Macaron',
      'Biscotti', 'Crepe', 'Souffle', 'Shakshuka', 'Tabbouleh',
    ],
  },
  Sports: {
    Easy: [
      'Soccer', 'Football', 'Basketball', 'Baseball', 'Hockey', 'Tennis', 'Golf', 'Swimming', 'Running', 'Boxing',
      'Wrestling', 'Volleyball', 'Rugby', 'Cricket', 'Bowling', 'Skating', 'Skiing', 'Snowboarding', 'Surfing', 'Cycling',
      'Climbing', 'Hiking', 'Archery', 'Diving', 'Gymnastics', 'Sailing', 'Rowing', 'Karate', 'Judo', 'Fishing',
      'Horse Riding', 'Jumping', 'Jogging', 'Kickboxing', 'Dodgeball',
    ],
    Medium: [
      'Lacrosse', 'Polo', 'Badminton', 'Squash', 'Racquetball', 'Handball', 'Softball', 'Fencing', 'Taekwondo', 'Aikido',
      'Sumo', 'Curling', 'Skateboarding', 'Rollerblading', 'Motorcycling', 'Snowmobiling', 'Jet Skiing', 'Water Skiing', 'Wakeboarding', 'Paragliding',
      'Skydiving', 'Bungee Jumping', 'Rock Climbing', 'Mountain Biking', 'Canoeing', 'Kayaking', 'Paddleboarding', 'Scuba Diving', 'Snorkeling', 'Triathlon',
      'Marathon', 'Hurdles', 'High Jump', 'Long Jump', 'Shot Put',
    ],
    Hard: [
      'Pentathlon', 'Decathlon', 'Biathlon', 'Steeplechase', 'Pole Vault', 'Discus', 'Javelin', 'Hammer Throw', 'Bobsledding', 'Luge',
      'Skeleton', 'Synchronized Swimming', 'Equestrian', 'Dressage', 'Show Jumping', 'Eventing', 'Rodeo', 'Bull Riding', 'Calf Roping', 'Barrel Racing',
      'Trampoline', 'Pommel Horse', 'Rhythmic Gymnastics', 'Parkour', 'Free Running', 'Base Jumping', 'Hang Gliding', 'Kite Surfing', 'Windsurfing', 'Spelunking',
      'Caving', 'Orienteering', 'Tug Of War', 'Netball', 'Capoeira',
    ],
  },
  Vehicles: {
    Easy: [
      'Car', 'Truck', 'Van', 'Bus', 'Taxi', 'Motorcycle', 'Bicycle', 'Scooter', 'Skateboard', 'Train',
      'Tram', 'Subway', 'Airplane', 'Helicopter', 'Boat', 'Ship', 'Yacht', 'Canoe', 'Kayak', 'Raft',
      'Ferry', 'Tractor', 'Fire Truck', 'Ambulance', 'Police Car', 'School Bus', 'Pickup', 'Jeep', 'Sled', 'Sleigh',
      'Wagon', 'Stroller', 'Wheelchair', 'Golf Cart', 'Bike',
    ],
    Medium: [
      'Sedan', 'Coupe', 'Hatchback', 'Minivan', 'Limousine', 'Convertible', 'Station Wagon', 'Crane', 'Bulldozer', 'Excavator',
      'Dump Truck', 'Tow Truck', 'Trailer', 'Camper', 'Motorhome', 'Hot Air Balloon', 'Blimp', 'Glider', 'Jet Ski', 'Snowmobile',
      'Moped', 'Rickshaw', 'Chariot', 'Carriage', 'Stagecoach', 'Gondola', 'Rowboat', 'Dinghy', 'Sailboat', 'Speedboat',
      'Submarine', 'Steamboat', 'Hovercraft', 'Cruise Ship', 'Monorail',
    ],
    Hard: [
      'Zeppelin', 'Biplane', 'Seaplane', 'Maglev', 'Funicular', 'Cable Car', 'Trolley', 'Tuk Tuk', 'Catamaran', 'Schooner',
      'Galleon', 'Frigate', 'Destroyer', 'Battleship', 'Aircraft Carrier', 'Icebreaker', 'Tugboat', 'Barge', 'Coracle', 'Junk',
      'Dhow', 'Pram', 'Penny Farthing', 'Unicycle', 'Segway', 'Palanquin', 'Howdah', 'Wheelbarrow', 'Dogsled', 'Chairlift',
      'Hot Rod', 'Go Kart', 'Dune Buggy', 'Hydroplane', 'Airship',
    ],
  },
  Travel: {
    Easy: [
      'Beach', 'Mountain', 'River', 'Lake', 'Ocean', 'Desert', 'Forest', 'Island', 'Park', 'Hotel',
      'Motel', 'Cabin', 'Camp', 'Airport', 'Train Station', 'Passport', 'Luggage', 'Backpack', 'Suitcase', 'Map',
      'Compass', 'Tent', 'Sleeping Bag', 'Postcard', 'Camping', 'Sightseeing', 'Souvenir', 'Cruise', 'Vacation', 'Holiday',
      'Trip', 'Journey', 'Adventure', 'Tour', 'Safari',
    ],
    Medium: [
      'Resort', 'Hostel', 'Lodge', 'Inn', 'Bungalow', 'Villa', 'Layover', 'Metro', 'Rental Car', 'Shuttle',
      'Balloon Ride', 'Road Trip', 'Honeymoon', 'Getaway', 'Expedition', 'Voyage', 'Pilgrimage', 'Retreat', 'Escape', 'Tour Guide',
      'Itinerary', 'Reservation', 'Boarding Pass', 'Visa', 'Customs', 'Border', 'Lighthouse', 'Monument', 'Cathedral', 'Museum',
      'Castle', 'Palace', 'Waterfall', 'Cave', 'Hot Spring',
    ],
    Hard: [
      'Oasis', 'Glacier', 'Fjord', 'Volcano', 'Canyon', 'Cavern', 'Geyser', 'Archipelago', 'Peninsula', 'Estuary',
      'Delta', 'Tundra', 'Savanna', 'Moor', 'Heath', 'Prairie', 'Steppe', 'Marsh', 'Swamp', 'Bayou',
      'Lagoon', 'Reef', 'Atoll', 'Crater', 'Mesa', 'Plateau', 'Dunes', 'Iceberg', 'Aurora', 'Monsoon',
      'Hurricane', 'Typhoon', 'Bazaar', 'Souk', 'Embassy',
    ],
  },
  Movies: {
    Easy: [
      'Action', 'Comedy', 'Drama', 'Horror', 'Thriller', 'Romance', 'Fantasy', 'Western', 'Animation', 'Cartoon',
      'Documentary', 'Musical', 'Family', 'Kids', 'War', 'Mystery', 'Crime', 'Silent', 'Short Film', 'Feature',
      'Movie', 'Film', 'Cinema', 'Theater', 'Film Reel', 'Ticket', 'Trailer', 'Poster', 'Scene', 'Script',
      'Actor', 'Actress', 'Director', 'Hero', 'Villain',
    ],
    Medium: [
      'Blockbuster', 'Oscar', 'Golden Globe', 'Red Carpet', 'Premiere', 'Sequel', 'Prequel', 'Trilogy', 'Franchise', 'Remake',
      'Reboot', 'Adaptation', 'Screenplay', 'Storyboard', 'Costume', 'Makeup', 'Props', 'Lighting', 'Sound', 'Editing',
      'Studio', 'Producer', 'Screenwriter', 'Cinematographer', 'Stunt Double', 'Stand In', 'Extra', 'Cameo', 'Narrator', 'Voiceover',
      'Soundtrack', 'Score', 'Credit', 'Dialogue', 'Subtitle',
    ],
    Hard: [
      'Montage', 'Flashback', 'Cliffhanger', 'Plot Twist', 'Foreshadowing', 'Exposition', 'Climax', 'Denouement', 'Antagonist', 'Protagonist',
      'Soliloquy', 'Monologue', 'Archetype', 'Motif', 'Allegory', 'Metaphor', 'Symbolism', 'Aesthetic', 'Genre', 'Auteur',
      'Method Acting', 'Improvisation', 'Blocking', 'Continuity', 'Composition', 'Lighting Design', 'Color Grading', 'Sound Design', 'Foley', 'Dubbing',
      'Looping', 'Mastering', 'Distribution', 'Box Office', 'Matinee',
    ],
  },
  Drinks: {
    Easy: [
      'Water', 'Milk', 'Juice', 'Tea', 'Coffee', 'Soda', 'Cola', 'Lemonade', 'Smoothie', 'Milkshake',
      'Hot Chocolate', 'Cocoa', 'Orange Juice', 'Apple Juice', 'Grape Juice', 'Iced Tea', 'Ice Water', 'Cappuccino', 'Latte', 'Espresso',
      'Mocha', 'Americano', 'Sprite', 'Punch', 'Frappe', 'Slushie', 'Shake', 'Root Beer', 'Ginger Ale', 'Cream Soda',
      'Fruit Punch', 'Milk Tea', 'Bubble Tea', 'Boba', 'Energy Drink',
    ],
    Medium: [
      'Kombucha', 'Kefir', 'Coconut Water', 'Almond Milk', 'Oat Milk', 'Soy Milk', 'Matcha', 'Green Tea', 'Black Tea', 'Oolong Tea',
      'Herbal Tea', 'Chamomile', 'Mint Tea', 'Earl Grey', 'Chai', 'Masala Chai', 'Turkish Coffee', 'French Press', 'Cold Brew', 'Drip Coffee',
      'Pour Over', 'Affogato', 'Macchiato', 'Flat White', 'Cortado', 'Vienna Coffee', 'Irish Coffee', 'Protein Shake', 'Sports Drink', 'Vitamin Water',
      'Eggnog', 'Horchata', 'Hibiscus Tea', 'Tonic Water', 'Cider',
    ],
    Hard: [
      'Mulled Cider', 'Sarsaparilla', 'Birch Beer', 'Malted Milk', 'Lassi', 'Mango Lassi', 'Buttermilk', 'Ayran', 'Ramune', 'Aloe Juice',
      'Lychee Juice', 'Passion Fruit', 'Rose Water', 'Tamarind Water', 'Jasmine Tea', 'Rooibos', 'Yerba Mate', 'Ginseng Tea', 'Dragon Fruit', 'Elderflower',
      'Rhubarb Soda', 'Egg Cream', 'Sweet Tea', 'Agua Fresca', 'Barley Tea', 'Salep', 'Chicha', 'Atole', 'Switchel', 'Shrub',
      'Posset', 'Wassail', 'Moxie', 'Persimmon Tea', 'Sage Tea',
    ],
  },
  Flowers: {
    Easy: [
      'Rose', 'Tulip', 'Daisy', 'Lily', 'Sunflower', 'Orchid', 'Iris', 'Violet', 'Pansy', 'Petunia',
      'Marigold', 'Daffodil', 'Lavender', 'Lilac', 'Poppy', 'Carnation', 'Chrysanthemum', 'Peony', 'Hydrangea', 'Hibiscus',
      'Jasmine', 'Gardenia', 'Begonia', 'Geranium', 'Dahlia', 'Zinnia', 'Azalea', 'Camellia', 'Magnolia', 'Snapdragon',
      'Buttercup', 'Dandelion', 'Bluebell', 'Snowdrop', 'Crocus',
    ],
    Medium: [
      'Foxglove', 'Hollyhock', 'Freesia', 'Anemone', 'Cosmos', 'Aster', 'Yarrow', 'Baby Breath', 'Bird Of Paradise', 'Amaryllis',
      'Hyacinth', 'Gladiolus', 'Delphinium', 'Larkspur', 'Sweet Pea', 'Nasturtium', 'Morning Glory', 'Lotus', 'Water Lily', 'Forget Me Not',
      'Columbine', 'Bleeding Heart', 'Ranunculus', 'Stock Flower', 'Statice', 'Heather', 'Wisteria', 'Clematis', 'Honeysuckle', 'Trumpet Vine',
      'Fuchsia', 'Impatiens', 'Calla Lily', 'Frangipani', 'Plumeria',
    ],
    Hard: [
      'Protea', 'Banksia', 'Kangaroo Paw', 'Waratah', 'Alstroemeria', 'Lisianthus', 'Gerbera', 'Gaillardia', 'Coreopsis', 'Cornflower',
      'Scabiosa', 'Agapanthus', 'Allium', 'Lupine', 'Penstemon', 'Phlox', 'Salvia', 'Verbena', 'Primrose', 'Auricula',
      'Cyclamen', 'Gazania', 'Osteospermum', 'Nigella', 'Hellebore', 'Cleome', 'Trillium', 'Edelweiss', 'Lady Slipper', 'Moth Orchid',
      'Cattleya', 'Dendrobium', 'Bougainvillea', 'Gloriosa', 'Periwinkle',
    ],
  },
  Colors: {
    Easy: [
      'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Black', 'White', 'Brown',
      'Gray', 'Silver', 'Gold', 'Navy', 'Teal', 'Cyan', 'Magenta', 'Beige', 'Tan', 'Maroon',
      'Lime', 'Mint', 'Peach', 'Coral', 'Salmon', 'Lavender', 'Olive', 'Sky Blue', 'Hot Pink', 'Crimson',
      'Scarlet', 'Emerald', 'Turquoise', 'Indigo', 'Violet',
    ],
    Medium: [
      'Chartreuse', 'Vermilion', 'Cerulean', 'Sapphire', 'Amber', 'Ruby', 'Burgundy', 'Mauve', 'Plum', 'Cream',
      'Ivory', 'Khaki', 'Rust', 'Sienna', 'Umber', 'Ochre', 'Saffron', 'Copper', 'Bronze', 'Pewter',
      'Charcoal', 'Slate', 'Taupe', 'Mustard', 'Chocolate', 'Caramel', 'Mahogany', 'Cobalt', 'Jade', 'Pearl',
      'Rose Gold', 'Blush', 'Champagne', 'Fuchsia', 'Periwinkle',
    ],
    Hard: [
      'Aubergine', 'Celadon', 'Aquamarine', 'Verdigris', 'Viridian', 'Malachite', 'Cinnabar', 'Carmine', 'Puce', 'Gamboge',
      'Heliotrope', 'Eggplant', 'Mulberry', 'Tangerine', 'Papaya', 'Cantaloupe', 'Apricot', 'Persimmon', 'Pomegranate', 'Goldenrod',
      'Citrine', 'Topaz', 'Opal', 'Onyx', 'Obsidian', 'Alabaster', 'Bisque', 'Ecru', 'Sepia', 'Raw Umber',
      'Burnt Sienna', 'Prussian Blue', 'Midnight Blue', 'Royal Blue', 'Wine Red',
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

export function getRandomWord(category: CategoryInput, difficulty: DifficultyWithMix): string | null {
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

export function getRandomWords(category: CategoryInput, difficulty: DifficultyWithMix, count: number = 8): string[] {
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
