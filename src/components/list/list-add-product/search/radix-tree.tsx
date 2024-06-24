import { ProductInList } from "@/constants";

class RadixNode {
  children: { [key: string]: RadixNode }; // Объект, где ключи — это подстроки, а значения — соответствующие дочерние узлы.
  isEndOfWord: boolean; // Флаг, указывающий, является ли узел концом слова.
  product: ProductInList | null; // Продукт, связанный с этим узлом.
  prefix: string; // Подстрока, представляющая часть слова, хранящегося в этом узле.

  constructor(prefix: string = "") {
    this.children = {}; // Инициализация пустого объекта для дочерних узлов.
    this.isEndOfWord = false; // Изначально узел не является концом слова.
    this.product = null; // Изначально продукт не связан с узлом.
    this.prefix = prefix; // Инициализация префикса.
  }
}

export class RadixTree {
  root: RadixNode; // Корневой узел дерева.

  constructor() {
    this.root = new RadixNode(); // Инициализация корневого узла.
  }

  // Метод для добавления продукта в дерево.
  insert(product: ProductInList, language: string) {
    const word = (product.name as { [key: string]: string })[language.toLowerCase()].toLowerCase(); // Название продукта на определенном языке, приведенное к нижнему регистру.
    let node = this.root; // Текущий узел, начиная с корня.
    let i = 0; // Индекс для прохода по символам слова.

    while (i < word.length) {
      let child = null; // Переменная для хранения найденного дочернего узла.
      // Поиск дочернего узла, чей ключ совпадает с текущим символом слова.
      for (const key in node.children) {
        if (word.startsWith(key, i)) {
          child = node.children[key];
          break;
        }
      }

      // Если дочерний узел найден.
      if (child) {
        const commonPrefix = this.getCommonPrefix(child.prefix, word.slice(i)); // Общий префикс между подстрокой и текущей частью слова.
        // Если общий префикс меньше длины подстроки дочернего узла.
        if (commonPrefix.length < child.prefix.length) {
          const newNode = new RadixNode(child.prefix.slice(commonPrefix.length)); // Создание нового узла с оставшейся частью подстроки.
          newNode.children = child.children; // Перемещение дочерних узлов в новый узел.
          newNode.isEndOfWord = child.isEndOfWord; // Копирование флага конца слова.
          newNode.product = child.product; // Копирование продукта.

          child.children = { [newNode.prefix[0]]: newNode }; // Присвоение новому узлу в качестве дочернего узла текущего.
          child.prefix = commonPrefix; // Обновление префикса текущего узла.
          child.isEndOfWord = false; // Сброс флага конца слова.
          child.product = null; // Сброс продукта.
        }
        node = child; // Переход к дочернему узлу.
        i += commonPrefix.length; // Увеличение индекса на длину общего префикса.
      } else {
        const newNode = new RadixNode(word.slice(i)); // Создание нового узла для оставшейся части слова.
        node.children[newNode.prefix[0]] = newNode; // Добавление нового узла в дочерние узлы текущего узла.
        node = newNode; // Переход к новому узлу.
        break;
      }
    }

    node.isEndOfWord = true; // Установка флага конца слова.
    node.product = product; // Присвоение продукта узлу.
  }

  // Метод для поиска продуктов по префиксу.
  search(prefix: string): ProductInList[] {
    let node = this.root; // Текущий узел, начиная с корня.
    let i = 0; // Индекс для прохода по символам префикса.

    while (i < prefix.length) {
      let child = null; // Переменная для хранения найденного дочернего узла.
      // Поиск дочернего узла, чей ключ совпадает с текущим символом префикса.
      for (const key in node.children) {
        if (prefix.startsWith(key, i)) {
          child = node.children[key];
          break;
        }
      }

      if (!child) return []; // Если дочерний узел не найден, возвращается пустой массив.

      // Если префикс дочернего узла совпадает с оставшейся частью префикса.
      if (child.prefix.startsWith(prefix.slice(i))) {
        return this.collectProducts(child); // Возвращаются все продукты, начиная с этого узла.
      }

      node = child; // Переход к дочернему узлу.
      i += child.prefix.length; // Увеличение индекса на длину префикса дочернего узла.
    }

    return this.collectProducts(node); // Возвращаются все продукты, начиная с текущего узла.
  }

  // Рекурсивный метод для сбора всех продуктов, начиная с заданного узла.
  private collectProducts(node: RadixNode): ProductInList[] {
    const results: ProductInList[] = [];
    if (node.isEndOfWord && node.product) {
      results.push(node.product); // Добавление продукта, если узел является концом слова.
    }
    for (const child of Object.values(node.children)) {
      results.push(...this.collectProducts(child)); // Рекурсивный сбор продуктов из дочерних узлов.
    }
    return results;
  }

  // Метод для нахождения общего префикса двух строк.
  private getCommonPrefix(str1: string, str2: string): string {
    let i = 0;
    while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
      i++; // Увеличение индекса до тех пор, пока символы строк совпадают.
    }
    return str1.slice(0, i); // Возвращение общего префикса.
  }
}
