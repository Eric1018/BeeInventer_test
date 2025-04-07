interface ITrieNode {
    children: Map<string, ITrieNode>;
    isEndOfWord: boolean;
  }
  
interface IDictionary {
  setup(words: string[]): void;
  isInDict(pattern: string): boolean;
}

class TrieNode implements ITrieNode {
  children: Map<string, ITrieNode> = new Map();
  isEndOfWord: boolean = false;
}

class SimpleDictionary implements IDictionary {
  private root: TrieNode = new TrieNode();

  setup(words: string[]): void {
    for (const word of words) {
      this.insert(word);
    }
  }

  private insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  isInDict(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }
}

const dict = new SimpleDictionary();
dict.setup(['cat', 'car', 'bar']);

console.log(dict.isInDict('cat')); 
console.log(dict.isInDict('bat')); 
