// import { useState } from "react";
// import { registerUser } from "../api/auth.api";
// import { useNavigate, Link } from "react-router-dom";

// const Register = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             await registerUser(email, password);
//             setSuccess(true);
//             setTimeout(() => navigate("/login"), 2000);
//         } catch (err: any) {
//             setError(err.response?.data?.error || "Registration failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//             <div className="w-full max-w-md">
//                 {/* Header */}
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                         Create Account
//                     </h1>
//                     <p className="text-gray-600">
//                         Sign up to get started with your account
//                     </p>
//                 </div>

//                 {/* Form Card */}
//                 <div className="bg-white rounded-lg border border-gray-200 p-8">
//                     {/* Error Message */}
//                     {error && (
//                         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
//                             <svg
//                                 className="w-5 h-5 text-red-600 mt-0.5 shrink-0"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                 />
//                             </svg>
//                             <p className="text-sm text-red-800">{error}</p>
//                         </div>
//                     )}

//                     {/* Success Message */}
//                     {success && (
//                         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
//                             <svg
//                                 className="w-5 h-5 text-green-600 mt-0.5 shrink-0"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                                 />
//                             </svg>
//                             <p className="text-sm text-green-800">
//                                 Account created successfully! Redirecting to login...
//                             </p>
//                         </div>
//                     )}

//                     {/* Form */}
//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="block text-sm font-medium text-gray-700 mb-2"
//                             >
//                                 Email Address
//                             </label>
//                             <input
//                                 id="email"
//                                 type="email"
//                                 placeholder="you@example.com"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
//                             />
//                         </div>

//                         <div>
//                             <label
//                                 htmlFor="password"
//                                 className="block text-sm font-medium text-gray-700 mb-2"
//                             >
//                                 Password
//                             </label>
//                             <input
//                                 id="password"
//                                 type="password"
//                                 placeholder="Create a strong password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                                 minLength={6}
//                                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
//                             />
//                             <p className="mt-2 text-xs text-gray-500">
//                                 Must be at least 6 characters long
//                             </p>
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={loading || success}
//                             className="w-full py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             {loading ? "Creating account..." : success ? "Success!" : "Create Account"}
//                         </button>
//                     </form>
//                 </div>

//                 {/* Login Link */}
//                 <p className="text-center mt-6 text-gray-600">
//                     Already have an account?{" "}
//                     <Link
//                         to="/login"
//                         className="font-medium text-gray-900 hover:underline"
//                     >
//                         Sign in
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Register;


import { useState } from "react";
import { registerUser } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(email, password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.3)",
          padding: "2rem",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#fff",
              textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
              marginBottom: "0.5rem",
            }}
          >
            Create Account
          </h1>
          <p
            style={{
              color: "#e0e7ff",
              textShadow: "1px 1px 6px rgba(0,0,0,0.5)",
            }}
          >
            Sign up to get started with your account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              marginBottom: "1.5rem",
              padding: "0.75rem 1rem",
              background: "rgba(248, 113, 113, 0.2)",
              border: "1px solid rgba(248, 113, 113, 0.5)",
              borderRadius: "12px",
              color: "#f87171",
            }}
          >
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div
            style={{
              marginBottom: "1.5rem",
              padding: "0.75rem 1rem",
              background: "rgba(52, 211, 153, 0.2)",
              border: "1px solid rgba(52, 211, 153, 0.5)",
              borderRadius: "12px",
              color: "#34d399",
            }}
          >
            Account created successfully! Redirecting to login...
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ color: "#fff", fontWeight: 500, display: "block", marginBottom: "0.25rem" }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                color: "#fff",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ color: "#fff", fontWeight: 500, display: "block", marginBottom: "0.25rem" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                color: "#fff",
                outline: "none",
              }}
            />
            <p style={{ fontSize: "0.75rem", color: "#e0e7ff", marginTop: "0.25rem" }}>
              Must be at least 6 characters long
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s",
              opacity: loading || success ? 0.6 : 1,
            }}
          >
            {loading ? "Creating account..." : success ? "Success!" : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#e0e7ff" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ fontWeight: 600, textDecoration: "underline", color: "#fff" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
