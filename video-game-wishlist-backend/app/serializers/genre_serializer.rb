class GenreSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :video_games
end
