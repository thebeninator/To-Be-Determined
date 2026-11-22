const UserCache = {};

function AddToCache(user) {
  if (Object.hasOwn(UserCache, user.id)) return;
  UserCache[user.id] = user;
}

export {
  UserCache,
  AddToCache,
};