import { Link } from "react-router-dom";
import { Button, Card } from "@heroui/react";
import { Filters } from "./Filters.tsx";
import { Export } from "./Export.tsx";
import { useReport47Page } from "../react/useReport47Page.ts";

export function Report47Page() {
    const {
        isDictionariesLoading,
        isExportingExcel,
        handleExport,
        filtersState,
        defaultFilters,
        handleFilterChange,
        dictionaries
    } = useReport47Page();

    return (
        <div className="container mx-auto flex flex-col p-3 md:px-0 gap-6">
            <div className="flex flex-col gap-2">
                <Button
                    as={Link}
                    to="/"
                    color="default"
                    variant="light"
                    startContent={
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    }
                    className="w-fit text-foreground-500"
                >
                    На главную
                </Button>
                <h1 className="text-xl font-bold">47_UGTP_BEHIN_OPT</h1>
            </div>

            <Card shadow="none" className="bg-foreground-100/75 dark:bg-foreground-300/33 p-3 gap-3">
                <Filters
                    filters={filtersState}
                    defaultFilters={defaultFilters}
                    onFilterChange={handleFilterChange}
                    dictionaries={dictionaries}
                    isDictionariesLoading={isDictionariesLoading && !defaultFilters}
                />

                <Export
                    isLoading={isDictionariesLoading}
                    handleExport={handleExport}
                    isExportingExcel={isExportingExcel}
                />
            </Card>
        </div>
    );
}

