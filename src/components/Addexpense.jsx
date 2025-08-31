import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
function Addexpense() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <label htmlFor="name">Expense Name: </label>
            <Input
              type={"text"}
              placeholder="Enter Your Expense Name"
              required
            />
            <label htmlFor="amount">Amount: </label>
            <Input type={"text"} placeholder="Enter Amount" required />
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Add
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Addexpense;
