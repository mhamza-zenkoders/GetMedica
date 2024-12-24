import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {RootStackNavigationType} from './types/navigationType';

export const navigationRef =
  createNavigationContainerRef<RootStackNavigationType>();
export const navigate = <T extends keyof RootStackNavigationType>(
  name: T,
  ...params: RootStackNavigationType[T] extends undefined
    ? []
    : [RootStackNavigationType[T]]
) => {
  if (navigationRef?.isReady()) {
    navigationRef.navigate(
      name as any,
      ...(params as [RootStackNavigationType[T]]),
    );
  }
};
export const navigateReplace = <T extends keyof RootStackNavigationType>(
  name: T,
  ...params: RootStackNavigationType[T] extends undefined
    ? []
    : [RootStackNavigationType[T]]
) => {
  if (navigationRef?.isReady()) {
    navigationRef?.current?.navigate(name as any, {
      ...(params as any),
      replace: true,
    });
  }
};

export const navigateGoBack = () => {
  if (navigationRef?.isReady()) {
    navigationRef.goBack();
  }
};
export const navigateReset = <T extends keyof RootStackNavigationType>(
  name: T,
  ...params: RootStackNavigationType[T] extends undefined
    ? []
    : [RootStackNavigationType[T]]
) => {
  if (navigationRef.isReady()) {
    navigationRef?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name,
            params: {...(params as [RootStackNavigationType[T]])},
          },
        ],
      }),
    );
  }
};
