class ShoppingList {
  constructor(gateway) {
    this.gateway = gateway;
  }

  getAll() {
    const items = this.gateway.getMap();
    return Object.entries(items).map(function ([name, qty]) {
      return new ShoppingListItem(name, qty);
    });
  }

  getByName(name) {
    const items = this.gateway.getMap();
    return items.hasOwnProperty(name)
      ? [true, new ShoppingListItem(name, items[name])]
      : [false];
  }

  addNewEntry(name, quantity) {
    const items = this.gateway.getMap();
    if (items.hasOwnProperty(name))
      return [false, new ShoppingListItem(name, items[name])];

    items[name] = quantity;
    this.gateway.saveMap(items);
    return [true, new ShoppingListItem(name, quantity)];
  }

  updateEntry(name, quantity) {
    const items = this.gateway.getMap();
    if (!items.hasOwnProperty(name)) return [false];

    items[name] = quantity;
    this.gateway.saveMap(items);
    return [true, new ShoppingListItem(name, quantity)];
  }

  deleteEntry(name) {
    const items = this.gateway.getMap();
    if (!items.hasOwnProperty(name)) return false;

    delete items[name];
    this.gateway.saveMap(items);
    return true;
  }
}

class ShoppingListItem {
  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
  }
}

module.exports = { ShoppingList, ShoppingListItem };
