import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';

import { cn } from "../../../lib/utils";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        // Keep minimal structural classes and avoid overriding table/row display
        months: "rdp-months",
        month: "rdp-month",
        caption: "rdp-caption",
        caption_label: "rdp-caption_label",
        nav: "rdp-nav",
        nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 p-0"),
        table: "rdp-table w-full",
        head_row: "rdp-head_row",
        head_cell: "rdp-head_cell text-muted-foreground",
        row: "rdp-row",
        cell: "rdp-cell",
        day: cn(buttonVariants({ variant: "ghost" }), "rdp-day"),
        day_selected: "rdp-day_selected",
        day_today: "rdp-day_today",
        day_outside: "rdp-day_outside",
        day_disabled: "rdp-day_disabled",
        day_hidden: "rdp-day_hidden",
        ...classNames,
      }}
      // react-day-picker types are strict; cast components to any for compatibility here
      components={({
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      } as any)}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
