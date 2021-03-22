import ShoppingList from "../components/ShoppingList";
import Client from "../util/client";

export default function Index() {
  return process.browser ? (
    <ShoppingList client={new Client(`${window.location.href}api`)} />
  ) : (
    <></>
  );
}
