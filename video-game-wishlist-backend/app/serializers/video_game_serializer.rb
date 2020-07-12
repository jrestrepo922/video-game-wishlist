class VideoGameSerializer < ActiveModel::Serializer
  attributes :id, :name, :new, :pre_owned, :stars, :image, :company_name, :rated, :genre_id
end
