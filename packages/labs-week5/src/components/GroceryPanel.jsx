// GroceryPanel.js
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useGroceryFetch } from "../useGroceryFetch.js"; // adjust the import path if needed

export function GroceryPanel(props) {
  const [selectedSource, setSelectedSource] = useState("MDN");
  
  // Use the custom hook by passing in the dropdown state
  const { groceryData, isLoading, error } = useGroceryFetch(selectedSource);

  function handleDropdownChange(changeEvent) {
    setSelectedSource(changeEvent.target.value);
  }

  function handleAddTodoClicked(item) {
    const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
    props.addTask(todoName);
    // TODO: complete this
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
