"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  Button,
} from "@heroui/react";
import { ArrowUpDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import expneseservice from "@/appwrite/expense";
import { allexpenses, expensebyfilter } from "@/store/expenseSlice";

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "ExpenseName", label: "ExpenseName", sortable: true },
  { key: "ExpenseAmount", label: "ExpenseAmount", sortable: true },
  { key: "actions", label: "Delete" }, // new column for delete
];

// Example data
// const initialData = [
//   { id: 1, name: "Alice", role: "Engineer" },
//   { id: 2, name: "Bob", role: "Designer" },
//   { id: 3, name: "Charlie", role: "Manager" },
//   { id: 4, name: "Diana", role: "Engineer" },
//   { id: 5, name: "Ethan", role: "Intern" },
//   { id: 6, name: "Fiona", role: "Engineer" },
//   { id: 7, name: "George", role: "Manager" },
//   { id: 8, name: "Hannah", role: "Designer" },
//   { id: 9, name: "Ian", role: "Engineer" },
//   { id: 10, name: "Julia", role: "Intern" },
// ];

export default function DataTable({ Id }) {
  const dispatch = useDispatch();
  const [exdata, setexdata] = useState([]); // now stateful

  const [transformedData, setTransformedData] = useState([]);
  useEffect(() => {
    const getexpenses = async () => {
      if (Id) {
        const filteredExp = await expneseservice.listexpensesbybudget(Id);
        dispatch(expensebyfilter(filteredExp.rows || []));
        console.log("Filtered expenses:", filteredExp);
        setexdata(filteredExp.rows || []);
        // console.log("Budget ID being used:", Id);
      } else {
        const response = await expneseservice.listexpenses();
        setexdata(response.rows || []);
        dispatch(allexpenses(response.rows));
        console.log("epxense here is", response);
      }
    };
    getexpenses();
  }, []);

  useEffect(() => {
    const firstdata = exdata.map((item, idx) => ({
      id: idx + 1,
      ExpenseName: item.expenseName,
      ExpenseAmount: item.expenseAmount,
      originalId: item.$id, // Keep original ID for deletion
    }));
    setTransformedData(firstdata);
  }, [exdata]);

  // const [data, setData] = useState(firstdata);

  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  console.log(exdata);

  // 🔍 Filtering
  const filteredData = useMemo(() => {
    return transformedData.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, transformedData]);

  // ↕️ Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // 📑 Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      setexdata((prev) => prev.filter((item) => item.$id !== id));
      return await expneseservice.deleteExpense(id);
    } catch (error) {
      console.log("Failed to delete expense", error);
      throw error;
    }
    // Optionally, you can also dispatch a Redux action to update the global state
    // dispatch(deleteExpense(id));
  };

  return (
    <div className="p-6 space-y-4 dark:bg-black">
      {/* 🔍 Search Bar */}
      <Input
        placeholder="Search..."
        className="w-[30%] h-full border shadow-md rounded-md outline-none "
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset to first page on search
        }}
      />

      {/* 📊 Table */}
      <Table aria-label="Table with search, sort, pagination, and delete">
        <TableHeader>
          {columns.map((col) => (
            <TableColumn key={col.key}>
              <div
                className={`flex items-center gap-1 ${
                  col.sortable ? "cursor-pointer select-none" : ""
                }`}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                {col.label}
                {col.sortable && (
                  <ArrowUpDown className="w-4 h-4 text-gray-500" />
                )}
              </div>
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.ExpenseName}</TableCell>
              <TableCell>{item.ExpenseAmount}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  color="danger"
                  onPress={() => handleDelete(item.originalId)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 📑 Pagination Controls */}
      <div className="flex justify-center w-full mt-4">
        <Pagination
          total={totalPages}
          page={page}
          onChange={setPage}
          showControls
          classNames={{
            item: "min-w-[48px] h-10 text-base flex items-center justify-center", // all buttons
            cursor: "hidden", // active state (background + color only)
          }}
        />
      </div>
    </div>
  );
}
