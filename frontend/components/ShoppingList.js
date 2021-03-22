import { useState, useEffect } from "react";

export default function ShoppingList({ client }) {
  const [items, setItems] = useState([]);
  const [fetched, setFetched] = useState(false);
  if (!fetched) {
    (async () => {
      const items = await client.getAll();
      setItems(items);
    })();
    setFetched(true);
  }

  const [formName, setFormName] = useState("");
  const [formQuantity, setFormQuantity] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const removeItem = async (name) => {
    setDisabled(true);
    await client.deleteItem({ name });
    setItems(items.filter((item) => item.name != name));
    setDisabled(false);
  };

  const addItem = async () => {
    setDisabled(true);
    const item = await client.postItem({
      name: formName,
      quantity: formQuantity,
    });
    setItems([...items, item]);
    setDisabled(false);
  };

  return (
    <>
      <h1>Items:</h1>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <span>Name: {item.name}</span>
            <span>Quantity: {item.quantity}</span>
            <button
              data-key={item.name}
              onClick={(e) => {
                e.preventDefault();
                const name = e.target.dataset.key;
                removeItem(name);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addItem();
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          min="0"
          step="1"
          required
          value={formQuantity}
          onChange={(e) => setFormQuantity(e.target.valueAsNumber)}
        />
        <input type="submit" disabled={disabled} />
      </form>
    </>
  );
}
