import React, {
 FC, ReactElement, ComponentType,
} from 'react';
import { Switch, matchPath } from 'react-router-dom';
import { SwitchProps } from 'react-router';
import { PoseGroup } from 'react-pose';

interface Props {
  posedAnimation: ComponentType;
}

export const AnimatedSwitch: FC<SwitchProps & Props> = ({
  children, location, posedAnimation: Animation,
}): ReactElement => {
  let switchKey;
  React.Children.forEach(children, child => {
    if (!switchKey && location && React.isValidElement(child)) {
      if (matchPath(location.pathname, child.props)) switchKey = child.props.path;
    }
  });
  if (!switchKey) switchKey = '';

  return (
    <PoseGroup flipMove={false}>
      <Animation key={switchKey}>
        <Switch key={switchKey} location={location}>
          {children}
        </Switch>
      </Animation>
    </PoseGroup>
  );
};
