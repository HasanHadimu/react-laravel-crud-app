import { useState } from "react";
import http from "../http";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate(); // Perbaiki casing
  const [inputs, setInputs] = useState({}); // Gunakan camelCase
  const [error, setError] = useState(""); // Tambahkan state untuk menangani kesalahan

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructuring untuk kemudahan
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = async () => {
    try {
      await http.post("/users", inputs);
      navigate("/"); // Ganti dari Navigate menjadi navigate
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user. Please try again."); // Tangani kesalahan
    }
  };

  return (
    <div>
      <h2>New User</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Tampilkan pesan kesalahan */}
      <div className="row">
        <div className="col-sm-6 justify-content-center">
          <div className="card p-4">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control mb-2"
              value={inputs.name || ""}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              value={inputs.email || ""}
              onChange={handleChange}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mb-2"
              value={inputs.password || ""}
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={submitForm}
              className="btn btn-info mt-2"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
