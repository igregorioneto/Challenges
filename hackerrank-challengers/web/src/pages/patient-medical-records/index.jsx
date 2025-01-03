import Records from "@/src/components/PatientMedicalRecordsComponents/Records";
import Search from "@/src/components/PatientMedicalRecordsComponents/Search";
import { useState } from "react";

const PatientMedicalRecords = () => {
  const [record, setRecord] = useState([]);
  const [id, setId] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col items-center mt-6">
        <Search setRecord={setRecord} setId={setId} />
        <Records id={id} />
      </div>
    </div>
  );
}

export default PatientMedicalRecords;