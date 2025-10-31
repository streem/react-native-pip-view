import type { ReactElement } from 'react';
import { type LayoutRectangle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export type PiPViewInitialPosition = {
  x: number | 'left' | 'right' | 'center';
  y: number | 'top' | 'bottom' | 'center';
};

export type PiPViewPosition =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

export type Dimensions = {
  width: number;
  height: number;
};

export type EdgeSide = 'left' | 'right';

export type Edges = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export type ContainerLayoutRectangle = Omit<LayoutRectangle, 'x' | 'y'> & {
  x?: number;
  y?: number;
};

export type DestroyArea = {
  layout: ContainerLayoutRectangle;
  activeColor: string;
  inactiveColor: string;
};

export type ScreenLayoutDimensions = ContainerLayoutRectangle & {
  horizontalOffset?: number;
  verticalOffset?: number;
};

export interface UseAnimationValues {
  translationX: SharedValue<number>;
  translationY: SharedValue<number>;
  edges: SharedValue<Edges | null>;
}

export interface PiPViewProps {
  disabled?: boolean;
  destroyArea?: DestroyArea;
  initialPosition?: PiPViewInitialPosition;
  hideable?: boolean;
  layout: ScreenLayoutDimensions;
  snapToEdges?: boolean;
  edgeHandle?: {
    left: ReactElement;
    right: ReactElement;
  };
  onDestroy?: () => void;
  onPress?: () => void;
  /** Callback that exposes animation values for consumers to add extra functionality */
  onUseAnimationValues?: (values: UseAnimationValues) => void;
  onStartMove?: (position: PiPViewPosition) => void;
  onEndMove?: (position: PiPViewPosition) => void;
}
