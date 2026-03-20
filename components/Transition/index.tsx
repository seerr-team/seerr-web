'use client';

import React from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';
import { useRef, useEffect, useContext } from 'react';

interface CSSTransitionProps {
  show?: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  appear?: boolean;
  children?: React.ReactNode;
}

const TransitionContext = React.createContext<{
  parent: { show?: boolean; isInitialRender?: boolean; appear?: boolean };
}>({
  parent: {},
});

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

const CSSTransition: React.FC<CSSTransitionProps> = ({
  show,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  appear,
  children,
}) => {
  // `react-transition-group@4` uses `findDOMNode` by default, which React 19 removed.
  // Using `nodeRef` keeps it compatible without changing the layout.
  const nodeRef = useRef<HTMLElement | null>(null);

  const enterClasses = enter.split(' ').filter((s) => s.length);
  const enterFromClasses = enterFrom.split(' ').filter((s) => s.length);
  const enterToClasses = enterTo.split(' ').filter((s) => s.length);
  const leaveClasses = leave.split(' ').filter((s) => s.length);
  const leaveFromClasses = leaveFrom.split(' ').filter((s) => s.length);
  const leaveToClasses = leaveTo.split(' ').filter((s) => s.length);

  const addClasses = (node: HTMLElement, classes: string[]) => {
    classes.length && node.classList.add(...classes);
  };

  const removeClasses = (node: HTMLElement, classes: string[]) => {
    classes.length && node.classList.remove(...classes);
  };

  const childWithRef = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<any>, { ref: nodeRef as any })
    : children;

  return (
    <ReactCSSTransition
      appear={appear}
      unmountOnExit
      in={show}
      nodeRef={nodeRef as unknown as React.RefObject<HTMLElement>}
      addEndListener={(done) => {
        const el = nodeRef.current;
        el?.addEventListener('transitionend', done, false);
      }}
      onEnter={() => {
        const node = nodeRef.current;
        node && addClasses(node, [...enterClasses, ...enterFromClasses]);
      }}
      onEntering={() => {
        const node = nodeRef.current;
        if (!node) return;
        removeClasses(node, enterFromClasses);
        addClasses(node, enterToClasses);
      }}
      onEntered={() => {
        const node = nodeRef.current;
        node && removeClasses(node, [...enterToClasses, ...enterClasses]);
      }}
      onExit={() => {
        const node = nodeRef.current;
        node && addClasses(node, [...leaveClasses, ...leaveFromClasses]);
      }}
      onExiting={() => {
        const node = nodeRef.current;
        if (!node) return;
        removeClasses(node, leaveFromClasses);
        addClasses(node, leaveToClasses);
      }}
      onExited={() => {
        const node = nodeRef.current;
        node && removeClasses(node, [...leaveToClasses, ...leaveClasses]);
      }}
    >
      {childWithRef}
    </ReactCSSTransition>
  );
};

const Transition: React.FC<CSSTransitionProps> = ({
  show,
  appear,
  ...rest
}) => {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    );
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
};

export default Transition;
