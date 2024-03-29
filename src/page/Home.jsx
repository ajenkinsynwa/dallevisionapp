mport React, { useEffect, useState } from 'react';
import { Card, FormField, Loader } from '../components ';

// This is a functional component that will be displayed on the home page
const Home = () => {
  // Here, we declare state variables that we will use to manage the component's state
  const [loading, setLoading] = useState(false); // loading indicates whether data is being fetched
  const [allPosts, setAllPosts] = useState(null); // allPosts contains all post objects fetched from the API
  const [searchText, setSearchText] = useState(''); // searchText contains the text entered into the search input field
  const [searchTimeout, setSearchTimeout] = useState(null); // searchTimeout is a timer that waits for the user to finish typing before initiating a search
  const [searchedResults, setSearchedResults] = useState(null); // searchedResults contains search results filtered based on the text entered into the search input field

  // This function fetches all post objects from the Imagigen API and updates the allPosts state variable
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://imagigen.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

 // This hook is called when the component mounts, and it fetches all post objects from the API
  useEffect(() => {
    fetchPosts();
  }, []);

  // This function is called whenever the user types into the search input field
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // After a 500 millisecond delay, this function filters allPosts based on the text entered into the search input field and updates searchedResults
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">ImagiGen Community Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Browse through a collection of imaginative and visually stunning images generated by DALL-E AI. HAVE FUN! </p>
      </div>

  
   
      <div className="mt-16">
        <FormField
          labelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
