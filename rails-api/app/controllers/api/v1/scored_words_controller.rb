class Api::V1::ScoredWordsController < ApplicationController
  def post
    json = JSON.parse(request.body.read)
    response = []
    json.each do |word|
      if ScoredWord.exists?(word: word)
        # If it exists increment times_scored column.
        scored_word = ScoredWord.find(word)
        scored_word.update(times_scored: scored_word.times_scored + 1)
      else        
        # If not add it and set times_scored to 1.
        scored_word = ScoredWord.create(word: word, times_scored: 1)
      end
      response.push(scored_word)
      puts word
    end
    render json: response
  end
end