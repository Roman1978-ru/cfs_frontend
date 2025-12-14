import React from "react";
import { dictionariesConfig, type Report47DictionariesResponse } from "@/entities/dictionaries";
import type { FiltersState } from "src/pages/Report47/types/filters-state.types.ts";
import { Temporal } from "temporal-polyfill";

export function useDefaultFilters(dictionaries: Report47DictionariesResponse | null | undefined) {
    return React.useMemo(() => {
        if (!dictionaries) return null;

        const df: FiltersState = {};

        dictionariesConfig.forEach((config) => {

            switch (config.type) {
                case "select": {
                    const items = dictionaries[config.key as keyof typeof dictionaries];

                    if (!items) return;

                    const defaultItem = items.find((item) => item.isDefault);

                    if (defaultItem) {
                        df[config.key] = [defaultItem.id];
                    } else {
                        df[config.key] = [];
                    }
                    return;
                }
                case "date": {
                    if (!config.defaultDate) return;

                    const getDefaultDateValue = (type: "start-of-year" | "end-of-prev-month"): number => {
                        if (type === "start-of-year") {
                            const startOfYear = Temporal.ZonedDateTime.from({
                                year: Temporal.Now.plainDateISO().year,
                                month: 1,
                                day: 1,
                                timeZone: 'UTC',
                            });
                            return startOfYear.epochMilliseconds;
                        } else {
                            const now = Temporal.Now.zonedDateTimeISO('UTC');
                            const prevMonth = now.subtract({ months: 1 });
                            const endOfPrevMonth = prevMonth.with({
                                day: prevMonth.daysInMonth,
                            });
                            return endOfPrevMonth.epochMilliseconds;
                        }
                    };

                    const dateValue = getDefaultDateValue(config.defaultDate);
                    df[config.key] = [dateValue];
                    return;
                }
                default: {
                    throw new Error(`useDefaultFilters: Unsupported filter type "${config.type}" in config for key "${config.key}"`);
                }
            }

        });

        return df;
    }, [dictionaries]);
}
