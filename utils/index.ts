import {AppContext} from "next/app";

export const LOCALDOMAIN = "http://127.0.0.1:3000";
export const CMSDOMAIN = "http://127.0.0.1:1337";
export const SERVERDOMAIN = "http://101.42.229.5:1337";

export const getIsMobile = (context: AppContext) => {
    const {headers = {}} = context.ctx.req || {};
    return /mobile|android|iphone|ipad|phone/i.test(
        (headers["user-agent"] || "").toLowerCase()
    );
};

export const getIsSupportWebp = (context: AppContext) => {
    const {headers = {}} = context.ctx.req || {};
    return headers.accept?.includes("image/webp");
};
//将时间与本地时间比较，返回相差的时间
export const getDiffTime = (time: string) => {
    const now = new Date().getTime();
    const diff = now - new Date(time).getTime();
    const diffDay = Math.floor(diff / (24 * 3600 * 1000));
    const diffHour = Math.floor((diff / (3600 * 1000)) % 24);
    const diffMinute = Math.floor((diff / (60 * 1000)) % 60);
    const diffSecond = Math.floor((diff / 1000) % 60);
    if (diffDay > 0) {
        return `${diffDay}天前`;
    } else if (diffHour > 0) {
        return `${diffHour}小时前`;
    } else if (diffMinute > 0) {
        return `${diffMinute}分钟前`;
    } else if (diffSecond > 0) {
        return `${diffSecond}秒前`;
    } else {
        return "刚刚";
    }
}

export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): T {
    let lastFunc;
    let lastRan;
    return function (this: any, ...args: any[]) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    } as T;
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}