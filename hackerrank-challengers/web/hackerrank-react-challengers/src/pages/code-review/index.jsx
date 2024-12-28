import Link from "next/link";
import FeedbackSystem from "../../components/FeedbackSystem";
import "h8k-components";

const CodeReviewFeedback = () => {
    const title = "Code Review Feedback";

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1 className="text-center text-green-900 font-bold mb-3">{title}</h1>
            <Link href='/' passHref>
                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Home</button>
            </Link>
            <FeedbackSystem />
        </div>
    );
}

export default CodeReviewFeedback;