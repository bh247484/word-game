class CreateScoredWords < ActiveRecord::Migration[7.0]
  def change
    create_table :scored_words do |t|
      t.string :word
      t.integer :frequency

      t.timestamps
    end
  end
end
