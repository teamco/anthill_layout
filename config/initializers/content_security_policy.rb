# Rails.application.config.content_security_policy do |p|
#   p.font_src :self, :https, :data
#   p.img_src :self, :https, :data
#   p.style_src :self, :https, :unsafe_inline
#   p.object_src :none
#
#   if Rails.env.development?
#     p.script_src :self, :https, :unsafe_eval
#     p.default_src :self, :https, :unsafe_eval
#     p.connect_src :self, :https, 'http://192.168.56.10:3035', 'ws://192.168.56.10:3035'
#   else
#     p.script_src :src, :https
#     p.default_src :src, :https
#   end
# end