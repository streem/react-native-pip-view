import { type SharedValue, useDerivedValue } from 'react-native-reanimated';

import type { Edges, PiPViewPosition } from '../models';
import { getPosition } from '../utils';

export const useDerivedPosition = ({
  edges,
  translationX,
  translationY,
}: {
  edges: SharedValue<Edges | null>;
  translationX: SharedValue<number>;
  translationY: SharedValue<number>;
}) => {
  const derivedPosition = useDerivedValue<PiPViewPosition>(() => {
    return getPosition({
      edges: edges.value,
      translationX: translationX.value,
      translationY: translationY.value,
    });
  });

  return derivedPosition;
};
