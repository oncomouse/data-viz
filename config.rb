###
# Compass
###
set :markdown_engine, :kramdown
set :markdown, :fenced_code_blocks => true,
               :autolink => true, 
               :smartypants => true,
               :footnotes => true,
               :superscript => true


require "bourbon"

set :relative_links, true

# Change Compass configuration
compass_config do |config|
#   config.output_style = :compact
end

activate :bourbon
activate :neat

###
# Page options, layouts, aliases and proxies
###

page "*", :layout => "layout"


###
# Helpers
###

ready do
    ignore "**/*.rb"
end

helpers do
	
	def javascript_path(file_path)
		asset_path(:js, file_path)
	end
end

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

# Build-specific configuration
configure :build do

  # Change this to build with a different file root.	
  #set :http_prefix, "/my/prefix/folder"

  # For example, change the Compass output style for deployment
  #activate :minify_css

  # Minify Javascript on build
  #activate :minify_javascript

  #activate :gzip
  
  # Enable cache buster
  # activate :cache_buster

  # Use relative URLs
  activate :relative_assets

  # Compress PNGs after build
  # I wouldn't use this.
  #activate :smusher

  # Or use a different image path
  # set :http_path, "/Content/images/"
end

activate :deploy do |deploy|
  deploy.method = :git
  #deploy.user = "user"
  #deploy.host = "server.foobar.com"
  #deploy.path = "~/www/foobar.com"
end