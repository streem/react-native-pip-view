import { type SharedValue, useDerivedValue } from 'react-native-reanimated';

import type { Edges, PiPViewPosition } from '../models';
import { isPipAtBottom, isPipAtLeft } from '../utils';

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
    // TODO: fits our use case, but should probably use init values that are provided
    if (!edges) {
      return 'topLeft';
    }

    const x = translationX.value || 0;
    const y = translationY.value || 0;
    const isBottom = isPipAtBottom({ edges: edges.value, y });
    const isLeft = isPipAtLeft({ edges: edges.value, x });
    const isRight = !isLeft;
    const isBottomLeft = isBottom && isLeft;
    const isBottomRight = isBottom && isRight;
    const isTop = !isBottom;
    const isTopLeft = isTop && isLeft;
    const isTopRight = isTop && isRight;
    let position: PiPViewPosition = 'topLeft';

    if (isTopLeft) {
      position = 'topLeft';
    } else if (isTopRight) {
      position = 'topRight';
    } else if (isBottomLeft) {
      position = 'bottomLeft';
    } else if (isBottomRight) {
      position = 'bottomRight';
    }

    return position;
  });

  return derivedPosition;
};
