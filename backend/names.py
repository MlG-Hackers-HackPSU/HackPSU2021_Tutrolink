from random import choice

firstnames = ('Baby Oil', 'Bad News', 'Big Burps', "Bill 'Beenie-Weenie'",
        "Bobbert", 'Bowel Noises', 'Boxelder', "Buddy",
        'Butterbean', 'Buttermilk', 'Brimbob', 'Chad', 'Chesterfield',
        'Chewy', 'Mr. Krabs', 'Cinnabuns', 'Cleet', 'Cornbread', 'Crusty' 'Crab Meat',
        'Crapps', 'Dark Skies', 'Dennis Clawhammer', 'Dicman', 'Elphonso',
        'Fancypants', 'Figgs', 'Foncy', 'Gootsy', 'Greasy Jim', 'Huckleberry',
        'Huggy', 'Ignatious', 'Jimbo', "Joe 'Pottin Soil'", 'Johnny',
        'Lemongrass', 'Lil Debil', 'Longbranch', '"Lunch Money"', 'Mergatroid',
        '"Mr Peabody"', 'Oil-Can', 'Oinks', 'Old Scratch', 'Ovaltine',
        'Pennywhistle', 'Pitchfork Ben', 'Potato Bug', 'Pushmeet',
        'Rock Candy', 'Schlomo', 'Scratchensniff', 'Scut',
        "Sid 'The Squirts'", 'Skidmark', 'Slaps', 'Snakes', 'Snoobs',
        'Snorki', 'Soupcan Sam', 'Spitzitout', 'Spongebob', 'Squids', 'Stinky',
        'Storyboard', 'Sweet Tea', 'TeeTee', 'Franklin',
        "Winston 'Jazz Hands'", 'Worms', 'Gordon', 'Roger', 'Charlie',
        'This Is Not A Name', "Frump", "XQC", 'DaBaby', 'Steve', 'Tyler', 'Parker', 'Colin', 'Anthony')
        
lastnames = ('Appleyard', 'Bigmeat', 'Bloominshine', 'Boogerbottom',
        'Breedslovetrout', 'Butterbaugh', 'Clovenhoof', 'Clutterbuck',
        'Cocktoasten', 'Endicott', 'Fewhairs', 'Gooberdapple', 'Goodensmith',
        'Goodpasture', 'Guster', 'Henderson', 'Hooperbag', 'Hoosenater',
        'Hootkins', 'Jefferson', 'Jenkins', 'Jingley-Schmidt', 'Johnson',
        'Kingfish', 'Listenbee', "M'Bembo", 'McFadden', 'Moonshine', 'Nettles',
        'Noseworthy', 'Olivetti', 'Outerbridge', 'Overpeck', 'Overturf',
        'Oxhandler', 'Pealike', 'Pennywhistle', 'Peterson', 'Pieplow',
        'Pinkerton', 'Porkins', 'Putney', 'Quakenbush', 'Rainwater',
        'Rosenthal', 'Rubbins', 'Sackrider', 'Snuggleshine', 'Splern',
        'Stevens', 'Stroganoff', 'Sugar-Gold', 'Swackhamer', 'Tippins',
        'Turnipseed', 'Vinaigrette', 'Walkingstick', 'Wallbanger', 'Weewax',
        'Weiners', 'Whipkey', 'Wigglesworth', 'Wimplesnatch', 'Winterkorn',
        'Woolysocks')

def generateName():
    return "{} {}".format(choice(firstnames), choice(lastnames))