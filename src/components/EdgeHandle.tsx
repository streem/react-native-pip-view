import {
  StyleSheet,
  TouchableOpacity,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import { animationsPresets } from '../constants';
import { usePiPViewContext } from '../context/PiPView.provider';
import { type EdgeSide } from '../models';
import { ArrowButton } from './ArrowButton';
import { CustomEdgeHandle } from './CustomEdgeHandle';
import { noop } from '../utils';

interface Props {
  translateX: SharedValue<number>;
  isVisible: SharedValue<boolean>;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  side: EdgeSide;
}

export const EdgeHandle = ({
  onPress,
  translateX,
  isVisible,
  style,
  side,
}: Props) => {
  const {
    edgeHandle,
    elementLayout,
    onMaximize = noop,
    onMinimize = noop,
  } = usePiPViewContext((state) => ({
    edgeHandle: state.edgeHandle,
    elementLayout: state.elementLayout,
    onMinimize: state.onMinimize,
    onMaximize: state.onMaximize,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    height: elementLayout.value.height,
    transform: [
      {
        translateX: withSpring(translateX.value, animationsPresets.lazy),
      },
    ],
    opacity: withTiming(isVisible.value ? 1 : 0, {
      duration: 200,
    }),
    right: 0,
    top: 0,
    zIndex: 1,
  }));

  useAnimatedReaction(
    () => {
      return isVisible.value;
    },
    (currentVisibility) => {
      const minimizedSide = side === 'left' ? 'right' : 'left';
      if (currentVisibility) {
        runOnJS(onMinimize)(minimizedSide);
      } else {
        runOnJS(onMaximize)(minimizedSide);
      }
    }
  );

  return (
    <Animated.View style={[containerStyle, style, styles.button]}>
      <TouchableOpacity onPress={onPress} style={styles.grow} hitSlop={10}>
        {edgeHandle?.left && edgeHandle.right ? (
          <CustomEdgeHandle side={side} />
        ) : (
          <ArrowButton side={side} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 100,
  },
  grow: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
