// import { useState, useContext } from "react";
// import { loginUser } from "../api/auth.api";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             const res = await loginUser(email, password);
//             login(res.data.token);
//             navigate("/");
//         } catch (err: any) {
//             setError(err.response?.data?.error || "Login failed");
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
//                         Welcome Back
//                     </h1>
//                     <p className="text-gray-600">
//                         Sign in to continue to your account
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
//                                 placeholder="Enter your password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             {loading ? "Signing in..." : "Sign In"}
//                         </button>
//                     </form>
//                 </div>

//                 {/* Register Link */}
//                 <p className="text-center mt-6 text-gray-600">
//                     Don't have an account?{" "}
//                     <Link
//                         to="/register"
//                         className="font-medium text-gray-900 hover:underline"
//                     >
//                         Create account
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;

import { useState, useContext } from "react";
import { loginUser } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      login(res.data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Image */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/024/095/709/small/a-person-walking-towards-an-airplane-with-a-backpack-traveling-image-generative-ai-photo.jpg"
          alt="Airplane Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <h2 className="absolute bottom-10 left-10 text-white text-4xl font-bold drop-shadow-lg">
          Welcome to TravelTrove
        </h2>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-20">
        <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Sign In
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Enter your credentials to access your account
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;




