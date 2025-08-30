export declare class EventEmitter {
    private events;
    on(event: string, listener: Function): void;
    off(event: string, listener: Function): void;
    emit(event: string, ...args: any[]): void;
    removeAllListeners(event?: string): void;
}
//# sourceMappingURL=EventEmitter.d.ts.map