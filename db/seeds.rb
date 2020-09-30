# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

# Examples:

#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Transaction.destroy_all

demo_user = User.create(fname: 'Guest', 
                        lname: 'Guest', 
                        username: 'demo_user', 
                        email: 'demo_user@appacademy.com', 
                        password: 'password123',
                        funds: 10000.00)

Transaction.create(ticker: 'AAPL',
                    user_id: 1,
                    num_shares: 3,
                    order_type: "buy",
                    price: 114.75)

Transaction.create(ticker: 'GOOGL',
                    user_id: 1,
                    num_shares: 3,
                    order_type: "buy",
                    price: 1460.29)

Transaction.create(ticker: 'UBER',
                    user_id: 1,
                    num_shares: 3,
                    order_type: "buy",
                    price: 34.75)
