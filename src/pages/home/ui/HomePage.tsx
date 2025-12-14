import { Card, CardBody, Link } from "@heroui/react";

export function HomePage() {
    const reports = [
        {
            id: '47',
            description: 'Отчет по данным 47_UGTP_BEHIN_OPT с возможностью фильтрации и экспорта в Excel',
            href: '/47',
            color: 'primary' as const,
        },
        {
            id: 'SL',
            description: 'Ckbzybt',
            href: '/SL',
            color: 'primary' as const,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Добро пожаловать в систему ЦФР</h1>
                <p className="text-lg text-foreground-500">
                    Выберите интересующий отчет
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <Card
                        key={report.id}
                        isPressable
                        isHoverable
                        as={Link}
                        href={report.href}
                        className="bg-gradient-to-br from-primary-200/20 to-primary-100/20 dark:from-primary-900/20 dark:to-primary-800/20 shadow-none"
                    >
                        <CardBody>
                            <p className="text-small text-foreground-500">
                                {report.description}
                            </p>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {reports.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-lg text-foreground-400">
                        Нет доступных отчетов
                    </p>
                </div>
            )}
        </div>
    );
}
