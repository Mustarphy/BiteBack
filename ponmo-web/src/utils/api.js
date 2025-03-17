const token = await firebase.auth().currentUser.getIdToken();
fetch("http://localhost:5000/api/news", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(newsData),
});
