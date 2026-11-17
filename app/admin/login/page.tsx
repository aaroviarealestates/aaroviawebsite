import { login } from "./actions";

export default function AdminLoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f172a", fontFamily: "sans-serif" }}>
      <form className="admin-login-form" action={login} style={{ background: "#fff", padding: "40px", borderRadius: "12px", width: "360px" }}>
        <h2 style={{ marginBottom: "20px" }}>Aarovia Admin</h2>
        {searchParams?.error && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "12px" }}>Invalid email or password.</p>
        )}
        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Email</label>
          <input name="email" type="email" required style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Password</label>
          <input name="password" type="password" required style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} />
        </div>
        <button type="submit" style={{ width: "100%", padding: "12px", background: "#0f172a", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Log in
        </button>
      </form>
    </div>
  );
}
