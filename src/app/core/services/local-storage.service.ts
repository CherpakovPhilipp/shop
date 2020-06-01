import { Injectable, Inject, InjectionToken } from '@angular/core';

@Injectable()
export class LocalStorageService implements Storage {
  private readonly storage: Storage = window.localStorage;

  constructor(){}

  length = this.storage.length;

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string {
    return this.storage.getItem(key);
  }

  key(index: number): string {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}

export abstract class LocalStorageToken {
  clear: () => void;
  getItem: (key: string) => string;
  key: (index: number) => string;
  removeItem: (key: number) => void;
  setItem: (key: string, value: string) => void;
}

// export const StorageToken = new InjectionToken<LocalStorageService>('Storage Token');
