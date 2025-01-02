import medical_records from "@/src/pages/api/medicalRecords";
import { useState, useEffect } from "react";

const Records = ({ id }) => {
  const [initialValues, setInitialValues] = useState([]);
  const [patient, setPatient] = useState({});
  const [next, setNext] = useState(0);

  useEffect(() => {
    const currentPatient = medical_records.find((p) => p.id === id);
    handleInformationPatient(currentPatient);
    setNext(id);
  }, [id]);

  const handleNextPatient = () => {
    const currentIndex = medical_records.findIndex((record) => record.id === next);
    const nextIndex = (currentIndex + 1) % medical_records.length;
    const nextPatient = medical_records[nextIndex];

    setNext(nextPatient.id);
    handleInformationPatient(nextPatient);
  }

  const handleInformationPatient = (currentPatient) => {
    if (currentPatient) {   
      setPatient({ 
        name: currentPatient?.data[0]?.userName,
        dob: currentPatient?.data[0]?.userDob,
        height: currentPatient?.data[0]?.meta.height 
      }); 
      setInitialValues(currentPatient?.data);  
    }
  }

  return (
    <>
        {patient.name ? (
        <div className="mt-3 p-6 bg-gray-50 min-h-screen" id="profile-view">
        
            <div className="flex flex-col items-center">
            <div
                id="patient-profile"
                data-testid="patient-profile"
                className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
            >
                <h4 id="patient-name" className="text-xl font-semibold mb-2">
                {patient.name || "Patient Name"}
                </h4>
                <h5 id="patient-dob" className="text-gray-700 mb-1">
                DOB: {patient.dob || "Patient DOB"}
                </h5>
                <h5 id="patient-height" className="text-gray-700">
                Height: {patient.height + " cm" || "Patient Height"}
                </h5>
            </div>
            <button
                onClick={handleNextPatient}
                className={`mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                initialValues.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                data-testid="next-btn"
                disabled={initialValues.length === 0}
            >
                Next
            </button>
            </div>
        
    
        {patient.name && initialValues.length > 0 ? (
            <div className="mt-8 overflow-x-auto">
            <table
                id="patient-records-table"
                className="table-auto w-full bg-white shadow-md rounded-lg"
            >
                <thead id="table-header" className="bg-gray-200">
                <tr>
                    <th className="px-4 py-2 text-left">SL</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Diagnosis</th>
                    <th className="px-4 py-2 text-left">Weight</th>
                    <th className="px-4 py-2 text-left">Doctor</th>
                </tr>
                </thead>
                <tbody id="table-body" data-testid="patient-table">
                {initialValues.map((patient, i) => (
                    <tr
                    key={patient.id}
                    className={`${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                    >
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">
                        {new Date(patient.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{patient.diagnosis.name}</td>
                    <td className="px-4 py-2">{patient.meta.weight}</td>
                    <td className="px-4 py-2">{patient.doctor.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        ) : null}
        </div>
        ) : null}
    </>
  );
}

export default Records;