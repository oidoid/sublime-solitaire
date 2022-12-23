import { Immutable } from '@/oidlib';
import { Solitaire } from '@/solitaire';
import { Input, Sprite, System } from '@/void';
import { setSpritePositionsForLayout } from '../../level/Level.ts';
import { SublimeECSUpdate } from '../SublimeECSUpdate.ts';

export interface VacantStockSet {
  readonly vacantStock: Record<never, never>;
  readonly sprite: Sprite;
}

export const VacantStockSystem: System<VacantStockSet, SublimeECSUpdate> =
  Immutable({
    query: new Set(['vacantStock', 'sprite']),
    skip(update) {
      return !!update.pickHandled ||
        update.inputs.pick == null ||
        // to-do: inactiveTriggered when i have picking sorted to only allow one
        // handler.
        !Input.activeTriggered(update.inputs.pick);
    },
    updateEnt(set, update) {
      if (!set.sprite.intersectsBounds(update.inputs.pick!.xy)) return;
      Solitaire.deal(update.solitaire);
      setSpritePositionsForLayout(
        update.ecs,
        update.filmByID,
        update.solitaire,
        update.time,
      );
    },
  });
