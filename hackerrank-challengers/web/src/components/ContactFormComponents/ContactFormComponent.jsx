import { useContactForm } from "./contexts/ContactFormContext";

const ContactFormComponent = () => {
    const {  
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
    } = useContactForm();

    return (
        <>
          <div className="App p-6">
            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4"
                >
              <div className="mb-4">
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                data-testid="name-input"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                </div>
    
                <div className="mb-4">
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    data-testid="email-input"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
    
                <div className="mb-6">
                    <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    data-testid="message-input"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                    />
                </div>
    
                <div className="flex items-center justify-between">
                    <button
                    type="submit"
                    data-testid="submit-button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    Submit
                    </button>
                </div>
            </form>
            {error && (
              <p data-testid="error-message" className="text-red-500 text-sm font-medium">
                {error}
              </p>
            )}
            {contacts.length > 0 ? contacts.map((contact) => (
              <div
                key={contact.id} 
                data-testid="submitted-data" 
                className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md mt-4"
              >
                <h2 className="text-lg font-bold">Submitted Information</h2>
                <p className="mt-2">
                  <strong>Name:</strong> {contact.name}
                </p>
                <p>
                  <strong>Email:</strong> {contact.email}
                </p>
                <p>
                  <strong>Message:</strong> {contact.message}
                </p>
              </div>
            )) : null}
          </div>
        </>
    );
}

export default ContactFormComponent;