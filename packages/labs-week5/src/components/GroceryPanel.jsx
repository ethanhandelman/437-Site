import { useState, useEffect } from "react";
import { Spinner } from "./Spinner";
import { groceryFetcher } from "../groceryFetcher";

export function GroceryPanel(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [groceryData, setGroceryData] = useState([
        {
            name: "test item",
            price: 12.3
        },
        {
            name: "test item 2",
            price: 0.5
        }
    ]);

    // New state variable to store the selected dropdown value
    const [selectedSource, setSelectedSource] = useState("MDN");



    // useEffect hook that triggers whenever selectedSource changes
    useEffect(() => {
        let isStale = false;

        async function fetchData() {
            setGroceryData([]); // Optionally clear the current data
            console.log("fetching data from " + selectedSource);
            setIsLoading(true);
            setError(null);

            try {
                const response = groceryFetcher.fetch(selectedSource);
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
                if (!isStale){
                    setIsLoading(false);
                }
            }
        }

        if (selectedSource !== "" && !isStale) {
            fetchData(selectedSource);
        }

        return () => {
            isStale = true;
        }
    }, [selectedSource]);

    // Change handler now updates the selectedSource state
    function handleDropdownChange(changeEvent) {
        setSelectedSource(changeEvent.target.value);
    }

    function handleAddTodoClicked(item) {
        const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
        props.addTask(todoName);
        // TODO complete this
    }

    return (
        <div>
            <h1 className="text-xl font-bold">Groceries prices today</h1>
            <label className="mb-4 flex gap-4">
                Get prices from:
                <select
                    value={selectedSource}
                    onChange={handleDropdownChange}
                    className="border border-gray-300 p-1 rounded-sm disabled:opacity-50"
                >
                    <option value="MDN">MDN</option>
                    <option value="Liquor store">Liquor store</option>
                    <option value="Butcher">Butcher</option>
                    <option value="whoknows">Who knows?</option>
                </select>
                <LoadIndicator isLoading={isLoading} error={error} />
            </label>

            {groceryData.length > 0 ? (
                <PriceTable items={groceryData} onAddClicked={handleAddTodoClicked} />
            ) : (
                "No data"
            )}
        </div>
    );
}

function LoadIndicator(props) {
    if (props.error) {
        return <p className="text-red-500">{props.error}</p>;
    }
    if (props.isLoading) {
        return <Spinner />;
    }
    return null;
}

function PriceTable(props) {
    return (
        <table className="mt-4">
            <thead>
                <tr>
                    <th className="text-left">Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map(item => (
                    <PriceTableRow
                        key={item.name}
                        item={item}
                        onAddClicked={() => props.onAddClicked(item)}
                    />
                ))}
            </tbody>
        </table>
    );
}

function PriceTableRow({ item, onAddClicked }) {
    const buttonClasses = `italic px-2 rounded-sm border border-gray-300
        hover:bg-gray-100 active:bg-gray-200 cursor-pointer`;
    return (
        <tr>
            <td>{item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>
                <button className={buttonClasses} onClick={onAddClicked}>
                    Add to todos
                </button>
            </td>
        </tr>
    );
}
