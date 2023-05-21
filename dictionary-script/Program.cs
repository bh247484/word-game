// See https://aka.ms/new-console-template for more information
using System.Text.Json;

Console.WriteLine("Script Init");


string[] unixWords = System.IO.File.ReadAllLines("./unix-dict.txt");
string[] scrabbleWords = System.IO.File.ReadAllLines("./scrabble-dict.txt");
string[] words = unixWords.Union(scrabbleWords).ToArray();
Array.Sort(words, (x,y) => String.Compare(x, y));

Dictionary<int, HashSet<string>> wordSort = new Dictionary<int, HashSet<string>>();

int i = 0;
foreach (string word in words) {
  int strlen = word.Length;
  // if(strlen == 3){
  if (strlen > 2){

    if (wordSort.ContainsKey(strlen)) {
      wordSort[strlen].Add(word.ToLower());
    } else {
      wordSort[strlen] = new HashSet<string>();
      wordSort[strlen].Add(word.ToLower());
    }
  }

  // Nudge index.
  i++;
}


SortedDictionary<int, string> strSort = new SortedDictionary<int, string>();

// Implode arrays to strings.
foreach (KeyValuePair<int, HashSet<string>> kvp in wordSort) {
  strSort[kvp.Key] = string.Join("", kvp.Value);
}

// Debugging log.
// foreach (KeyValuePair<int, string> kvp in strSort)
//   if(kvp.Key == 3) Console.WriteLine("Key = {0}, Value = {1}", kvp.Key, kvp.Value);

using FileStream createStream = File.Create("dictionary.json");
await JsonSerializer.SerializeAsync(createStream, strSort);
await createStream.DisposeAsync();

string finalStr = "";
foreach (KeyValuePair<int, string> kvp in strSort) {
  finalStr += $"{kvp.Value},";
}

// Write string to txt file.
await File.WriteAllTextAsync(
  "FinalCompDict.txt",
  // Chop off the last trailing comma.
  finalStr.Remove(finalStr.Length - 1)
);
