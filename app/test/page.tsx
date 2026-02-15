async function getUsers() {
  const res = await fetch("http://localhost:3000/api/user", {
    cache: "no-store",
  });

  return res.json();
}

const Test = async () => {
  const users = await getUsers();

  return (
    <div className="flex items-center gap-2">
      <button className="bg-brand text-text-inverse hover:bg-brand-hover">
        Shop Now
      </button>
      <h1 className="text-text text-3xl">Bikaner</h1>

      <p className="text-text-muted">Premium cotton fabric</p>

      <span className="text-accent">Limited Edition</span>

      <div className="bg-surface p-6 border border-border">
        Card
        <section className="bg-section py-20 border border-border">
          Hero break
        </section>
      </div>

      <p className="text-success">Order Placed Successfully</p>
      <p className="text-error">Invalid card details</p>
      <p className="text-warning">Only 2 items left</p>
      <div className="bg-surface border border-border p-5">
        <h2 className="text-text font-semibold">Dior Jacket</h2>

        <p className="text-text-muted">Winter Collection</p>

        <span className="text-brand font-medium">₹9,999</span>

        <button className="mt-4 bg-brand text-text-inverse px-4 py-2 hover:bg-brand-hover">
          Add to Cart
        </button>
      </div>
      <div style={{ padding: "20px" }}>
        <h1>Users List</h1>

        {users.map((user: any) => (
          <div key={user._id} style={{ marginBottom: "10px" }}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
