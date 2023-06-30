const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
  console.log("Saved token:", token);
}
export function getToken() {
  const token = getFromStorage(tokenKey);
  return token;
}

export function saveUser(user) {
  const existingUser = getFromStorage(userKey);

  if (existingUser) {
    let hasChanges = false;

    for (const key in user) {
      if (user.hasOwnProperty(key) && user[key] !== existingUser[key]) {
        existingUser[key] = user[key];
        hasChanges = true;
      }
    }

    if (hasChanges) {
      saveToStorage(userKey, existingUser);
    }
  } else {
    saveToStorage(userKey, user);
  }
}

export function getUsername() {
  const user = getFromStorage(userKey);

  if (user) {
    return user.name;
  }

  return null;
}

export function clearStorage() {
  localStorage.clear();
}

export const isLoggedIn = () => {
  const user = getFromStorage(userKey);
  return !!user;
};

export const getFromStorage = (key) => {
  if (typeof window !== "undefined") {
    const value = window.localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error("Error retrieving value:", error);
      }
    }
  }
  return null;
};

export const saveToStorage = (key, value) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};
