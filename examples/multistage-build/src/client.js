import Item from "./item";

class Client {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAll() {
    console.log(this.baseUrl);
    const request = await fetch(`${this.baseUrl}/`, { method: "GET" });
    const response = await request.json();
    return response.map((obj) => new Item(obj.name, obj.quantity));
  }

  async postItem(item) {
    const request = await fetch(`${this.baseUrl}/`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { name, quantity } = await request.json();
    return new Item(name, quantity);
  }

  async deleteItem(item) {
    await fetch(`${this.baseUrl}/${item.name}`, {
      method: "DELETE",
    });
  }
}

export default Client;
