import { BASE_URL } from "./authServices";

export async function fetchStories() {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL + "/stories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}

export async function createStory(formData) {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL + "/stories", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}
