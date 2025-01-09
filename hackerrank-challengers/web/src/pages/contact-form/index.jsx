import { ContactFormProvider } from "@/src/components/ContactFormComponents/contexts/ContactFormContext";
import ContactFormComponent from "@/src/components/ContactFormComponents/ContactFormComponent";

const ContactForm = () => {
  return (
    <ContactFormProvider>
      <ContactFormComponent />
    </ContactFormProvider>
  );
}

export default ContactForm;
