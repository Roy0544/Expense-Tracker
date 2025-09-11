import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-black dark:text-slate-100"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>How does the expense tracking work?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Our expense tracker automatically categorizes your spending and
            provides real-time insights into your financial habits.
          </p>
          <p>
            Key features include smart categorization, budget alerts, spending
            trends analysis, and detailed reports that help you understand where
            your money goes each month.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Can I set up budgets and alerts?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Yes! Create custom budgets for different categories like groceries,
            entertainment, or utilities. Set spending limits and receive alerts
            when you're approaching your budget limits.
          </p>
          <p>
            Our smart alert system helps you stay on track with your financial
            goals. Get weekly summaries, monthly reports, and personalized
            recommendations to improve your spending habits.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>
          What analytics and reports are available?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Access comprehensive spending analytics including pie charts, trend
            graphs, and category breakdowns. See your spending patterns over
            time and identify areas where you can save money.
          </p>
          <p></p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>Is there a mobile app available?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Our expense tracker is fully responsive and works seamlessly on all
            devices. While we don't have a dedicated mobile app yet, our web
            application provides a native app-like experience on smartphones and
            tablets.
          </p>
          <p>
            Log expenses on the go, check your budgets, and view spending
            analytics from anywhere. All your data syncs instantly across all
            your devices for a consistent experience.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
