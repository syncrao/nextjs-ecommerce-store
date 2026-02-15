async function testPost() {
  const response = await fetch("http://localhost:3000/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Test User 4",
      email: "testuser4@gmail.com",
    }),
  });

  const data = await response.json();
  console.log(data);
}

testPost();
