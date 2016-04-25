module Author::SiteStoragesHelper

  def render_activated_version(f)
    render_collection_field(
        f, 'Version', {
             id: :activated_version,
             collection: @versions[:all],
             index: :id,
             value: :version,
             html: {
                 selected: @versions[:activated].nil? ?
                     nil : @versions[:activated].id
             }
         }
    ) if @versions[:all].length > 0 if action_name == 'edit'
  end

  def is_creator?(user, creator)
    user.id == creator.id
  end

  def user_th
    th(%w(Email Name Provider Online Signin))
  end

  def user_td(user, creator)
    [
        "<tr#{is_creator?(user, creator) ? ' class="success"' : ''}>",
        "<td>#{link_to user.email}</td>",
        "<td>#{user.name}</td>",
        "<td>#{user.provider || t('password')}</td>",
        "<td><i class=\"glyphicon#{user.last_seen > 5.minutes.ago ? ' glyphicon-eye-open' : ''}\"</i></td>",
        "<td class=\"nw c\">#{user.last_sign_in_at.strftime('%Y %b %d %I:%M:%S %p')}</td></tr>"
    ].join.html_safe
  end

  def is_widget_selected?(item)
    @author_site_storage.author_widget_ids.include?(item.id)
  end

  def published(item)
    item.get_published.version rescue '?'
  end

  def activated(item)
    item.get_activated.version rescue '?'
  end

  def is_last_published?(item)
    av = activated(item)
    pv = published(item)
    av == pv && (av != '?' || pv != '?')
  end
end