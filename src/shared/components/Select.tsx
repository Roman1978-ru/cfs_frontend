import React from "react";
import { cn, Input, Select as SelectRoot, SelectItem } from "@heroui/react";

const collator = new Intl.Collator('ru', {
    sensitivity: 'base',
    numeric: true,
    ignorePunctuation: true,
    usage: 'search',
});

type Props = Pick<
    React.ComponentProps<typeof SelectRoot>,
    'selectedKeys' | 'onSelectionChange'
    | 'size' | 'classNames' | 'isClearable' | 'placeholder'
    | 'label' | 'className'
> & {
    isMulti?: boolean;
    limit?: number;
    isSearchable?: boolean;
    items: Array<{ key: string; label: string, isAll?: boolean }>;
}

export function Select({ isMulti, classNames, isSearchable, items, selectedKeys, onSelectionChange, limit = 100, ...rest }: Props) {
    const [searchString, setSearchString] = React.useState('');
    const deferredSearchString = React.useDeferredValue(searchString);
    const [orders, setOrders] = React.useState<Record<string, number>>({});
    const isSearchPending = searchString !== deferredSearchString;

    const listboxRef = React.useRef<HTMLUListElement | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const getFirstListboxItem = () => {
        return listboxRef.current?.querySelector('[role="option"]') as HTMLElement | null;
    }

    const filteredItems = React.useMemo(() => {
        if (!isSearchable || !deferredSearchString.trim()) {
            return items;
        }

        return items.filter(item => {
            return collator.compare(
                item.label,
                deferredSearchString,
            ) === 0 || item.label.toLowerCase().includes(deferredSearchString.toLowerCase());
        });
    }, [isSearchable, deferredSearchString, items]);

    const createNewOrder = () => {
        if (selectedKeys === 'all' || !selectedKeys) {
            setOrders({});
            return;
        }

        const selectedArray = Array.isArray(selectedKeys) ? selectedKeys : Array.from(selectedKeys);

        if (selectedArray.length === 0) {
            setOrders({});
            return;
        }


        let i = 1;
        const newOrders: Record<string, number> = {};
        const nonSelectedItems: string[] = [];

        items.forEach(item => {
            if (selectedArray.includes(item.key)) {
                newOrders[item.key] = i;
                i++;
            } else {
                nonSelectedItems.push(item.key);
            }
        });

        nonSelectedItems.forEach(key => {
            newOrders[key] = i;
            i++;
        });

        setOrders(newOrders);
    };

    const isReachLimit = limit !== undefined && filteredItems.length >= limit;

    const displayedItems = React.useMemo(() => {
        if (isReachLimit) {
            const selectedKeysArray = selectedKeys === 'all' || !selectedKeys
                ? null
                : (Array.isArray(selectedKeys) ? selectedKeys : Array.from(selectedKeys));

            let sorted;

            if (!selectedKeysArray) {
                sorted = [...filteredItems];
            } else {
                sorted = [...filteredItems].sort((a, b) => {
                    const aSelected = selectedKeysArray.includes(a.key);
                    const bSelected = selectedKeysArray.includes(b.key);

                    if (aSelected && !bSelected) return -1;
                    if (!aSelected && bSelected) return 1;

                    return 0;
                });
            }

            return sorted.slice(0, limit);
        }

        return filteredItems;
    }, [filteredItems, limit]);

    return (
        <SelectRoot
            size="sm"
            isVirtualized={false}
            selectedKeys={selectedKeys}
            {...rest}
            onSelectionChange={onSelectionChange}
            onOpenChange={createNewOrder}
            scrollShadowProps={{
                isEnabled: false,
            }}
            selectionMode={isMulti ? 'multiple' : 'single'}
            classNames={{
                value: 'text-foreground',
            }}
            listboxProps={{
                emptyContent: 'Ничего не найдено',
                ref: listboxRef,
                onKeyDown: (e) => {
                    // Если на первом элементе нажали ArrowUp → вернуться в поиск
                    if (e.key === "ArrowUp") {
                        const active = document.activeElement;
                        const first = getFirstListboxItem();
                        if (active === first) {
                            e.preventDefault();
                            inputRef.current?.focus();
                        }
                    }
                },
                topContent: (
                    isSearchable && (
                        <Input
                            className="sticky top-0 z-10"
                            ref={inputRef}
                            value={searchString}
                            onValueChange={setSearchString}
                            placeholder="Поиск..."
                            size="sm"
                            isClearable
                            onKeyDown={(e) => {
                                // Если в поиске нажали ArrowDown → перейти к первому элементу
                                if (e.key === "ArrowDown") {
                                    e.preventDefault();
                                    const first = getFirstListboxItem();
                                    if (first) first.focus();
                                }
                            }}
                            classNames={{
                                inputWrapper: 'ring-0!',
                            }}
                        />
                    )
                ),
                bottomContent: isReachLimit ? (
                    <div className="p-2 text-center text-sm text-muted-foreground">
                        Показано {limit} из {filteredItems.length} элементов. Пожалуйста, уточните поиск.
                    </div>
                ) : null,
                itemClasses: {
                    base: cn(
                        'outline-none',
                        isSearchPending && 'opacity-50 transition-opacity',
                    ),
                }
            }}
        >
            {displayedItems.map(item => (
                <SelectItem
                    key={item.key}
                    style={{
                        order: (isMulti && orders[item.key]) || (item.isAll ? 0 : 1),
                    }}
                    classNames={{
                        title: 'whitespace-pre-wrap',
                    }}
                >
                    {item.label}
                </SelectItem>
            ))}
        </SelectRoot>
    )
}
