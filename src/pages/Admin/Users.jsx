import React, { useEffect, useState } from "react";
import API from "../../services/axios";

function Users() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/bookings/getAllBookings");
        const bookings = res.data.data || [];

        const userList = [];

        bookings.forEach((booking) => {
          const user = booking.user;
          if (user) {
            const already = userList.find((u) => u._id === user._id);
            if (!already) {
              userList.push({
                _id: user._id,
                name: user.name,
                email: user.email,
               
              });
            }
          }
        });

        setUsers(userList);
      } catch (error) {
        console.log("Error loading users", error);
      }
    };

    fetchUsers();
  }, []);

  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Users</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
             
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
              
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="p-3 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;