module Author::SiteStoragesHelper

  def render_activated_version(f)
    render_collection_field(f, 'Version', {
        id: :activated_version,
        collection: @versions[:all],
        index: :id,
        value: :version,
        html: {
            selected: @versions[:activated].nil? ?
                nil : @versions[:activated].id
        }
    }) if @versions[:all].length > 0 if action_name == 'edit'
  end

  def creator?(user, creator)
    user.id == creator.id
  end

  def user_th
    th(%w(Email Name Provider Online Signin))
  end

  def user_td(user, creator)
    [
        "<tr#{creator?(user, creator) ? ' class="success"' : ''}>",
        "<td>#{link_to user.email}</td>",
        "<td>#{user.name}</td>",
        "<td>#{user.provider || t('password')}</td>",
        "<td><i class=\"glyphicon#{user.last_seen > 5.minutes.ago ? ' glyphicon-eye-open' : ''}\"</i></td>",
        "<td class=\"nw c\">#{user.last_sign_in_at.strftime('%Y %b %d %I:%M:%S %p')}</td></tr>"
    ].join.html_safe
  end

  def widget_selected?(item)
    @author_site_storage.author_widget_ids.include?(item.id)
  end

  def last_published?(item)
    av = activated(item)
    pv = published(item)
    av == pv && (av != '?' || pv != '?')
  end

  def render_as(layout = 'js', collection, user)
    "<div>#{layout}: #{collection.inspect}</div>".html_safe
    render "show_#{layout}",
        storage: collection,
        current_user: user
  end

  def widget_css_class(item)
    selected = widget_selected?(item) ? ' selected' : ''
    "input-group-addon widget #{item.resource.gsub(/\./, '-')}#{selected}"
  end

  def external_widget(item)
    item.is_external? ? ' external' : ''
  end

  def load_js(storage)
    send("js_#{storage[:mode]}", storage)
  end

  def js_development(storage)
    javascript_pack_tag('development', js_opts(storage))
  end

  def js_consumption(storage)
    javascript_pack_tag('app.consumption', js_opts(storage))
  end

  private

  def js_opts(storage)
    {
        'data-resource': storage[:key],
        'data-user': current_user.nil? ? 'guest' : current_user.email,
        'data-current': storage[:show],
        'data-published': storage[:published],
        'data-version': storage[:last],
        'data-activated': storage[:activated],
        'data-mode': storage[:mode],
        'data-environment': Rails.env,
        'data-deployed': storage[:deployed],
        'data-uuid': storage[:uuid],
        'id': 'require-init'
    }
  end

end
