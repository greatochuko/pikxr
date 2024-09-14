export const BASE_URL = import.meta.env.BASE_URL;
// export const BASE_URL = "http://localhost:5000";

export async function login(email, password) {
  let username;
  if (!email.includes("@")) {
    username = email;
  }
  try {
    const res = await fetch(BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: username
        ? JSON.stringify({ username, password })
        : JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!data.error) localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    if (err.message === "Failed to fetch")
      return { error: "An error occured please try again later" };
    return { error: err.message };
  }
}

export async function signup(username, fullname, email, password) {
  try {
    const res = await fetch(BASE_URL + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, fullname, email, password }),
    });
    const data = await res.json();
    if (!data.error) localStorage.setItem("token", data.token);
    return data;
  } catch (err) {}
}

export async function validateEmail(email, signal) {
  const res = await fetch(BASE_URL + "/validateEmail", {
    signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  return data;
}

export async function validateUsername(username, signal) {
  const res = await fetch(BASE_URL + "/validateUsername", {
    signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  const data = await res.json();
  return data;
}
