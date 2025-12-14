import { Button } from "@heroui/react";

export type Report47ExportProps = {
    isLoading: boolean;
    isExportingExcel: boolean;
    handleExport: () => void;
}

export function Export({
    isLoading,
    isExportingExcel,
    handleExport,
}: Report47ExportProps) {
    return (
        <div className="flex flex-row w-full">
            <Button
                color="success"
                isLoading={isExportingExcel}
                onPress={handleExport}
                className="font-semibold ml-auto"
                isDisabled={isLoading}
            >
                {isExportingExcel ? 'Формирование файла...' : 'Экспортировать в Excel'}
            </Button>
        </div>
    )
}
