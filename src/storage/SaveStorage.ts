import { Uint } from '@/oidlib';
import { JSONStorage } from '@/void';
import { SaveData } from './SaveData.ts';

export interface SaveStorage {
  readonly save: SaveData;
  readonly storage: Storage;
}

const saveKey = 'save';

export namespace SaveStorage {
  export function load(storage: Storage): SaveStorage {
    const save = JSONStorage.get<SaveData>(storage, saveKey) ??
      SaveData(Uint(0));
    return { save, storage };
  }

  export function save(self: SaveStorage): void {
    JSONStorage.put(self.storage, saveKey, self.save);
  }
}
