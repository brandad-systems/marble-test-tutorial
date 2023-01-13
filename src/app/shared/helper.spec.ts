interface NOTIFIC {
  kind: string;
  value: string;
  error: any;
}
export interface Frame {
  frame: number;
  notification: NOTIFIC;
}
export function logFrames(label: string, frames: Frame[]) {
  console.log(label + ':');
  frames.forEach((frame: Frame) => {
    console.log(
      'Frame:',
      frame.frame,
      'Kind',
      frame.notification.kind,
      'Value:',
      frame.notification.value,
      frame.notification.error ? 'Error:' + frame.notification.error : ''
    );
  });
  console.log('----------');
}
