import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService implements Storage {
  private readonly storage: Storage = window.localStorage;

  constructor(){}

  length = this.storage.length;

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): any {
    return JSON.parse(this.storage.getItem(key)).value;

  }

  key(index: number): string {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify({ value: value }));
  }
}

export abstract class LocalStorageToken {
  clear: () => void;
  getItem: (key: string) => any;
  key: (index: number) => string;
  removeItem: (key: number) => void;
  setItem: (key: string, value: any) => void;
}

// export const StorageToken = new InjectionToken<LocalStorageService>('Storage Token');
