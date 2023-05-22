class ChangePrimaryKey < ActiveRecord::Migration[7.0]
  def change
    remove_column :scored_words, :id
  end
end
