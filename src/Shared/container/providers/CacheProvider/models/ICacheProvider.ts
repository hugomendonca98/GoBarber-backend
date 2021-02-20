import { NullableBoolean } from 'aws-sdk/clients/budgets';

export default interface ICacheProvider {
    save(key: string, value: string): Promise<void>;
    recovery(key: string): Promise<string | null>;
    invalidate(key: string): Promise<void>;
}
