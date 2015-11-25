module Author::SiteStoragesHelper

  def render_activated_version(f)
    render_collection(
        f, 'Version', {
             id: :id,
             collection: @versions[:all],
             index: :id,
             value: :version,
             html: {
                 selected: @versions[:activated].nil? ?
                     nil : @versions[:activated].id
             }
         }
    ) if @versions[:all].length > 0
  end
end