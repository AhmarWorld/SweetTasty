export async function addBasket(
  productId,
  price,
  quantity,
  clientToken,
  setCartId,
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
  
  if (request.status === 401) {
    alert("Необходима авторизация");
    return false;
  }
  
  if (request.status !== 200 && request.status !== 201) {
    return false;
  }
  
  const response = await request.json();
  setCartId(response.cartItemId);
  return true;
}

export async function getCart(clientToken) {
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

  if (request.status === 401) {
    alert("Необходима авторизация");
    return { success: false };
  }

  if (request.status !== 200 && request.status !== 201) {
    return { success: false };
  }

  const response = await request.json();
  console.log("getCart", response);
  return response;
}
