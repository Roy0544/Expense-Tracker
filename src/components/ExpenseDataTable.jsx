"use client";

import React, { useState, useMemo } from "react";
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

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "role", label: "Role", sortable: true },
  { key: "actions", label: "Actions" }, // new column for delete
];

// Example data
const initialData = [
  { id: 1, name: "Alice", role: "Engineer" },
  { id: 2, name: "Bob", role: "Designer" },
  { id: 3, name: "Charlie", role: "Manager" },
  { id: 4, name: "Diana", role: "Engineer" },
  { id: 5, name: "Ethan", role: "Intern" },
  { id: 6, name: "Fiona", role: "Engineer" },
  { id: 7, name: "George", role: "Manager" },
  { id: 8, name: "Hannah", role: "Designer" },
  { id: 9, name: "Ian", role: "Engineer" },
  { id: 10, name: "Julia", role: "Intern" },
];

export default function DataTable() {
  const [data, setData] = useState(initialData); // now stateful
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // 🔍 Filtering
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

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

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 space-y-4">
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
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  color="danger"
                  onPress={() => handleDelete(item.id)}
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
