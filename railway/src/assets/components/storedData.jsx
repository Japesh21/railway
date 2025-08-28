import React, { useEffect, useState } from "react";

const StoredData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch data from backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/data"); // server.js endpoint
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading data...</p>;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-6">Stored Patient Records</h2>

      {data.length === 0 ? (
        <p className="text-gray-600">No records found.</p>
      ) : (
        <div className="overflow-x-auto w-full max-w-4xl">
          <table className="table-auto border-collapse border border-gray-300 w-full shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Roll No</th>
                <th className="border border-gray-300 px-4 py-2">City</th>
                <th className="border border-gray-300 px-4 py-2">Info</th>
              </tr>
            </thead>
            <tbody>
              {data.map((record, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {record.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {record.rollno}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {record.city}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {record.info}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StoredData;
