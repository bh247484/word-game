class ChangeColumnName < ActiveRecord::Migration[7.0]
  def change
    rename_column :scored_words, :frequency, :times_scored
  end
end
