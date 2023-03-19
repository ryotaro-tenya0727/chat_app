# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
users = User.all
users.each do |user|
  3.times do |number|
    Message.create(content: "#{user.name}の#{number}番目のメッセージです！", user_id: user.id)
    puts "#{number}番目のメッセージを作成しました"
  end
end
