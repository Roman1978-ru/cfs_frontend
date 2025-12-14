import React from "react";
import { dictionariesConfig, useExport47ExcelMutation, useGet47DictionariesQuery } from "@/entities/dictionaries";
import { useDefaultFilters } from "./useDefaultFilters.ts";
import type { FiltersState } from "src/pages/Report47/types/filters-state.types.ts";
import { filterDictionaries } from "../utils/filterDictionaries.ts";

export function useReport47Page() {
    const [exportExcel, { isLoading: isExportingExcel }] = useExport47ExcelMutation();
    const { data: allDictionaries, isLoading: isDictionariesLoading } = useGet47DictionariesQuery();
    const [filtersState, setFiltersState] = React.useState<FiltersState>({});

    const defaultFilters = useDefaultFilters(allDictionaries);

    const filteredDictionaries = React.useMemo(() => {
        if (!allDictionaries || !defaultFilters) return undefined;

        return filterDictionaries(allDictionaries, filtersState, defaultFilters);
    }, [allDictionaries, filtersState, defaultFilters]);

    const handleFilterChange = (key: string, value: Array<number>) => {
        setFiltersState((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleExport = async () => {
        try {
            const params = dictionariesConfig.reduce((acc, field) => {
                const value = filtersState[field.key as keyof FiltersState] ?? defaultFilters?.[field.key as keyof FiltersState];

                if (field.type === "date") {
                    acc[field.key] = value;
                } else {
                    const numValue = value ? Number(value) : undefined;
                    acc[field.key] = numValue !== undefined ? [numValue] : [];
                }

                return acc;
            }, {} as any);

            await exportExcel(params).unwrap();
        } catch (error) {
            console.error("Ошибка экспорта:", error);
        }
    };

    return {
        dictionaries: filteredDictionaries,
        isDictionariesLoading,
        filtersState,
        defaultFilters,
        handleFilterChange,
        handleExport,
        isExportingExcel,
    };
}
