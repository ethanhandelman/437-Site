import React from "react";
import { Spinner } from "./Spinner";

const MDN_URL = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";

/**
 * Creates and returns a new promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms the number of milliseconds to delay
 * @returns {Promise<undefined>} a promise that resolves with the value of `undefined` after the specified delay
 */
function delayMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function GroceryPanel(props) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const [groceryData, setGroceryData] = React.useState([
        {
            name: "test item",
            price: 12.3
        },
        {
            name: "test item 2",
            price: 0.5
        }
    ]);

    async function fetchData(url) {
        console.log("fetching data from " + url);
        setIsLoading(true);
        setError(null);
        
        await delayMs(2000);

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the JSON response correctly
            const data = await response.json();
            console.log("Received data:", data);
            setGroceryData(data);
        } catch (curError) {
            console.error(`Could not fetch: ${curError}`);
            setError(curError.message);
        } finally {
            setIsLoading(false);
        }
    }

    function handleDropdownChange(changeEvent) {
        setGroceryData([]);
        if(changeEvent.target.value != ""){
            fetchData(changeEvent.target.value);
        }
    }

    function handleAddTodoClicked(item) {
        const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
        props.addTask(todoName);
        // TODO complete this
    }

    return (
        <div>
            <h1 className="text-xl font-bold">Groceries prices today</h1>
            <button onClick={() => fetchData(MDN_URL)}>Fetch</button>
            <label className="mb-4 flex gap-4">
                Get prices from:
                <select onChange={handleDropdownChange} disabled={isLoading} className="border border-gray-300 p-1 rounded-sm disabled:opacity-50">
                    <option value="">(None selected)</option>
                    <option value={MDN_URL}>MDN</option>
                    <option value="invalid">Who knows?</option>
                </select>
                <LoadIndicator isLoading={isLoading} error={error}></LoadIndicator>
            </label>

            {
                groceryData.length > 0 ?
                    <PriceTable items={groceryData} onAddClicked={handleAddTodoClicked} /> :
                    "No data"
            }
        </div>
    );
}


function LoadIndicator(props) {
    if (props.error) {
        return <p className="text-red-500">{props.error}</p>
    }
    if (props.isLoading) {
        return <Spinner></Spinner>
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
                {
                    props.items.map(item =>
                        <PriceTableRow
                            key={item.name}
                            item={item}
                            onAddClicked={() => props.onAddClicked(item)}
                        />
                    )
                }
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
