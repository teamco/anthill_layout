class Author::GitHubController < Author::AuthorController

  before_action :authenticate

  def create_repo(name)
    # TODO
  end

  private

  def authenticate
    @github = Github.new basic_auth: 'teamco:TR0ubLe99',
        user: 'teamco',
        repo: 'anthill_layout'
    @github.auth.app.create 'client-id', scopes: ['repo']
  end
end
