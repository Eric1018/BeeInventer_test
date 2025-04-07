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

class WildcardDictionary implements IDictionary {
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

  isInDict(pattern: string): boolean {
    return this.search(this.root, pattern, 0);
  }

  private search(node: TrieNode, pattern: string, index: number): boolean {
    if (index === pattern.length) {
      return node.isEndOfWord;
    }

    const char = pattern[index];

    if (char === '*') {
      for (const child of node.children.values()) {
        if (this.search(child, pattern, index + 1)) {
          return true;
        }
      }
      return false;
    } else {
      const nextNode = node.children.get(char);
      if (!nextNode) return false;
      return this.search(nextNode, pattern, index + 1);
    }
  }
}

const dict = new WildcardDictionary();
dict.setup(['cat', 'car', 'bar']);

console.log(dict.isInDict('cat')); 
console.log(dict.isInDict('bat')); 
console.log(dict.isInDict('*at')); 
console.log(dict.isInDict('cr*')); 
console.log(dict.isInDict('c*r')); 

  