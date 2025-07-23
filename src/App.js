import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PropertyCard from "./components/PropertyCard";
import propertyData from "./data/propertyData";
import PropertyDetail from "./pages/PropertyDetail";
import AddPropertyForm from "./components/AddPropertyForm";
import EditProperty from "./pages/EditProperty";
import PaymentSummary from "./components/PaymentSummary";
import SearchAndFilter from "./components/SearchAndFilter";
import Transactions from "./pages/Transactions";
import BalanceSheet from "./pages/BalanceSheet";
import "./styles/App.css";

function App() {
  const [propertyList, setPropertyList] = useState(() => {
    const savedData = localStorage.getItem("renttrack-data");
    return savedData ? JSON.parse(savedData) : propertyData;
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    localStorage.setItem("renttrack-data", JSON.stringify(propertyList));
  }, [propertyList]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all' | 'paid' | 'unpaid'

  const togglePaidStatus = (id) => {
    setPropertyList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isPaid: !item.isPaid } : item
      )
    );
  };

  const addProperty = (newProperty) => {
    const updatedList = [newProperty, ...propertyList];
    setPropertyList(updatedList);
    localStorage.setItem("renttrack-data", JSON.stringify(updatedList));
  };

  const handleUpdate = (updatedProperty) => {
    const updatedList = propertyList.map((item) =>
      item.id === updatedProperty.id ? updatedProperty : item
    );
    setPropertyList(updatedList);
    localStorage.setItem("renttrack-data", JSON.stringify(updatedList));
  };

  const handleDelete = (id) => {
    const filteredList = propertyList.filter((item) => item.id !== id);
    setPropertyList(filteredList);
    localStorage.setItem("renttrack-data", JSON.stringify(filteredList));
  };
  const handleToggleRentRecord = (propertyId, monthIdx) => {
    setPropertyList((prevList) =>
      prevList.map((prop) => {
        if (prop.id !== propertyId) return prop;
        const updatedRecords = prop.rentRecords.map((rec, idx) =>
          idx === monthIdx ? { ...rec, paid: !rec.paid } : rec
        );
        return { ...prop, rentRecords: updatedRecords };
      })
    );
  };
  const filteredList = propertyList.filter((item) => {
    const title = item.title?.toLowerCase() || "";
    const location = item.location?.toLowerCase() || "";

    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "paid" && item.isPaid) ||
      (filterStatus === "unpaid" && !item.isPaid);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app-container">
      <h1>RentTrack Lite</h1>

      <PaymentSummary propertyList={propertyList} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddPropertyForm onAdd={addProperty} />

              {/* 搜索和筛选组件 */}
              <SearchAndFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
              />

              <div className="property-list">
                {filteredList.length === 0 ? (
                  <p className="no-results">No properties found.</p>
                ) : (
                  filteredList.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onTogglePaid={togglePaidStatus}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </div>
            </>
          }
        />

        <Route
          path="/property/:id"
          element={
            <PropertyDetail
              propertyList={propertyList}
              onToggleRentRecord={handleToggleRentRecord}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <EditProperty propertyList={propertyList} onUpdate={handleUpdate} />
          }
        />
        <Route
          path="/transactions"
          element={
            <Transactions
              propertyList={propertyList}
              transactions={transactions}
              setTransactions={setTransactions}
            />
          }
        />
        <Route
          path="/balancesheet"
          element={<BalanceSheet transactions={transactions} />}
        />
      </Routes>
    </div>
  );
}
export default App;
