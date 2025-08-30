import { EventEmitter } from '../utils/EventEmitter';
import { MusicProvider, ProviderEvents } from './types';
export * from './types';
export declare class ProviderRegistry extends EventEmitter {
    private providers;
    private activeProvider;
    constructor();
    registerProvider(provider: MusicProvider): void;
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    getProvider(id: string): MusicProvider | undefined;
    getActiveProvider(): MusicProvider;
    setActiveProvider(id: string): void;
    getProviderForDescriptor(descriptor: string): MusicProvider;
    emitAuthStateChanged(providerId: string, state: ProviderEvents['authStateChanged']): void;
    emitProviderError(providerId: string, error: ProviderEvents['providerError']): void;
}
export declare const providerRegistry: ProviderRegistry;
//# sourceMappingURL=index.d.ts.map