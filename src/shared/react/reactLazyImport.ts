import React from "react";

/**
 * Функция для ленивого импорта специфичного компонента из модуля (с "default export").
 */
export function reactLazyImport<
    T extends {}, U extends keyof T
>(loader: (x?: string) => Promise<T>) {
    return new Proxy(({} as unknown) as T, {
        get: (_, componentName: string | symbol) => {
            if (typeof componentName === 'string') {
                const lazyItem = React.lazy(() =>
                    loader(componentName).then((x) => ({
                        default: (x[componentName as U] as any) as React.ComponentType<any>,
                    }))
                )

                const memoizedLazyItem = React.memo(lazyItem);
                memoizedLazyItem.displayName = componentName;
                return memoizedLazyItem;
            }
        },
    })
}
