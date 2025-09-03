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
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

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
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
const searchVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const tableVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const rowVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const paginationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.6,
      ease: "easeOut",
    },
  },
};
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-4 dark:bg-black"
    >
      {/* 🔍 Search Bar */}
      <motion.div variants={searchVariants}>
        <Input
          placeholder="Search expenses..."
          className="w-[30%] h-full border shadow-md rounded-md outline-none transition-all duration-200 focus:shadow-lg"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to first page on search
          }}
        />
      </motion.div>

      {/* 📊 Table */}
      <motion.div variants={tableVariants}>
        <Table aria-label="Animated expense table">
          <TableHeader>
            {columns.map((col, index) => (
              <TableColumn key={col.key}>
                <motion.div
                  variants={headerVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-1 ${
                    col.sortable ? "cursor-pointer select-none" : ""
                  }`}
                  onClick={() => col.sortable && handleSort(col.key)}
                  whileHover={col.sortable ? { scale: 1.02 } : {}}
                  whileTap={col.sortable ? { scale: 0.98 } : {}}
                >
                  {col.label}
                  {col.sortable && (
                    <motion.div
                      animate={{
                        rotate:
                          sortConfig.key === col.key &&
                          sortConfig.direction === "desc"
                            ? 180
                            : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpDown className="w-4 h-4 text-gray-500" />
                    </motion.div>
                  )}
                </motion.div>
              </TableColumn>
            ))}
          </TableHeader>

          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.id}
                  </motion.span>
                </TableCell>
                <TableCell>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    {item.ExpenseName}
                  </motion.span>
                </TableCell>
                <TableCell>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    className="font-semibold text-red-500"
                  >
                    ${item.ExpenseAmount}
                  </motion.span>
                </TableCell>
                <TableCell>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="sm"
                      color="danger"
                      onPress={() => handleDelete(item.originalId)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </motion.div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* 📑 Pagination Controls */}
      <motion.div
        variants={paginationVariants}
        className="flex justify-center w-full mt-4"
      >
        <Pagination
          total={totalPages}
          page={page}
          onChange={setPage}
          showControls
          classNames={{
            item: "min-w-[48px] h-10 text-base flex items-center justify-center transition-all duration-200 hover:scale-105",
            cursor: "hidden",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
