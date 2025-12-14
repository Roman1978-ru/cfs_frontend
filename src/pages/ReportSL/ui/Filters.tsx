import { fromAbsolute } from "@internationalized/date";
import { Card, CardBody, CardHeader, cn, DatePicker, Skeleton } from "@heroui/react";
import { dictionariesConfig, type Report47DictionariesResponse } from "@/entities/dictionaries";
import type { FiltersState } from "@/pages/Report47/types/filters-state.types.ts";
import { Select } from "@/shared/components/Select";

export function Filters({
    filters,
    defaultFilters,
    onFilterChange,
    dictionaries,
    isDictionariesLoading,
}: {
    filters: FiltersState;
    defaultFilters: Partial<FiltersState> | null;
    onFilterChange: (key: string, value: Array<number>) => void;
    dictionaries: Report47DictionariesResponse | undefined;
    isDictionariesLoading: boolean;
}) {
    const renderField = (config: typeof dictionariesConfig[number]) => {
        const KEY = config.key as keyof FiltersState;
        const items = dictionaries?.[KEY as keyof typeof dictionaries];
        const value = filters[KEY] ?? defaultFilters?.[KEY] ?? [];

        if (config.type === 'date') {
            return (
                <DatePicker
                    key={KEY}
                    size="sm"
                    label={config.label}
                    showMonthAndYearPickers
                    firstDayOfWeek="mon"
                    hideTimeZone
                    granularity="day"
                    value={value[0] ? fromAbsolute(value[0], 'UTC') : undefined}
                    onChange={(v) => onFilterChange(KEY, v ? [v.toDate().getTime()] : [])}
                    calendarProps={{
                        weekdayStyle: 'short',
                    }}
                />
            );
        }

        if (config.type === 'select') {
            let LABEL_VALUE;

            switch (config.dataStruct) {
                case 'name-like':
                    LABEL_VALUE = 'name';
                    break;
                case 'default':
                default:
                    LABEL_VALUE = 'key';
            }

            return (
                <Select
                    size="sm"
                    className={cn(
                        config.fuc && 'row-span-1 2xl:row-span-4 self-start order-last 2xl:order-none',
                    )}
                    isClearable={config.isMulti && value.length !== 0}
                    isSearchable={!!items?.length && items.length > 10}
                    placeholder={config.placeholder}
                    isMulti={config.isMulti}
                    key={KEY}
                    label={config.label}
                    selectedKeys={value.map(String)}
                    onSelectionChange={(keys) => {
                        if (keys === 'all') {
                            throw new Error('Multi-select "all" selection is not supported');
                        }

                        onFilterChange(KEY, [...keys].map(Number));
                    }}
                    items={items?.map((item: any) => ({
                        key: String(item.id),
                        label: item[LABEL_VALUE],
                    })) ?? []}
                />
            );
        }

        return null;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
            {
                isDictionariesLoading ? (
                    <>
                        {Array.from({ length: dictionariesConfig.length }).map((_, i) => (
                            <Card key={i} shadow="none">
                                <CardHeader className="pb-1">
                                    <Skeleton className="h-2 w-1/3 rounded-xl"/>
                                </CardHeader>
                                <CardBody className="pt-1">
                                    <Skeleton className="h-3 w-2/3 rounded-xl"/>
                                </CardBody>
                            </Card>
                        ))}
                    </>
                ) : (
                    <>
                        {dictionariesConfig.map((config) => renderField(config))}
                    </>
                )
            }
        </div>
    )
}
