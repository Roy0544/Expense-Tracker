import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { NumberTicker } from "@/components/magicui/number-ticker";
import Link from "next/link";

export default function Budgetcards({ name, amount }) {
  return (
    <div>
      <Link href={"/budgetdetail"}>
        <Card className="w-[95%] mx-auto h-[180px]  shadow-2xl dark:text-slate-100 text-[#374151]">
          <div className="flex justify-between items-center ">
            <CardHeader>
              <CardTitle className="text-[18px] font-sans font-bold">
                <div className="flex items-center gap-4">
                  <img className="border w-6 h-6" src="jfsfd/d" alt="" />
                  <p>{name}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-sans font-bold"> ${amount}</p>
            </CardContent>
          </div>
          <CardFooter>
            <Progress value={20} />
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
