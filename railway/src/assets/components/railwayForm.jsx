import React, { useState } from "react";

const RailwayForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    city: "",
    info: "",
  });

  // handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.MONGO_DB_API_KEY, // API key from .env
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message);

      // reset form
      setFormData({ name: "", rollno: "", city: "", info: "" });
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-6">Hospital Management System</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg space-y-4"
      >
        <input
          type="text"
          id="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          id="rollno"
          placeholder="Enter Roll No"
          value={formData.rollno}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          id="city"
          placeholder="Enter City"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          id="info"
          placeholder="Enter Patient Info"
          value={formData.info}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RailwayForm;
