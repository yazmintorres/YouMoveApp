export async function addUser(userId, userEmail) {
  try {
    // console.log("adding user...");
    const userInfo = { userId, userEmail };
    const response = await fetch(`/api/addUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
    const userAdded = await response.json();
    // console.log("user added:", userAdded);
    return userAdded;
  } catch (error) {
    console.log(error.message);
  }
}
