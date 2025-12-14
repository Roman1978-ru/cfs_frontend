export type DictionaryItem = {
    value: string | number;
    label: string;
}

export type Dictionary = {
    allItem: DictionaryItem | null;
    defaultValue: string | number | null;
    items: DictionaryItem[];
}
