import { isValidEmail } from "../../Utils";

const { createContext, useContext, useState, useEffect } = require("react");

const ContactFormContext = createContext();

export const ContactFormProvider = ({ children }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submittedData, setSubmittedData] = useState(null);    
    const [error, setError] = useState("");

    const [contacts, setContacts] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setError("All fields are required.");
            setSubmittedData(null);
            return;
        }
        
        if (!isValidEmail(email)) {
            setError("Email is invalid!");
            setSubmittedData(null);
            return;
        }

        setSubmittedData({ name, email, message });

        handleContactFormSaveApi();
        //handleInputsValues();
    };

    const handleInputsValues = () => {
        setName("");
        setEmail("");
        setMessage("");
        setError("");
    }

    const handleContactFormSaveApi = async () => {
        try {
            console.log(submittedData);
            const response = await fetch('http://localhost:3003/contacts', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submittedData)
            });
            if (!response.ok) {
                throw new Error(`Http error! Status: ${response.status}`);
            }
            handleContactFormListApi();
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleContactFormListApi = async () => {
        try {
            const response = await fetch('http://localhost:3003/contacts');
            if (!response.ok) {
                throw new Error(`Http error! Status: ${response.status}`);
            }
            const data = await response.json();
            setContacts(data.body.contacts);
            setError(null);
        } catch (error) {
            setContacts([]);
            setError('Error in requesting contacts. Please try again.');
        }
    }

    useEffect(() => {   
        handleContactFormListApi();
    }, [])

    return (
        <ContactFormContext.Provider value={{ 
            name, 
            email,
            message,
            submittedData,
            error,
            contacts,
            setName,
            setEmail,
            setMessage,
            handleSubmit,
        }}>
            { children }
        </ContactFormContext.Provider>
    );
}

export const useContactForm = () => useContext(ContactFormContext);