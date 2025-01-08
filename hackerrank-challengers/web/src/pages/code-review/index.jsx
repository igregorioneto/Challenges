import { FeedbackProvider } from "@/src/components/FeedbacksComponents/contexts/FeedbackContext";
import FeedbackSystem from "@/src/components/FeedbacksComponents/FeedbackSystem";

const CodeReviewFeedback = () => {
    return (
        <FeedbackProvider>
            <div 
                style={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    flexDirection: 'column'
                }}
            >
                <FeedbackSystem />
            </div>
        </FeedbackProvider>        
    );
}

export default CodeReviewFeedback;