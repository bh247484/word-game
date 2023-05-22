class Api::V1::HighScoresController < ApplicationController
  def index
    high_scores = HighScore.all.order('score DESC')
    render json: high_scores
  end

  def post
    json = JSON.parse(request.body.read)
    high_scores = HighScore.all.order('score DESC')
    
    # If there's already 10 high scores...
    if high_scores.length == 10
      # Remove lowest score, to be replaced by new score.
      high_scores.last.destroy
    end

    # Add new incoming high score.
    new_entry = HighScore.create(name: json['name'], score: json['score'])
  end
end