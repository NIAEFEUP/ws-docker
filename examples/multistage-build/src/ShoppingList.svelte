<script>
  export let client;

  let items = [];
  client.getAll().then((res) => (items = res));

  async function removeItem(name) {
    disabled = true;
    await client.deleteItem({ name });
    items = items.filter((item) => item.name != name);
    disabled = false;
  }

  let formName;
  let formQuantity;
  let disabled = false;

  async function addItem() {
    disabled = true;
    const item = await client.postItem({
      name: formName,
      quantity: formQuantity,
    });
    items = [...items, item];
    disabled = false;
  }
</script>

<h1>Items:</h1>
<ul>
  {#each items as item}
    <li>
      <span>Name: {item.name}</span>
      <span>Quantity: {item.quantity}</span>
      <button on:click={() => removeItem(item.name)} {disabled}>Remove</button>
    </li>
  {/each}
</ul>
<h1>Add Item</h1>
<form on:submit|preventDefault={addItem}>
  <label for="name">Name</label>
  <input type="text" bind:value={formName} name="name" required />
  <label for="quantity">Quantity</label>
  <input
    type="number"
    bind:value={formQuantity}
    name="quantity"
    min="0"
    step="1"
    required
  />
  <input type="submit" {disabled} />
</form>
