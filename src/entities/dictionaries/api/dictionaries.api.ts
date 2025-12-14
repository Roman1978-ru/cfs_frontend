import { api } from '@/shared/api';
import type { Report47DictionariesResponse, Report47ExportExcelRequest } from "../types/47.types.ts";

export const dictionariesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        get47Dictionaries: builder.query<Report47DictionariesResponse, void>({
            query: () => ({
                url: '/get_all_voc',
            }),
        }),
        export47Excel: builder.mutation<void, Report47ExportExcelRequest>({
            query: (body) => ({
                url: '/export_participants_excel',
                method: 'POST',
                body,
                responseHandler: async (response) => {
                    const fileName = response.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/['"]/g, '') || 'report.xlsx';
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                },
            }),
        }),
    }),
});

export const {
    useGet47DictionariesQuery,
    useExport47ExcelMutation,
} = dictionariesApi;

