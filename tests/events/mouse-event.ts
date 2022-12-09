interface IEventInit {
  bubbles?: boolean | undefined;
  cancelable?: boolean;
  composed?: boolean;
}

export interface IMouseEvent {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean
  cancelBubble: false,
  currentTarget: null,
  defaultPrevented: null,
  eventPhase: number
  isTrusted: boolean,
  returnValue: null,
  srcElement: null,
  target: null,
  timeStamp: number,
  type: string,
  composedPath: string,
  initEvent: IEventInit,
  preventDefault: () => void,
  stopImmediatePropagation: () => void,
  stopPropagation: () => void,
  readonly altKey: boolean;
  readonly button: number;
  readonly buttons: number;
  readonly clientX: number;
  readonly clientY: number;
  readonly ctrlKey: boolean;
  readonly metaKey: boolean;
  readonly movementX: number;
  readonly movementY: number;
  readonly offsetX: number;
  readonly offsetY: number;
  readonly pageX: number;
  readonly pageY: number;
  readonly relatedTarget: EventTarget | null;
  readonly screenX: number;
  readonly screenY: number;
  readonly shiftKey: boolean;
  readonly x: number;
  readonly y: number;
  getModifierState(keyArg: string): boolean;
  /** @deprecated */
  initMouseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget | null): void;

  readonly detail: number;
  readonly view: Window | null;
  /** @deprecated */
  readonly which: number;
  /** @deprecated */
  initUIEvent(typeArg: string, bubblesArg?: boolean, cancelableArg?: boolean, viewArg?: Window | null, detailArg?: number): void;

  readonly AT_TARGET: number;
  readonly BUBBLING_PHASE: number;
  readonly CAPTURING_PHASE: number;
  readonly NONE: number;
}

export function createMouseEvent (): IMouseEvent {
  return {
    bubbles: false,
    cancelable: false,
    composed: false,
    cancelBubble: false,
    currentTarget: null,
    defaultPrevented: null,
    eventPhase: 1,
    isTrusted: true,
    returnValue: null,
    srcElement: null,
    target: null,
    timeStamp: 1,
    type: 'click',
    composedPath: '',
    initEvent: {
      bubbles: false
    },
    preventDefault: function () {},
    stopImmediatePropagation: function () {},
    stopPropagation: function () {},
    AT_TARGET: 0,
    BUBBLING_PHASE: 0,
    CAPTURING_PHASE: 0,
    NONE: 0,
    altKey: false,
    button: 1,
    buttons: 1,
    clientX: 1,
    clientY: 1,
    ctrlKey: false,
    detail: 0,
    getModifierState: function () { return false },
    metaKey: false,
    movementX: 1,
    movementY: 1,
    offsetX: 10,
    offsetY: 20,
    pageX: 1,
    pageY: 2,
    relatedTarget: null,
    screenX: 1,
    screenY: 2,
    shiftKey: false,
    view: null,
    x: 11,
    y: 11,
    initMouseEvent: function () {},
    initUIEvent: function () {},
    which: 0
  }
}
