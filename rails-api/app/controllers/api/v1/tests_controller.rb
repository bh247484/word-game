class Api::V1::TestsController < ApplicationController
  def index
    render plain: 'Hello from Rails api!'
  end
end
