export type DictionariesConfig = {
    key: string;
    label: string;
    placeholder?: string;
    type: 'date' | 'select';
    dataStruct?: 'default' | 'name-like';
    defaultDate?: 'start-of-year' | 'end-of-prev-month';
    isMulti?: boolean;
    fuc?: boolean
    filters?: Filter[]
}[]

type Filter = {
    watchKey: string;
    watchField: string;
    targetField: string | Array<string| TargetFieldFilter>;
    rule: 'equals' | 'not-equals' | 'in' | 'not-in';
    ignoredValues?: any[];
    notIgnoredValues?: any[];
}

type TargetFieldFilter = {
    selectedTargetField: string;
    watchKey: string;
    watchField: string;
    rule: 'equals' | 'not-equals' | 'in' | 'not-in';
    value: any;
}

export const dictionariesConfig: DictionariesConfig = [
    {
        key: 'p_report_type',
        label: 'Группировка по',
        type: 'select',
    },
    {
        key: 'p_is_tis',
        label: 'Участник/ТИТЭС',
        isMulti: true,
        placeholder: 'Все',
        type: 'select',
    },
    {
        key: 'p_show_str',
        label: 'Отображать структуру Д3',
        type: 'select',
    },
    {
        key: 'p_group', // Тут нет фильтрации от прав
        label: 'Группы участников',
        placeholder: 'Нет',
        type: 'select',
        dataStruct: 'name-like',
    },
    {
        key: 'p_ft',
        label: 'Факт/План',
        dataStruct: 'name-like',
        type: 'select',
        fuc: true,
        // TODO: текущие поля в ответе не корректны, мб придется править после фикса
        filters: [{
            watchKey: 'p_report_type',
            watchField: 'value',
            targetField: 'group_by',
            rule: 'in'
        }]
    },
    {
        key: 'p_is_gp',
        label: 'ГП',
        type: 'select',
        placeholder: 'Все',
    },
    {
        key: 'p_show_par',
        label: 'Показывать параметры',
        placeholder: 'Все',
        type: 'select',
        dataStruct: 'name-like',
        isMulti: true,
        filters: [{
            watchKey: 'p_show_str',
            watchField: 'value',
            targetField: 'show_dz',
            rule: 'not-equals'
        }]
    },
    {
        key: "p_participant",
        label: "Участник",
        placeholder: "Все",
        isMulti: true,
        type: "select",
        dataStruct: 'name-like',
        filters: [
            {
                watchKey: "p_is_tis",
                watchField: "value",
                targetField: "p_is_tis",
                rule: "equals",
                // ignoredValues: [-1], // отключено тк p_is_tis - мульвыбор
            },
            {
                watchKey: "p_is_gp",
                watchField: "value",
                ignoredValues: [null],
                targetField: [{
                    selectedTargetField: "gp1",
                    watchKey: "p_gp_check_method",
                    watchField: "value",
                    rule: 'equals',
                    value: 1,
                },
                {
                    selectedTargetField: "gp2",
                    watchKey: "p_gp_check_method",
                    watchField: "value",
                    rule: 'equals',
                    value: 2,
                }],
                rule: "equals",
            },
            {
                watchKey: "p_report_type",
                watchField: "value",
                targetField: "group_by_participant", // Точно ли это то поле?
                rule: "equals",
                notIgnoredValues: [1],
            },
            {
                watchKey: "p_district",
                watchField: "value",
                targetField: [{
                    selectedTargetField: "fo1",
                    watchKey: "p_report_type",
                    watchField: "value",
                    rule: "equals",
                    value: 2,
                },
                {
                    selectedTargetField: "fo2",
                    watchKey: "p_report_type",
                    watchField: "value",
                    rule: "not-equals",
                    value: 2,
                }],
                ignoredValues: [null, 777],
                rule: "equals",
            },
            {
                watchKey: "p_subject",
                watchField: "id",
                targetField: [{
                    selectedTargetField: "p_subject2",
                    watchKey: "p_report_type",
                    watchField: "value",
                    rule: "equals",
                    value: 2,
                },
                {
                    selectedTargetField: "p_subject1",
                    watchKey: "p_report_type",
                    watchField: "value",
                    rule: "not-equals",
                    value: 2,
                }],
                rule: "equals",
            },
            // TODO Нет полей под:
            //     • «Группы участников» (p_group). В зависимости от выбранных значений выводится:
            //         ◦ все участники (p_group is null)
            //         ◦ участники, входящие в заданную группу
            // {
            //     watchKey: "p_group",
            //     watchField: "current_user",
            //     targetField: "group_by_participant",
            //     rule: "equals",
            // },
        ],
    },
    {
        key: 'p_koef',
        label: 'Значения в',
        type: 'select',
    },
    {
        key: 'd1',
        label: 'Начальная дата',
        type: 'date',
        defaultDate: 'start-of-year'
    },
    {
        key: 'p_district',
        label: 'Федеральный округ',
        isMulti: true,
        type: 'select',
        placeholder: 'Все',
    },
    {
        key: 'p_losses',
        label: 'Включать потери',
        type: 'select',
    },
    {
        key: 'p_period_type',
        label: 'Тип периода',
        type: 'select',
    },
    {
        key: 'd2',
        label: 'Конечная дата',
        type: 'date',
        defaultDate: 'end-of-prev-month'
    },
    {
        key: 'p_subject',
        label: 'Субъекты РФ',
        placeholder: 'Все',
        isMulti: true,
        type: 'select',
        dataStruct: 'name-like',
        filters: [{
            watchKey: 'p_district', // TODO: не понятно как работать с РФ опцией (777)
            watchField: 'value',
            targetField: 'fo_id',
            rule: 'equals',
            ignoredValues: [null]
        }]
    },
    {
        key: 'p_gp_check_method',
        label: 'Определять ГП',
        type: 'select',
        // TODO: в данных нет isDefault для поля
        // TODO Нет полей под:
        //  Значения параметра «Определять ГП» зависят от параметра «Группировка по» (p_report_type):
        //     • значение «по Участникам» отображается только в случаях, если «Группировка по» выбрана в одном из значений «Участникам ОРЭМ» и «Участникам ОРЭМ и ТП» (p_report_type in (1, 3))
        //     • значение «по ТП» отображается при любых значениях параметра «Группировка по»
    },
    {
        key: 'p_only_total',
        label: 'Выводить только итоговую строку',
        type: 'select',
    }
]

