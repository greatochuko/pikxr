import { BASE_URL } from "./authServices";

export async function searchUsers(query, signal) {
  const URL = BASE_URL + "/users/search?q=" + query;
  const res = await fetch(URL, { signal });
  const data = await res.json();
  return data;
}
