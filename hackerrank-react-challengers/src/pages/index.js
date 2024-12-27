import Link from "next/link";

export default function Home() {
  return (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: '25px',
        flexDirection: 'column'
      }}>
      <h1 style={{ marginBottom: '25px' }} >HackerRank Chanllenges React</h1>

      <Link href='/code-review' passHref>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Code Review Feedback</button>
      </Link>
    </div >
  );
}
