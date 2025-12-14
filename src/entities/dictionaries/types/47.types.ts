export interface Report47DictionariesResponse {
    p_district: PDistrict[]
    p_ft: PFt[]
    p_gp_check_method: PGpCheckMethod[]
    p_group: PGroup[]
    p_is_gp: PIsGp[]
    p_is_tis: PIsTi[]
    p_koef: PKoef[]
    p_losses: PLoss[]
    p_only_total: POnlyTotal[]
    p_participant: PParticipant[]
    p_period_type: PPeriodType[]
    p_report_type: PReportType[]
    p_show_par: PShowPar[]
    p_show_str: PShowStr[]
    p_subject: PSubject[]
}

export interface PDistrict {
    id: number
    key?: number
    value: string
    isDefault: boolean
}

export interface PFt {
    group_by: string
    id: number
    name: string
    isDefault: boolean
}

export interface PGpCheckMethod {
    id: number
    key: string
    value: number
    isDefault: boolean
}

export interface PGroup {
    current_user: number
    id: number
    name: string
    isDefault: boolean
}

export interface PIsGp {
    id: number
    key: string
    value?: number
    isDefault: boolean
}

export interface PIsTi {
    id: number
    key: string
    value: number
    isDefault: boolean
}

export interface PKoef {
    id: number
    key: string
    value: number
    isDefault: boolean
}

export interface PLoss {
    id: number
    key: string
    value: number
    isDefault: boolean
}

export interface POnlyTotal {
    id: number
    key: string
    value: number
    isDefault: boolean
}

export interface PParticipant {
    fo1: number
    fo2: number
    gp1: number
    gp2: number
    group_by_participant?: number
    id: number
    name: string
    p_is_tis: number
    p_subject1: number
    p_subject2: number
    isDefault: boolean
}

export interface PPeriodType {
    id: number
    key: string
    value: string
    isDefault: boolean
}

export interface PReportType {
    id: number
    key: string
    value: number
    isDefault: boolean
}

export interface PShowPar {
    id: number
    name: string
    show_dz?: number
    isDefault: boolean
}

export interface PShowStr {
    id: number
    key: string
    value: number
    isDefault: boolean
}

export interface PSubject {
    fo_id: number
    id: number
    name: string
    isDefault: boolean
}

export interface Report47ExportExcelRequest {
    p_district: number[]
    p_ft: number[]
    p_gp_check_method: number[]
    p_group: number[]
    p_is_gp: number[]
    p_is_tis: number[]
    p_koef: number[]
    p_losses: number[]
    p_only_total: number[]
    p_participant: number[]
    p_period_type: number[]
    p_report_type: number[]
    p_show_par: number[]
    p_show_str: number[]
    p_subject: number[]
    d1?: string
    d2?: string
}
