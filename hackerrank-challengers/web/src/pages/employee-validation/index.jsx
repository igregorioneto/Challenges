import { useState } from "react";

const EmployeeValidation = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    joiningDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }))
  }

  const { name, email, employeeId, joiningDate } = formData;

  const invalidateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(email);
  }

  const invalidateDate = () => {
    const [year, month, day] = joiningDate.split("-");
    const joining = new Date(year, month - 1, day);
    const today = new Date();

    joining.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    return joining > today ? true : false;
  }

  const disabladSubmitButton = () => {
    return (name.length < 4 ||
      invalidateEmail(email) ||
      employeeId.length < 6 ||
      invalidateDate() ? true : false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-2">
                <div
                    className="flex flex-col items-start mb-10 w-1/2"
                    data-testid="input-name"
                >
                    <input
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Name"
                    data-testid="input-name-test"
                    onChange={handleChange}
                    />
                    {name.length < 4 ? (
                    <p className="text-red-500 text-sm mt-2">
                        Name must be at least 4 characters long and only contain letters and spaces
                    </p>
                    ) : null}
                </div>

                <div
                    className="flex flex-col items-start mb-10 w-1/2"
                    data-testid="input-email"
                >
                    <input
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                    />
                    {invalidateEmail() || email.length === 0 ? (
                    <p className="text-red-500 text-sm mt-2">Email must be a valid email address</p>
                    ) : null}
                </div>

                <div
                    className="flex flex-col items-start mb-10 w-1/2"
                    data-testid="input-employee-id"
                >
                    <input
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    placeholder="Employee ID"
                    onChange={handleChange}
                    />
                    {employeeId.length < 6 ? (
                    <p className="text-red-500 text-sm mt-2">Employee ID must be exactly 6 digits</p>
                    ) : null}
                </div>

                <div
                    className="flex flex-col items-start mb-10 w-1/2"
                    data-testid="input-joining-date"
                >
                    <input
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    placeholder="Joining Date"
                    onChange={handleChange}
                    />
                    {invalidateDate() || joiningDate.length === 0 ? (
                    <p className="text-red-500 text-sm mt-2">Joining Date cannot be in the future</p>
                    ) : null}
                </div>

                <button
                    data-testid="submit-btn"
                    type="submit"
                    disabled={disabladSubmitButton()}
                    className={`px-6 py-2 bg-blue-500 text-white rounded ${
                    disabladSubmitButton() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                    }`}
                >
                    Submit
                </button>
            </form>

            {submittedData && (
                <div className="mt-6 p-4 border rounded bg-gray-50">
                    <h3 className="text-lg font-bold">Submitted Data:</h3>
                    <pre className="mt-2 bg-gray-100 p-2 rounded overflow-x-auto">
                        {JSON.stringify(submittedData, null, 2)}
                    </pre>
                </div>
            )}
        </>
    );
}

export default EmployeeValidation;