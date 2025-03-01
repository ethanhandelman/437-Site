// useGroceryFetch.js
import { useState, useEffect } from "react";
import { groceryFetcher } from "./groceryFetcher";

export function useGroceryFetch(source) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groceryData, setGroceryData] = useState([
    {
      name: "test item",
      price: 12.3,
    },
    {
      name: "test item 2",
      price: 0.5,
    },
  ]);

  useEffect(() => {
    let isStale = false;

    async function fetchData() {
      setGroceryData([]); // Optionally clear the current data
      console.log("fetching data from " + source);
      setIsLoading(true);
      setError(null);

      try {
        const response = groceryFetcher.fetch(source);
        // Parse the JSON response correctly
        const data = await response;
        console.log("Received data:", data);
        if (!isStale) {
          setGroceryData(data);
        }
      } catch (curError) {
        if (!isStale) {
          console.error(`Could not fetch: ${curError}`);
          setError(curError.message);
        }
      } finally {
        if (!isStale) {
          setIsLoading(false);
        }
      }
    }

    if (source !== "" && !isStale) {
      fetchData();
    }

    return () => {
      isStale = true;
    };
  }, [source]);

  return { groceryData, isLoading, error };
}
