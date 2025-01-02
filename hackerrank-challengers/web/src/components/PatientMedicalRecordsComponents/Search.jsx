import medical_records from "@/src/pages/api/medicalRecords";
import { useState } from "react";

const Search = ({ setRecord, setId, id }) => {
  const [valueRecord, setValueRecord] = useState({});
  const [patientId, setPatientId] = useState(0);

  const selectedPatient = (e) => {
    const patientId = e.target.value;
    const uniquePatient = medical_records.find(patient => patient.id === patientId);
    setValueRecord(uniquePatient);    
    setPatientId(patientId);
  }

  const selectedRecord = () => {
    if (!Object.values(valueRecord).length && patientId === 0) {
      alert("Please select a patient name");
    } else {
      setRecord(valueRecord);   
      setId(patientId);
    }
  }

  const uniquePatiente = Array.from(
    new Set(
      medical_records.flatMap(record => 
        record.data.map(patient => (
          { username: patient.userName, id: record.id }
        )))
    )
  ).reduce((acc, current) => {
    // Cria uma chave única baseada no username e id para garantir a unicidade
    const key = `${current.username}-${current.id}`;
    if (!acc[key]) {
      acc[key] = current;
    }
    return acc;
  }, {});

  const uniquePatientsArray = Object.values(uniquePatiente);

  return (
    <div className="flex items-baseline space-x-4 p-4 bg-gray-50 rounded-lg shadow-md">
      <div className="w-64">
        <select
          onChange={(e) => selectedPatient(e)}
          data-testid="patient-name"
          defaultValue="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="0" disabled>
            Select Patient
          </option>
          {uniquePatientsArray.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.username}
            </option>
          ))}
        </select>
      </div>
  
      <button
        onClick={selectedRecord}
        type="submit"
        data-testid="show"
        className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Show
      </button>
    </div>
  );
}

export default Search;