import Records from "@/src/components/PatientMedicalRecordsComponents/Records";
import Search from "@/src/components/PatientMedicalRecordsComponents/Search";
import { useState } from "react";

const title = "Patient Medical Records";

const PatientMedicalRecords = () => {
  const [record, setRecord] = useState([]);
  const [id, setId] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gray-800 text-white py-4 px-6">
        <h1 className="text-xl font-bold">{title}</h1>
      </header>
      <div className="flex flex-col items-center mt-6">
        <Search setRecord={setRecord} setId={setId} />
        <Records id={id} />
      </div>
    </div>
  );
}

export default PatientMedicalRecords;