import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../http";

export default function Edit(props) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const { id } = useParams();

  // Gunakan useCallback untuk memastikan fetchUser stabil
  const fetchUser = useCallback(async () => {
    try {
      const res = await http.get(`/users/${id}/edit`); // Pastikan ini menggunakan GET
      setInputs({
        name: res.data.name,
        email: res.data.email,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [id]); // Menambahkan id sebagai dependensi

  useEffect(() => {
    fetchUser(); // Memanggil fetchUser
  }, [fetchUser]); // Memasukkan fetchUser ke dalam dependency array

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const submitForm = async () => {
    try {
      await http.put(`/users/${id}`, inputs);
      navigate('/'); // Mengarahkan kembali setelah update
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
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

            <button
              type="button"
              onClick={submitForm}
              className="btn btn-info mt-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
