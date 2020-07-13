# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


nioh_2 = VideoGame.create(name: "Nioh 2", new: 39.99, pre_owned: 34.99, stars: 4.5, image: "nioh2.jpg", company_name: "Team Ninja", rated: "M", genre_id: 3)
dark_souls_3 = VideoGame.create(name: "Dark Souls 3", new: 19.99, pre_owned: 18.99, stars: 5.0, image: "DarkSouls3.jpg", company_name: "Bandai Namco", rated: "M", genre_id: 3)