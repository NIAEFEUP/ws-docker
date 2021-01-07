class RestShoppingListInteractor {
  constructor(shoppingList) {
    this.list = shoppingList;
  }

  getAll() {
    return { status: 200, body: this.list.getAll() };
  }

  getByName(name) {
    const [ok, item] = this.list.getByName(name);
    return ok ? { status: 200, body: item } : { status: 404 };
  }

  post(name, quantity) {
    const [ok, item] = this.list.addNewEntry(name, quantity);
    return { status: ok ? 201 : 409, body: item };
  }

  put(name, quantity) {
    const [ok, item] = this.list.updateEntry(name, quantity);
    return ok ? { status: 200, body: item } : { status: 404 };
  }

  delete(name) {
    const ok = this.list.deleteEntry(name);
    return { status: ok ? 204 : 404 };
  }
}

module.exports = RestShoppingListInteractor;
