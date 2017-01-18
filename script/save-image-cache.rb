#!/usr/bin/env ruby

require 'fileutils'

scripts_dir = File.expand_path File.dirname(__FILE__)

codeship_cache_directory = File.join Dir.home, 'cache'

images_directory = File.expand_path File.join(scripts_dir, '..', 'images')
thumbnail_directories = Dir.glob(File.join(images_directory, '*', 'thumbs')).map { |p| File.expand_path p }
thumbs_cache_dir_path = File.join codeship_cache_directory, 'thumbnails'

puts thumbnail_directories

# # create thumbnail cache directory if it does not exist
FileUtils.mkdir_p thumbs_cache_dir_path unless Dir.exist?(thumbs_cache_dir_path)

# /Users/kevanatkins/Developer/Jekyll/tilde-website/images/academy/thumbs
# /Users/kevanatkins/Developer/Jekyll/tilde-website/images/gallery/thumbs
thumbnail_directories.each do |thumbnail_directory|
  destination_directory_name = (thumbnail_directory.sub images_directory, '').sub('/thumbs', '')
  destination_directory_path = File.join(thumbs_cache_dir_path, destination_directory_name)
  puts destination_directory_name
  FileUtils.mkdir_p destination_directory_path
  FileUtils.cp_r thumbnail_directory, destination_directory_path
end


# # # save built thumbs to Codeship cache directory
# if Dir.exist?(built_thumbnail_directory_path)
#   FileUtils.cp_r built_thumbnail_directory_path, thumbs_cache_dir_path
# end
