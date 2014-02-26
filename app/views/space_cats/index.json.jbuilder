json.array!(@space_cats) do |space_cat|
  json.extract! space_cat, :id
  json.url space_cat_url(space_cat, format: :json)
end
