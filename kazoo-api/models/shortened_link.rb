class ShortenedLink
  include Mongoid::Document

  field :slug, type: String
  field :target_url, type: String

  def self.create_slug url_to_shorten
    Digest::MD5.hexdigest(url_to_shorten)[0..6]
  end

  def self.find_or_create_by url_to_shorten
    existing_link = ShortenedLink.where(target_url: url_to_shorten).first
    if existing_link
      existing_link
    else
      ShortenedLink.create target_url: url_to_shorten, slug: ShortenedLink.create_slug(url_to_shorten)
    end
  end
end