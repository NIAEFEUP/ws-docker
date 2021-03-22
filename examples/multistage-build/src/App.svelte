<script>
  import ShoppingList from "./ShoppingList.svelte";
  import Client from "./client.js";
  let url = "";
  let connected = false;
</script>

<main>
  <form
    on:submit|preventDefault={() => {
      connected = !connected;
    }}
  >
    <h1>Connect</h1>
    <label for="url">Address</label>
    <input type="text" bind:value={url} />
    <input type="submit" value={connected ? "Disconnect" : "Connect"} />
  </form>

  {#if connected}
    <ShoppingList client={new Client(url)} />
  {:else}
    <p>Not connected</p>
  {/if}
</main>
