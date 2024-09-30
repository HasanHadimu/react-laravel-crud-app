import http from "../http";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAllUser();
    }, []);

    const fetchAllUser = async () => {
        try {
            const res = await http.get('/users');
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await http.delete(`/users/${id}`); // Perbaiki URL
                fetchAllUser(); // Panggil ulang untuk mendapatkan daftar pengguna terbaru
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <div>
            <h2>User Listing</h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link className="btn btn-info" to={`/edit/${user.id}`}>Edit</Link>
                                <Link className="btn btn-primary" to={`/view/${user.id}`}>View</Link>
                                <button type="button" className="btn btn-danger" 
                                    onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
