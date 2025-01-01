import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="bg-gray-800 text-white text-lg font-bold p-4">
          HackerRank Chanllenges React
      </header>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: '25px',
        flexDirection: 'column'
      }}>        

        <Link href='/code-review' passHref>
          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Code Review Feedback</button>
        </Link>
        <Link href='/article-sorting' passHref>
          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Article Sorting</button>
        </Link>
      </div >
    </>
    
  );
}
