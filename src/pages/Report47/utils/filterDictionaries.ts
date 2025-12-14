import { dictionariesConfig, type Report47DictionariesResponse } from "@/entities/dictionaries";
import type { FiltersState } from "src/pages/Report47/types/filters-state.types.ts";

export function filterDictionaries(
    dictionaries: Report47DictionariesResponse,
    filtersState: FiltersState,
    defaultFilters: FiltersState,
) {
    const filteredDictionariesAcc = {} as Report47DictionariesResponse;

    dictionariesConfig.forEach((config) => {
        const key = config.key as keyof Report47DictionariesResponse;

        let dictionary = dictionaries[key];

        config.filters?.forEach((filter) => {
            const watchedOptionsIds = filtersState[filter.watchKey] ?? defaultFilters?.[filter.watchKey];
            const watchedDictionary = dictionaries[filter.watchKey as keyof Report47DictionariesResponse];

            // Если поле на которое смотрим не имеет состояния - не применяем фильтр
            if (!watchedOptionsIds[0] || !watchedDictionary) return;

            const items = watchedDictionary.filter((option) => {
                return watchedOptionsIds.includes(option.id);
            });

            if (items.length === 0) {
                filteredDictionariesAcc[key] = dictionary as any;
                console.warn(
                    `filterDictionaries: No matching items found in watched dictionary "${filter.watchKey}" for values:`,
                    watchedOptionsIds,
                    'list of options:',
                    watchedDictionary
                );
                return;
            }

            const optionsIds = new Set<number>();
            let onlyIgnoredOptions = true;

            items.forEach((item) => {
                const watchedValue = (item as any)[filter.watchField];

                if (
                    filter.ignoredValues?.includes(watchedValue)
                    || (filter.notIgnoredValues && !filter.notIgnoredValues.includes(watchedValue))
                ) return;

                onlyIgnoredOptions = false;

                const filtered = dictionary.filter((d) => {
                    function toArray(v: any): any[] {
                        if (typeof v === 'string') {
                            return v.split(',').map(s => {
                                const trimmed = s.trim();
                                const num = Number(trimmed);
                                return Number.isNaN(num) ? trimmed : num;
                            });
                        }

                        if (!Array.isArray(v)) {
                            console.warn(`Unexpected value type for "in" or "not-in" rule:`, v, `With type: ${typeof v}`);
                            return [v];
                        }

                        return v;
                    }

                    function check(v: any, rule: string, targetValue: any): boolean {
                        if (rule === "equals") {
                            return v === targetValue;
                        } else if (rule === "not-equals") {
                            return v !== targetValue;
                        } else if (rule === "in") {
                            return toArray(v).includes(targetValue);
                        } else if (rule === "not-in") {
                            return !toArray(v).includes(targetValue);
                        }
                        return false;
                    }

                    // Если targetField - массив, проверяем любое из полей (OR)
                    if (Array.isArray(filter.targetField)) {
                        return filter.targetField.some((fieldFilter) => {
                            if (typeof fieldFilter === 'object') {
                                const usedField = fieldFilter.selectedTargetField;

                                const watchedIds = filtersState[fieldFilter.watchKey] ?? defaultFilters?.[fieldFilter.watchKey];
                                const watchedDict = dictionaries[fieldFilter.watchKey as keyof Report47DictionariesResponse];

                                if (!watchedIds || !watchedDict) return false;

                                const watchedOptions = watchedDict.filter((option) => {
                                    return watchedIds.includes(option.id);
                                });

                                const hasMatchingWatchedOption = watchedOptions.some((opt) => {
                                    return check((opt as any)[fieldFilter.watchField], fieldFilter.rule, fieldFilter.value);
                                });

                                if (!hasMatchingWatchedOption) return false;

                                return check((d as any)[usedField], filter.rule, watchedValue);
                            }

                            return check((d as any)[fieldFilter], filter.rule, watchedValue);
                        });
                    } else {
                        const v = (d as any)[filter.targetField];

                        return check(v, filter.rule, watchedValue);
                    }
                }) as typeof dictionary;

                filtered.forEach((f) => {
                    optionsIds.add(f.id);
                });
            });

            if (onlyIgnoredOptions) return;
            dictionary = dictionary.filter((d) => optionsIds.has(d.id)) as any;
        });

        filteredDictionariesAcc[key] = dictionary as any;
    });

    return filteredDictionariesAcc;
}
