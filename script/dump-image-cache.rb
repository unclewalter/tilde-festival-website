#!/usr/bin/env ruby

require 'fileutils'

scripts_dir = File.expand_path File.dirname(__FILE__)

codeship_cache_directory = File.join Dir.home, 'cache'

thumbs_cache_dir_path = File.join codeship_cache_directory, 'thumbnails'

puts thumbnail_directories

# # delete thumbnail cache directory
FileUtils.rm_rf thumbs_cache_dir_path
