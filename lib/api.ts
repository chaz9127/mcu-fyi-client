const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3001";
console.log("cj-cerver", SERVER_URL);
export const fetchApi = async (path: string) => {
  const res = await fetch(`${SERVER_URL}${path}`, { cache: "no-store" });
  return res.json();
};

export const patchUser = async (token: string, data: object) => {
  return fetch(`${SERVER_URL}/users`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const authLogin = async (credentials: { email: string; password: string }) => {
  const res = await fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw { status: res.status };
  return res.json();
};

export const authRegister = async (credentials: { email: string; password: string }) => {
  const res = await fetch(`${SERVER_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw { status: res.status };
  return res.json();
};

export const authLoginWithToken = async (token: string) => {
  const res = await fetch(`${SERVER_URL}/auth/loginWithToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  if (!res.ok) throw { status: res.status };
  return res.json();
};
