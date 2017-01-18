#!/usr/bin/env ruby

require 'fileutils'

scripts_dir = File.expand_path File.dirname(__FILE__)
codeship_cache_directory = File.join Dir.home, 'cache'
thumbs_cache_dir_path = File.join codeship_cache_directory, 'thumbnails'
images_directory = File.expand_path File.join(scripts_dir, '..', 'images')


puts thumbs_cache_dir_path

# copy cached thumbnails from last build
if Dir.exist?(thumbs_cache_dir_path)
  thumbnail_cache_directories = Dir.glob(File.join(thumbs_cache_dir_path, '*', 'thumbs')).map { |p| File.expand_path p }

  thumbnail_cache_directories.each do |thumbnail_cache_directory|
    destination_directory_name = thumbnail_cache_directory.sub(thumbs_cache_dir_path, '')
    destination_directory_path = File.join(images_directory, destination_directory_name)
    puts thumbnail_cache_directory
    puts destination_directory_path
    FileUtils.cp_r thumbnail_cache_directory, destination_directory_path
  end
end
