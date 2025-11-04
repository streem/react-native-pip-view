import { type SharedValue } from 'react-native-reanimated';

import {
  type Dimensions,
  type Edges,
  type PiPViewPosition,
  type ScreenLayoutDimensions,
} from './models';

export const getEdges = (
  currentContainerLayout: ScreenLayoutDimensions,
  currentScaledElementLayout: SharedValue<Dimensions>
) => {
  'worklet';

  return {
    minY:
      (currentContainerLayout.verticalOffset ?? 0) +
      (currentContainerLayout.y ?? 0),
    minX:
      (currentContainerLayout.horizontalOffset ?? 0) +
      (currentContainerLayout.x ?? 0),

    maxX:
      currentContainerLayout.width -
      currentScaledElementLayout.value.width -
      (currentContainerLayout.horizontalOffset ?? 0),
    maxY:
      currentContainerLayout.height -
      currentScaledElementLayout.value.height -
      (currentContainerLayout.verticalOffset ?? 0),
  };
};

const isPipAtBottom = ({ edges, y }: { y: number; edges: Edges | null }) => {
  'worklet';

  const currY = y;
  const minY = edges?.minY ?? 0;
  const maxY = edges?.maxY ?? 0;

  const distanceFromTop = Math.abs(currY - minY);
  const distanceFromBottom = Math.abs(currY - maxY);

  return distanceFromBottom < distanceFromTop;
};

const isPipAtLeft = ({ edges, x }: { x: number; edges: Edges | null }) => {
  'worklet';

  const minX = edges?.minX ?? 0;
  const maxX = edges?.maxX ?? 0;

  const distanceFromLeft = Math.abs(x - minX);
  const distanceFromRight = Math.abs(x - maxX);

  return distanceFromLeft < distanceFromRight;
};

export const noop = () => {
  'worklet';
};

export const getPosition = ({
  edges,
  translationX,
  translationY,
}: {
  edges: Edges | null;
  translationX: number;
  translationY: number;
}) => {
  'worklet';

  // TODO: fits our use case, but should probably use init values that are provided
  if (!edges) {
    return 'topLeft';
  }

  const x = translationX;
  const y = translationY;
  const isBottom = isPipAtBottom({ edges: edges, y });
  const isLeft = isPipAtLeft({ edges: edges, x });
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
};
