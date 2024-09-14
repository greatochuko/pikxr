import { BASE_URL } from "./authServices";

export async function fetchComments(postId) {
  const token = localStorage.getItem("token");
  const res = await fetch(BASE_URL + "/comments/" + postId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}

export async function postComment(comment, targetUserId, postId) {
  const token = localStorage.getItem("token");
  const res = await fetch(BASE_URL + "/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment, targetUserId, postId }),
  });
  const data = await res.json();
  return data;
}

export async function fetchDeleteComment(commentId) {
  const token = localStorage.getItem("token");
  const res = await fetch(BASE_URL + "/comment/" + commentId, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}
