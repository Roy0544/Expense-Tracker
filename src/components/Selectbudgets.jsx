"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { getbudgetcategory } from "@/store/budgetSlice";

function Selectbudgets() {
  const dispatch = useDispatch();

  const changehandler = (category) => {
    dispatch(getbudgetcategory(category));
  };

  const options = [
    "All",
    "Food",
    "Transport",
    "Entertainment",
    "Health",
    "Shopping",
    "Bills",
    "Education",
    "Others",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Select onValueChange={changehandler}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
        </motion.div>

        <SelectContent>
          {options.map((op) => (
            <motion.div
              key={op}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.05 * options.indexOf(op) }}
            >
              <SelectItem value={op}>{op}</SelectItem>
            </motion.div>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
}

export default Selectbudgets;
