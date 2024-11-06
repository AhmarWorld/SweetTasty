export async function addBasket(
  setCartId,
  productId,
  price,
  quantity,
  clientToken,
  setIsAuth,
) {
  const request = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/carts/addItem",
    {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "any",
        Authorization: "Bearer " + clientToken,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        price: price,
        quantity: quantity,
      }),
    }
  );
  const response = await request.json();
  if (!response.success && response.message == "User not authorized") {
    alert("Авторизуйтесь на сайте");
    setIsAuth(false);
  }
  setCartId(response.cartItemId);
  return request.ok;
}

export async function getCart(clientToken, setIsAuth) {
  const request = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/getCart",
    {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "any",
        Authorization: "Bearer " + clientToken,
        "Content-type": "application/json",
      },
    }
  );
  const response = await request.json();
  if (!response.success && response.message == "User not authorized") {
    alert("Авторизуйтесь на сайте");
  }
  return response;
}
